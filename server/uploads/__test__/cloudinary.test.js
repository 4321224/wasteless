const request = require("supertest");
const app = require("../app");
const CloudinaryCloud = require("../helpers/uploader");

jest.setTimeout(1000);

const cloudinary = require("cloudinary");
jest.mock("cloudinary");

beforeEach(() => {
  cloudinary.v2.uploader.upload.mockResolvedValue({
    url: "img.png",
  });
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe("Test endpoint upload", () => {
  describe("upload image customer /post", () => {
    test("Succes upload image, status code 200", (done) => {
      return request(app)
        .post("/")
        .then((response) => {
          const { body, status } = response;
          // console.log(response.body, "<<< ini response");
          expect(response.statusCode).toBe(200);
          expect(response.body).toBeInstanceOf(Object);
        });
    });
    test("Failed upload file , status code 500", (done) => {
      jest
        .spyOn(CloudinaryCloud, "findAll")
        .mockRejectedValue(new Error("test error"));
      request(app)
        .post("/")
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;
          expect(status).toBe(500);
          return done();
        });
    });
  });
});
