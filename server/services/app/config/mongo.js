const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  process.env.MONGO_URL ||
  "mongodb+srv://ionnotion:Huehuebrbr1992+@ionnotion.36yjwex.mongodb.net/?retryWrites=true&w=majority";
// "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false";

let options;

if (process.env.NODE_ENV !== "test") {
	options = {
		dbName: `Wasteless`,
		useNewUrlParser: true,
		useUnifiedTopology: true,
		serverApi: ServerApiVersion.v1,
	};
} else {
	console.log("masuk sini")
	options = {};
}

const client = new MongoClient(uri, options);
const testClient = new MongoClient(
  "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false"
);

let db = null;
let postCollection = null;
let categoryCollection = null;
let appointmentCollection = null;

const mongoConnect = async (env) => {
  try {
    if (env === "test") {
      console.log("test");
      await testClient.connect();
    } else {
      console.log("bukan test");
      await client.connect();
    }
    const database = client.db("Wasteless");
    const posts = database.collection("Posts");
    const categories = database.collection("Category");
    const appointment = database.collection("Appointment");

    db = database;
    postCollection = posts;
    categoryCollection = categories;
    appointmentCollection = appointment;

    return database;
  } catch (error) {
    console.log(error);
  }
};

const getDatabase = () => {
  return db;
};

const getPosts = () => {
  return postCollection;
};

const getCategories = () => {
  return categoryCollection;
};

const getAppointment = () => {
  return appointmentCollection;
};

module.exports = {
  mongoConnect,
  getDatabase,
  getPosts,
  getCategories,
  getAppointment,
};
