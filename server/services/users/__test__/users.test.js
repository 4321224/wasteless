const app = require("../app");
const request = require("supertest");
const { sequelize, User } = require("../models");
const { signToken } = require("../helpers/jwt");
const { queryInterface } = sequelize;

jest.setTimeout(5000);

let user_access_token = null;

beforeAll(async () => {
  try {
    const user = await User.create({
      username: "kareenwijaya",
      email: "karen_wijaya@gmail.com",
      password: "karin123",
      address: "jakarta",
      phoneNumber: "081234832132",
    });
    user_access_token = signToken({ id: user.id });
    console.log(user.id, "<><>");
  } catch (error) {
    console.log(error);
  }
});

afterAll(async () => {
  await User.destroy({
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
});

describe("User Routes Test", () => {
  describe("POST /register - create new user", () => {
    test("201 success - create new user", (done) => {
      request(app)
        .post("/users/register")
        .send({
          username: "annaaja",
          email: "annaaja@gmail.com",
          password: "karin123",
          address: "jakarta",
          phoneNumber: "081321324354",
        })
        .end((error, res) => {
          if (error) return done(error);
          const { body, status } = res;
          // console.log(res.body, "<<< ini res body");
          expect(status).toBe(201);
          expect(body).toHaveProperty("message", expect.any(String));
          return done();
        });
    });
    test("400 Failed register - should return error if username is null", (done) => {
      request(app)
        .post("/users/register")
        .send({
          email: "abc@gmail.com",
          password: "123456",
          address: "jakarta",
          phoneNumber: "081234567891",
        })
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;
          // console.log(res.body, "<<<");
          expect(status).toBe(400);
          expect(res.body.message[0]).toEqual("User.username cannot be null");
          return done();
        });
    });
    test("400 Failed register - should return error if username not 6 character", (done) => {
      request(app)
        .post("/users/register")
        .send({
          username: "hello",
          email: "abc@gmail.com",
          password: "123456",
          address: "jakarta",
          phoneNumber: "081234567891",
        })
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;
          // console.log(res.body, "<<<<<");
          expect(status).toBe(400);
          expect(res.body.message[0]).toEqual(
            "Validation len on username failed"
          );
          return done();
        });
    });
    test("400 Failed register - should return error if email null", (done) => {
      request(app)
        .post("/users/register")
        .send({
          username: "testUser",
          password: "123456",
          address: "jakarta",
          phoneNumber: "081234567891",
        })
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;
          // console.log(res.body.message, "<<<");
          expect(status).toBe(400);
          expect(res.body.message[0]).toEqual("User.email cannot be null");
          return done();
        });
    });
    test("400 Failed register - should return error without email format", (done) => {
      request(app)
        .post("/users/register")
        .send({
          username: "testUser",
          email: "abc.gmail,com",
          password: "123456",
          address: "jakarta",
          phoneNumber: "081234567891",
        })
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;
          // console.log(res.body.message[0], "<<<");
          expect(status).toBe(400);
          expect(res.body.message[0]).toEqual(
            "Validation isEmail on email failed"
          );
          return done();
        });
    });
    test("400 Failed register - should return error using email user registered", (done) => {
      request(app)
        .post("/users/register")
        .send({
          username: "kareenwijaya",
          email: "annaaja@gmail.com",
          password: "karin123",
          address: "jakarta",
          phoneNumber: "081234832132",
        })
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;
          // console.log(res.body, "<<<");
          expect(status).toBe(400);
          expect(res.body.message[0]).toEqual("username must be unique");
          return done();
        });
    });
    test("400 Failed register - should return error if password null", (done) => {
      request(app)
        .post("/users/register")
        .send({
          username: "testUser",
          email: "abc@gmail.com",
          address: "jakarta",
          phoneNumber: "081234567891",
        })
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;
          // console.log(res.body.message, "<<<");
          expect(status).toBe(400);
          expect(res.body.message[0]).toEqual("User.password cannot be null");
          return done();
        });
    });
    test("400 Failed register - should return error if password not 6 character", (done) => {
      request(app)
        .post("/users/register")
        .send({
          username: "hello",
          email: "abc@gmail.com",
          password: "12345",
          address: "jakarta",
          phoneNumber: "081234567891",
        })
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;
          // console.log(res.body.message[0], "<<<");
          expect(status).toBe(400);
          expect(res.body.message[0]).toEqual(
            "Validation len on username failed"
          );
          return done();
        });
    });
    test("400 Failed register - should return error using phoneNumber user registered", (done) => {
      request(app)
        .post("/users/register")
        .send({
          username: "kareenwijaya",
          email: "karen_wijaya@gmail.com",
          password: "karin123",
          address: "jakarta",
          phoneNumber: "081321324354",
        })
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;
          // console.log(res.body.message, "<<<");
          expect(status).toBe(400);
          expect(res.body.message[0]).toEqual("username must be unique");
          return done();
        });
    });
    test("400 Failed register - should return error if phone number null", (done) => {
      request(app)
        .post("/users/register")
        .send({
          username: "testUser",
          email: "abc@gmail.com",
          address: "jakarta",
          password: "123456",
        })
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;
          // console.log(res.body.message[0], "<<<");
          expect(status).toBe(400);
          expect(res.body.message[0]).toEqual(
            "User.phoneNumber cannot be null"
          );
          return done();
        });
    });
    test("400 Failed register - should return error if address null", (done) => {
      request(app)
        .post("/users/register")
        .send({
          username: "testUser",
          email: "abc@gmail.com",
          password: "123456",
          phoneNumber: "081234567891",
        })
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;
          // console.log(res.body, "<<< ini errornya");
          expect(status).toBe(400);
          expect(res.body.message[0]).toEqual("User.address cannot be null");
          return done();
        });
    });
    describe("POST /login - user login", () => {
      test("200 Success login - should return access_token", (done) => {
        request(app)
          .post("/users/login")
          .send({
            email: "karen_wijaya@gmail.com",
            password: "karin123",
          })
          .end((err, res) => {
            if (err) return done(err);
            const { body, status } = res;
            // console.log(res.body.message, "<<<");
            expect(status).toBe(200);
            expect(body).toHaveProperty("access_token", expect.any(String));
            return done();
          });
      });
      test("401 Failed login wrong password - should return error", (done) => {
        request(app)
          .post("/users/login")
          .send({
            email: "karen_wijaya@gmail.com",
            password: "abcdef",
          })
          .end((err, res) => {
            if (err) return done(err);
            const { body, status } = res;
            // console.log(res.body, "<<< coba error");
            expect(status).toBe(401);
            expect(body).toHaveProperty(
              "message",
              "Invalid Email or password!"
            );
            return done();
          });
      });
      test("401 Failed login wrong email - should return error", (done) => {
        request(app)
          .post("/users/login")
          .send({
            email: "apaajah@gmail.com",
            password: "karin123",
          })
          .end((err, res) => {
            if (err) return done(err);
            const { body, status } = res;

            expect(status).toBe(401);
            expect(body).toHaveProperty(
              "message",
              "Invalid Email or password!"
            );
            return done();
          });
      });

      test("401 Failed login wrong password - should return error", (done) => {
        request(app)
          .post("/users/login")
          .send({
            email: "kareen.anna2@gmail.com",
            password: "123456",
          })
          .end((err, res) => {
            if (err) return done(err);
            const { body, status } = res;

            expect(status).toBe(401);
            expect(body).toHaveProperty(
              "message",
              "Invalid Email or password!"
            );
            return done();
          });
      });

      test("400 Failed login when email is null - should return error", (done) => {
        request(app)
          .post("/users/login")
          .send({
            password: "123456",
          })
          .end((err, res) => {
            if (err) return done(err);
            const { body, status } = res;
            // console.log(res.body, "<<<");
            expect(status).toBe(500);
            expect(body).toHaveProperty("message", "Internal Server Error!");
            return done();
          });
      });

      test("400 Failed login when password is null - should return error", (done) => {
        request(app)
          .post("/users/login")
          .send({
            email: "karen_wijaya@gmail.com",
          })
          .end((err, res) => {
            if (err) return done(err);
            const { body, status } = res;

            expect(status).toBe(500);
            expect(body).toHaveProperty("message", "Internal Server Error!");
            return done();
          });
      });
    });
    describe("GET / - return data all user", () => {
      test("200 Success get user, return array", (done) => {
        request(app)
          .get("/users")
          .then((response) => {
            const { body, status } = response;
            // console.log(response.body[0], "<<< liat ini");
            expect(status).toBe(200);

            expect(response.body[0]).toBeInstanceOf(Object);
            expect(response.body[0]).toHaveProperty("id", expect.any(Number));
            expect(response.body[0]).toHaveProperty(
              "username",
              expect.any(String)
            );
            expect(response.body[0]).toHaveProperty(
              "email",
              expect.any(String)
            );
            expect(response.body[0]).toHaveProperty(
              "password",
              expect.any(String)
            );
            expect(response.body[0]).toHaveProperty(
              "address",
              expect.any(String)
            );
            expect(response.body[0]).toHaveProperty(
              "balance",
              expect.any(Number)
            );
            expect(response.body[0]).toHaveProperty(
              "points",
              expect.any(Number)
            );
            return done();
          })
          .catch((err) => {
            done(err);
          });
      });
    });
    describe("GET / - return data user by id", () => {
      test("200 Success get user, return array", (done) => {
        request(app)
          .get("/users/1")
          .then((response) => {
            const { body, status } = response;
            // console.log(response.body, "<<< get user");
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body).toHaveProperty("id", expect.any(Number));
            expect(response.body).toHaveProperty(
              "username",
              expect.any(String)
            );
            expect(response.body).toHaveProperty("email", expect.any(String));
            expect(response.body).toHaveProperty(
              "password",
              expect.any(String)
            );
            expect(response.body).toHaveProperty("address", expect.any(String));
            expect(response.body).toHaveProperty("balance", expect.any(Number));
            expect(response.body).toHaveProperty("points", expect.any(Number));
            return done();
          })
          .catch((err) => {
            done(err);
          });
      });
    });

    describe("POST / balance top up by user", () => {
      test("201 success top up, return array", (done) => {
        request(app)
          .post("/users/topup")
          .send({ balance: 500000 })
          .set("access_token", user_access_token)
          .then((response) => {
            const { body, status } = response;
            // console.log(response.body, "<< ini response");
            expect(status).toBe(200);
            expect(body).toBeInstanceOf(Object);
            return done();
          })
          .catch((err) => {
            console.log(error);
            done(err);
          });
      });
      test("401 if cant get users access_token", (done) => {
        request(app)
          .post("/users/topup")
          .send({ balance: 50000 })
          .set("access_token", "ini invalid token")
          .then((response) => {
            const { body, status } = response;
            console.log(response, "<< ini response");
            expect(status).toBe(401);
            expect(response.body).toHaveProperty("message", "Invalid token");
            return done();
          });
      });
    });
    test("401 if access_token null", (done) => {
      request(app)
        .post("/users/topup")
        .send({ balance: 50000 })
        .set("access_token", null)
        .then((response) => {
          const { body, status } = response;
          // console.log(response, "<< ini response");
          expect(status).toBe(401);
          expect(response.body).toHaveProperty("message", "Invalid token");
          return done();
        });
    });
    test("401 if access_token is empty", (done) => {
      request(app)
        .post("/users/topup")
        .send({ balance: 50000 })
        // .set("access_token", null)
        .then((response) => {
          const { body, status } = response;
          // console.log(response, "<< ini response");
          expect(status).toBe(401);
          expect(response.body).toHaveProperty("message", "Invalid token");
          return done();
        });
    });
  });
  describe("POST / balance top up by user", () => {
    test("200 success top up, return array", (done) => {
      request(app)
        .post("/users/success")
        .send({
          external_id: "1-1670412085185",
          totalPrice: 50000,
          status: "PAID",
        })
        .set("access_token", user_access_token)
        .then((response) => {
          const { body, status } = response;
          // console.log(response, "<< ini response");
          expect(status).toBe(201);
          expect(body).toBeInstanceOf(Object);
          return done();
        })
        .catch((err) => {
          done(err);
        });
    });
    test("401 if cant get users access_token", (done) => {
      request(app)
        .post("/users/topup")
        .send({ balance: 50000 })
        .set("access_token", "ini invalid token")
        .then((response) => {
          const { body, status } = response;
          console.log(response, "<< ini response");
          expect(status).toBe(401);
          expect(response.body).toHaveProperty("message", "Invalid token");
          return done();
        });
    });
    test("401 if access_token is empty", (done) => {
      request(app)
        .post("/users/success")
        .send({ external_id: 1, amount: 50000, status: "paid" })
        // .set("access_token", null)
        .then((response) => {
          const { body, status } = response;
          // console.log(response, "<< ini response");
          expect(status).toBe(401);
          expect(response.body).toHaveProperty("message", "Invalid token");
          return done();
        });
    });
    test("401 if access_token is null", (done) => {
      request(app)
        .post("/users/success")
        .send({ external_id: 1, amount: 50000, status: "paid" })
        .set("access_token", null)
        .then((response) => {
          const { body, status } = response;
          // console.log(response, "<< ini response");
          expect(status).toBe(401);
          expect(response.body).toHaveProperty("message", "Invalid token");
          return done();
        });
    });
  });
});
