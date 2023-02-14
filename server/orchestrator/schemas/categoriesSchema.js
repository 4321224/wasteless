const App = require("../services/app");
const redis = require("../config/redis");

const typeDefs = `#graphql
	type Category {
    _id:ID
    name:String!
    price:Int
  }
  input categoryPayload {
    name:String
    price:Int
  }
  type Query {
    getAllCategories:[Category]
    getCategoryById(category_id:ID):Category
  }
  type Mutation {
    addCategory(categoryPayload:categoryPayload):Response
    editCategory(category_id:ID,categoryPayload:categoryPayload):Response
    deleteCategory(category_id:ID):Response
   }
`;

const resolvers = {
	Query: {
		getAllCategories: async () => {
			try {
				// redis.del("Categories")
				const cacheData = await redis.get("Categories");

				if (cacheData) {
					return JSON.parse(cacheData);
				}

				const { data } = await App.get("/categories");
				await redis.set("Categories", JSON.stringify(data));

				// console.log(data)

				return data;
			} catch (error) {
				console.log(error);
			}
		},
		getCategoryById: async (_, { category_id }) => {
			try {
				const { data } = await App.get(`/categories/${category_id}`);

				return data;
			} catch (error) {
				console.log(error);
			}
		},
	},
	Mutation: {
		addCategory: async (_, { categoryPayload }) => {
			const { name, price } = categoryPayload;
			try {
				const { data } = await App.post(`/categories`, { name, price });
				await redis.del("Categories");
				return { message: "Category added succesfully!" };
			} catch (error) {
				console.log(error);
			}
		},
		editCategory: async (_, { category_id, categoryPayload }) => {
			const { name, price } = categoryPayload;
			try {
				const { data } = await App.put(`/categories/${category_id}`, { name, price });
				await redis.del("Categories");
				return { message: "Category edited succesfully!" };
			} catch (error) {
				console.log(error);
			}
		},
		deleteCategory: async (_, { category_id }) => {
			try {
				const { data } = await App.delete(`/categories/${category_id}`);
				await redis.del("Categories");
				return { message: "Category deleted succesfully!" };
			} catch (error) {
				console.log(error);
			}
		},
	},
};

module.exports = { typeDefs, resolvers };
