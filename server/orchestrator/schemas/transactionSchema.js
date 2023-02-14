const Users = require("../services/users");

const typeDefs = `#graphql

    type Transaction {
        payerId:Int
        payeeId:Int
        totalPrice:Int
        external_id:String
        invoice_url:String
        payment_date:Date
    }

    input transactionPayload {
        payerId:Int
        payeeId:Int
        totalPrice:Int
    }

    type Query {
	    getOutgoingTransaction(payerId:Int):[Transaction]
	    getIncomingTransaction(payeeId:Int):[Transaction]
    }

    type Mutation {
        createTransaction(transactionPayload:transactionPayload):Transaction
    }
`;

const resolver = {
	Query: {
		getOutgoingTransaction: async (_, { payerId }, context) => {
			try {
				if (!context.token) throw { error: "Invalid access" };
				const { data } = await Users.get(`/transaction/outgoing/${payerId}`);

				return data;
			} catch (error) {
				console.log(error);
			}
		},
		getIncomingTransaction: async (_, { payeeId }, context) => {
			try {
				if (!context.token) throw { error: "Invalid access" };
				const { data } = await Users.get(`/transaction/incoming/${payeeId}`);

				return data;
			} catch (error) {
				console.log(error);
			}
		},
	},
	Mutation: {
		createTransaction: async (_, { transactionPayload }, context) => {
			// payload : payeeId, total price
			try {
				if (!context.token) throw { error: "Invalid access" };
				const { data } = await Users.post(
					`/transaction/`,
					{ ...transactionPayload },
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
