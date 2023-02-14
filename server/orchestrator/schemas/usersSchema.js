const { verifyToken } = require("../helper/jwt");
const Users = require("../services/users");

const typeDefs = `#graphql
	type User {
    id:String
    username:String!
    email:String!
    password:String!
    phoneNumber:String!
    address:String!
	balance:Int
	points:Int
  }
  
  type Response {
    access_token:String
	id:Int
    message:String
	error:Boolean
  }
  type Invoice {
    external_id:String
    totalPrice:Int
    invoice_url:String
	}
	input InvoicePayload {
		external_id:String
   		totalPrice:Int
		status:String
	}
  input userPayload {
    username:String
    email:String
    password:String
    phoneNumber:String
    address:String
  }
  
  type Query {
	getAllUsers:[User]
	getUserById(userId:ID):User
	getProfile:User
  }
  
  type Mutation {
    registerUser(userPayload:userPayload):Response
	loginUser(userPayload:userPayload):Response
	deleteUser(userId:ID):Response
	createInvoice(balance:Int):Invoice
	payInvoice(invoicePayload:InvoicePayload):Response
  }
`;

const resolvers = {
	Query: {
		getAllUsers: async () => {
			try {
				const { data } = await Users.get(`/users`);

				return data;
			} catch (error) {
				console.log(error);
			}
		},
		getUserById: async (_, { userId }) => {
			try {
				const { data } = await Users.get(`/users/${userId}`);

				return data;
			} catch (error) {
				console.log(error);
			}
		},
		getProfile: async (_, __, context) => {
			try {
				if (!context.token) throw { error: "Invalid access" };
				const { id: userId } = verifyToken(context.token);
				const { data } = await Users.get(`/users/${userId}`);

				return data;
			} catch (error) {
				console.log(error);
			}
		},
	},
	Mutation: {
		registerUser: async (_, { userPayload }) => {
			try {
				//user payload semua
				let { username, email, password, phoneNumber, address } = userPayload;

				const { data } = await Users.post(`/users/register`, {
					username,
					email,
					password,
					phoneNumber,
					address,
				});

				return data;
			} catch (error) {
				console.log(error);
			}
		},
		loginUser: async (_, { userPayload }) => {
			//user payload cuma email dan password
			try {
				const { email, password } = userPayload;

				const { data } = await Users.post(`/users/login`, { email, password });

				return data;
			} catch (error) {
				console.log(error);
			}
		},
		deleteUser: async (_, { userId }) => {
			try {
				const { data } = await Users.delete(`/users/${userId}`);

				return { message: "User Deleted successfully" };
			} catch (error) {
				console.log(error);
			}
		},
		createInvoice: async (_, { balance }, context) => {
			try {
				if (!context.token) throw { error: "Invalid access" };
				const { data } = await Users.post(
					"/users/topup",
					{ balance },
					{
						headers: {
							access_token: context.token,
						},
					}
				);

				return data;
			} catch (error) {
				console.log(error);
			}
		},
		payInvoice: async (_, { invoicePayload }, context) => {
			// invoice payload semua
			try {
				if (!context.token) throw { error: "Invalid access" };
				const { data } = await Users.post(
					"/users/success",
					{ ...invoicePayload },
					{
						headers: {
							access_token: context.token,
						},
					}
				);

				return data;
			} catch (error) {
				console.log(error);
			}
		},
	},
};

module.exports = { typeDefs, resolvers };
