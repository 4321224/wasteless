const { MongoClient } = require("mongdb");
const { MongoMemoryServer } = require("mongodb-memory-server");

let connection;
let mongoServer;

dbConnect = async () => {
  mongoServer = await MongoMemoryServer.create();
  connection = await MongoClient.connect(mongoServer.getUri(), {});
  console.log(connection);
};

dbDisconnect = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
};

module.exports = { dbConnect, dbDisconnect };
