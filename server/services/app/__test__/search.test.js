const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const Post = require("../models/post");

const inputPost = () => {
  return {
    title: "Botol",
    mainImage:
      "https://i0.wp.com/gunungmaja.co.id/wp-content/uploads/2020/11/jual-botol-minuman-500ml.jpg?fit=536%2C800&ssl=1",
    description: "botol plastik ",
    quantity: 10,
    status: "available",
    lat: "-6",
    long: "130",
    category_id: "638ebdd4e1e660e420e4d1d9",
    giver_id: "1",
  };
};

beforeAll(async () => {
  await mongoose.connect(
    "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
});

afterEach(async () => {
  jest.restoreAllMocks();
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe("test for search post by title", () => {
  describe("get /search - return data by title unknown", () => {
    test("get search data post", async () => {
      const post = await Post.create(inputPost());
      const response = await request(app).get("/search?=Botol");
      console.log(response, "<<<");
      expect(response.statusCode).toEqual(500);
      //   expect(response.body.length).toBeGreaterThan(0);
    });
  });
});
