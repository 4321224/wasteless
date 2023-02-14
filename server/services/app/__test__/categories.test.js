const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const Category = require("../models/category");

const inputCategory = () => {
  return {
    name: "Botol",
    price: 12000,
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

describe("test for endpoint categories", () => {
  describe("get /category", () => {
    test("get data categories", async () => {
      const category = await Category.create(inputCategory());
      const response = await request(app).get("/categories");
      //   console.log(response, "<<<");
      expect(response.statusCode).toEqual(200);
      expect(response.body.length).toBeGreaterThan(0);
    });
    test("test for failed data", async () => {
      jest
        .spyOn(Category, "find")
        .mockRejectedValue(new Error("failed to get data"));
      const response = await request(app).get("/categories");
      expect(response.statusCode).toEqual(500);
      expect(response.body).toEqual("failed to get data");
    });
  });
  describe("get /categories/:id", () => {
    test("success get categories by id", async () => {
      const category = await Category.create(inputCategory());
      const response = await request(app).get(`/categories/${category.id}`);
      //   console.log(response, "<<<");
      expect(response.statusCode).toEqual(200);
      expect(response.body.name).toBe(category.name);
      expect(response.body.price).toBe(category.price);
    });
    test("failed get category by invalidId", async () => {
      const category = await Category.create(inputCategory());
      await Category.findByIdAndDelete(category.id);
      const res = await request(app).get(`/categories/${category.id}`);
      expect(res.statusCode).toEqual(404);
      expect(res.body.message).toBe("Category Not Found");
    });
    test("failed get category by id 500", async () => {
      jest
        .spyOn(Category, "findById")
        .mockRejectedValue(new Error("failed test getCategoryById"));
      const category = await Category.create(inputCategory());
      const response = await request(app).get(`/categories/${category.id}`);
      expect(response.statusCode).toEqual(500);
      expect(response.body).toEqual("failed test getCategoryById");
    });
  });
  describe("Category /categories", () => {
    test("success add new category", async () => {
      const mockPosts = inputCategory();
      const response = await request(app).post("/categories").send(mockPosts);
      expect(response.statusCode).toEqual(201);
      expect(response.body.message).toBe("Success create category");
    });

    test("error empty field name", async () => {
      const mockCategory = inputCategory();
      const res = await request(app).post("/categories").send({
        price: mockCategory.price,
      });
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty("message");
    });
    test("error empty field price", async () => {
      const mockCategory = inputCategory();
      const res = await request(app).post("/categories").send({
        name: mockCategory.name,
      });
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty("message");
    });
    test("Failed 500", async () => {
      const mockPosts = inputCategory();
      jest
        .spyOn(Category, "create")
        .mockRejectedValue(new Error("test add news error 500"));
      const res = await request(app).post("/categories").send(mockPosts);
      expect(res.statusCode).toEqual(500);
      expect(res.body).toEqual("test add news error 500");
    });
  });
  describe("patch /categories/:id", () => {
    test("success edit categories by id", async () => {
      const category = await Category.create(inputCategory());
      const response = await request(app)
        .patch(`/categories/${category.id}`)
        .send();
      //   console.log(response, "<<<");
      expect(response.statusCode).toEqual(200);
      expect(response.body.message).toBe("update success");
    });
    test("failed get categories by id 500", async () => {
      jest
        .spyOn(Category, "findById")
        .mockRejectedValue(new Error("failed test get categoryById"));
      const category = await Category.create(inputCategory());
      const res = await request(app).patch(`/categories/${category.id}`);
      expect(res.statusCode).toEqual(500);
      expect(res.body).toEqual("failed test get categoryById");
    });
  });
  describe("Delete /categories", () => {
    test("success delete category", async () => {
      const category = await Category.create(inputCategory());
      const res = await request(app)
        .delete(`/categories/${category.id}`)
        .send();
      //   console.log(res, "<<");
      expect(res.statusCode).toEqual(200);
    });
    test("Failed delete category 500", async () => {
      const category = await Category.create(inputCategory());
      jest
        .spyOn(Category, "findByIdAndRemove")
        .mockRejectedValue(new Error("test error 500"));
      const res = await request(app)
        .delete(`/categories/${category.id}`)
        .send();
      expect(res.statusCode).toEqual(500);
    });
  });
});
