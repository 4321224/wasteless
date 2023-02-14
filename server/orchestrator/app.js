const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { verifyToken } = require("./helper/jwt");
const userSchema = require("./schemas/usersSchema");
const categorySchema = require("./schemas/categoriesSchema");
const postSchema = require("./schemas/postsSchemas");

const server = new ApolloServer({
  typeDefs: [userSchema.typeDefs, categorySchema.typeDefs, postSchema.typeDefs],
  resolvers: [
    userSchema.resolvers,
    categorySchema.resolvers,
    postSchema.resolvers,
  ],
});

startStandaloneServer(server, {
  listen: { port: process.env.PORT || 4000 },
  context: async ({ req }) => {
    if (!req.headers.authorization) return {};
    const token = req.headers.authorization || "";
    return { token };
  },
}).then(({ url }) => {
  console.log(`🚀  Server ready at: ${url}`);
});
