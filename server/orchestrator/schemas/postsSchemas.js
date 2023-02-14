const App = require("../services/app");
const Users = require("../services/users")
const redis = require("../config/redis");
const { verifyToken } = require("../helper/jwt");

const typeDefs = `#graphql
	type Post {
    _id:ID
    giver_id:ID!
    taker_id:ID
    category_id:String
    title:String!
    description:String!
    mainImage:String!
    quantity:Int
    lat:String
    long:String
    status:String
    }

	type Appointment {
		_id:ID
		userId:String
		username:String
		email:String
		phoneNumber:String
		postId:String
	}

  input postPayload {
    category_id:ID
    title:String
    description:String
    mainImage:String
    quantity:Int
    lat:String
    long:String
    status:String
  }
  type Query {
    getAllPosts:[Post]
	getNearbyPosts(postPayload:postPayload):[Post]
    getPostByCategory(category_id:String):[Post]
    getPostById(post_id:ID):Post
	getAppointment(post_id:ID):[Appointment]
  }
  type Mutation {
    addPost(postPayload:postPayload):Response
    editPost(postPayload:postPayload,post_id:ID):Response
    deletePost(post_id:ID):Response
	createAppointment(post_id:ID):Response
	chooseAppointment(taker_id:String, post_id:ID):Response
	completePost(post_id:String, giver_id:String, totalPrice:Int):Response
   }
`;

const resolvers = {
	Query: {
		getAllPosts: async (_, __, context) => {
			try {
				if (!context.token) throw { error: "Invalid access" };
				// console.log(context.token);

				redis.del("Posts");
				const cacheData = await redis.get("Posts");

				if (cacheData) {
					return JSON.parse(cacheData);
				}

				const { data } = await App.get("/posts", {
					headers: {
						access_token: context.token,
					},
				});

				console.log(data);

				await redis.set("Posts", JSON.stringify(data));

				return data;
			} catch (error) {
				console.log(error);
			}
		},

		getNearbyPosts: async (_, { postPayload }, context) => {
			try {
				if (!context.token) throw { error: "Invalid access" };
				const { lat, long } = postPayload;
				// console.log(context.token);

				redis.del("Posts");
				const cacheData = await redis.get("Posts");

				if (cacheData) {
					return JSON.parse(cacheData);
				}

				const { data } = await App.get(`/posts?lat=${lat}&long=${long}`, {
					headers: {
						access_token: context.token,
					},
				});

				console.log(data);

				await redis.set("Posts", JSON.stringify(data));

				return data;
			} catch (error) {
				console.log(error);
			}
		},

		getPostByCategory: async (_, { category_id }, context) => {
			try {
				if (!context.token) throw { error: "Invalid access" };
				const { data } = await App.get(`/posts?category_id=${category_id}`);

				return data;
			} catch (error) {
				console.log(error);
			}
		},

		getPostById: async (_, { post_id }, context) => {
			try {
				if (!context.token) throw { error: "Invalid access" };
				const { data } = await App.get(`/posts/${post_id}`);

				return data;
			} catch (error) {
				console.log(error);
			}
		},
		getAppointment: async (_, {post_id}, context) => {
			try {
				if (!context.token) throw { error: "Invalid access" };
				const { data } = await App.get(`/appointment/${post_id}`);

				return data
			} catch (error) {
				console.log(error);
			}
		},
	},

	Mutation: {
		addPost: async (_, { postPayload }, context) => {
			try {
				if (!context.token) throw { error: "Invalid access" };
				const { id } = verifyToken(context.token);
				const { data } = await App.post(
					`/posts`,
					{ ...postPayload, status: "pending", giver_id: id },
					{
						headers: {
							access_token: context.token,
						},
					}
				);
				redis.del("Posts");

				return { message: "Add Post Succesful!" };
			} catch (error) {
				console.log(error);
			}
		},

		editPost: async (_, { post_id, postPayload }, context) => {
			try {
				if (!context.token) throw { error: "Invalid access" };
				console.log(context.user);
				const { data } = await App.put(`/posts/${post_id}`, { ...postPayload });

				redis.del("Posts");

				return data;
			} catch (error) {
				console.log(error);
			}
		},

		deletePost: async (_, { post_id }, context) => {
			try {
				if (!context.token) throw { error: "Invalid access" };
				const { data } = App.delete(`/posts/${post_id}`);
			} catch (error) {
				console.log(error);
			}
		},

		createAppointment: async (_, { post_id }, context) => {
			try {
				if (!context.token) throw { error: "Invalid access" };
				const { id: userId } = verifyToken(context.token);
				const {data:userData} = await Users.get(`/users/${userId}`)
				console.log(userData)
				const { data } = await App.post(`/appointment/${post_id}`,{...userData});

				return {message: "Appointment created succesfully"}
			} catch (error) {
				console.log(error);
			}
		},

		chooseAppointment: async (_, {taker_id,post_id} ,context) => {
			try {
				// if (!context.token) throw { error: "Invalid access" };
				const {data:foundUser} = await Users.get(`/users/${taker_id}`)
				if(!foundUser) throw {message: "User not found"}
				const newPost = await App.patch(`/posts/${post_id}`,{taker_id, status:"ongoing"})
				
				console.log(newPost)

				return {message : "Post Updated"}
			} catch (error) {
				console.log(error)
			}
		},

		completePost: async (_,{post_id, giver_id, totalPrice}, context) => {
			try {
				if (!context.token) throw { error: "Invalid access" };
				
				const transaction = await Users.post(`/transaction/`,{payeeId: giver_id, totalPrice},{headers:{
					access_token : context.token
				}})

				if(!transaction) throw {error: "transaction failed"}

				const editPost = await App.patch(`/posts/${post_id}`,{status:"complete"})

				console.log(editPost)

				return {message : "Transaction Complete"}
			} catch (error) {
				console.log(error)
			}
		}
	},
};

module.exports = { typeDefs, resolvers };
