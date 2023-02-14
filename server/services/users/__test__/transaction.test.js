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
      username: "annewijaya",
      email: "anne2@gmail.com",
      password: "an12345",
      address: "jakarta",
      phoneNumber: "081234832132",
      payerId: 1,
      payeeId: 1,
    });
    user_access_token = signToken({ id: user.id });
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
describe("Transaction Routes Test", () => {
  describe("POST /transaction - create new transaction customer", () => {
    test("200 get transaction", async () => {
      const response = await request(app)
        .post("/transaction")
        .send({
          totalPrice: 450,
          payeeId: 1,
        })
        .set({ access_token: user_access_token });
      console.log(response.body, "<-- ini response");
      const { body, status } = response;
      expect(status).toBe(200);
      expect(body).toBeInstanceOf(Object);
      expect(body).toHaveProperty("result", expect.any(Object));
    });
    test("400 not enough balance", async () => {
      const response = await request(app)
        .post("/transaction")
        .send({
          totalPrice: 150000,
          payeeId: 1,
        })
        .set({ access_token: user_access_token });
      // console.log(response, "<-- ini response");
      const { body, status } = response;
      expect(status).toBe(400);
      expect(body).toBeInstanceOf(Object);
      expect(body).toHaveProperty("message", "Not enough balance");
    });

    test("400 paying user balance 0", async () => {
      const response = await request(app)
        .post("/transaction")
        .send({
          totalPrice: 55000,
          payeeId: 1,
        })
        .set({ access_token: user_access_token });
      // console.log(response, "<-- ini response");
      const { body, status } = response;
      expect(status).toBe(400);
      expect(body).toBeInstanceOf(Object);
      expect(body).toHaveProperty("message", "Not enough balance");
    });
    test("401 get transaction using invalid token", async () => {
      const response = await request(app)
        .post("/transaction")
        .send({
          totalPrice: 450,
          payeeId: 1,
        })
        .set("access_token", "ini token aja");
      // console.log(response.body, "<-- ini response");
      const { body, status } = response;
      expect(status).toBe(401);
      expect(body).toBeInstanceOf(Object);
      expect(body).toHaveProperty("message", "Invalid token");
    });
  });
  describe("GET /transaction - read transaction by id", () => {
    test("Succes get TransactionById , status code 200", (done) => {
      request(app)
        .get(`/transaction/incoming/1`)
        .set({ access_token: user_access_token })
        .then((response) => {
          const { body, status } = response;
          console.log(response.body, "<<<");
          expect(status).toBe(200);
          expect(body).toEqual(expect.any(Object));
          expect(response.body.incomingPayment[0]).toHaveProperty(
            "id",
            expect.any(Number)
          );
          expect(response.body.incomingPayment[0]).toHaveProperty(
            "payerId",
            expect.any(Number)
          );
          expect(response.body.incomingPayment[0]).toHaveProperty(
            "payeeId",
            expect.any(Number)
          );
          expect(response.body.incomingPayment[0]).toHaveProperty(
            "totalPrice",
            expect.any(Number)
          );
          expect(response.body.incomingPayment[0]).toHaveProperty(
            "commission",
            expect.any(Number)
          );
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
    test("401 failed, get user by id without access_token", (done) => {
      request(app)
        .get("/transaction/incoming/1")
        // .set({ access_token: user_access_token })
        .then((response) => {
          const { body, status } = response;
          // console.log(response.body, "<<< ini response");
          expect(status).toBe(401);
          expect(response.body).toHaveProperty("message", "Invalid token");
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
    test("500 failed, get user by id without id", (done) => {
      request(app)
        .get("/transaction/incoming/:id")
        .set({ access_token: user_access_token })
        .then((response) => {
          const { body, status } = response;
          console.log(response.body, "<<< ini response");
          expect(status).toBe(500);
          expect(response.body).toHaveProperty(
            "message",
            "Internal Server Error!"
          );
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });
  describe("GET /transaction/outgoing - read transaction by id", () => {
    test("Succes get outgoing transaction TransactionById , status code 200", (done) => {
      request(app)
        .get("/transaction/outgoing/1")
        .set({ access_token: user_access_token })
        .then((response) => {
          const { body, status } = response;
          // console.log(response, "ini response");
          expect(status).toBe(200);
          expect(body).toEqual(expect.any(Object));
          expect(response.body[0]).toHaveProperty("id", expect.any(Number));
          expect(response.body[0]).toHaveProperty(
            "payerId",
            expect.any(Number)
          );
          expect(response.body[0]).toHaveProperty(
            "payeeId",
            expect.any(Number)
          );
          expect(response.body[0]).toHaveProperty(
            "totalPrice",
            expect.any(Number)
          );
          expect(response.body[0]).toHaveProperty(
            "commission",
            expect.any(Number)
          );
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
    test("401 failed, get user by id outgoing transaction without access_token", (done) => {
      request(app)
        .get("/transaction/outgoing/1")
        // .set({ access_token: user_access_token })
        .then((response) => {
          const { body, status } = response;
          // console.log(response.body, "<<< ini response");
          expect(status).toBe(401);
          expect(response.body).toHaveProperty("message", "Invalid token");
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
    test("500 failed, get user  outgoing transaction by id without id", (done) => {
      request(app)
        .get("/transaction/outgoing/:id")
        .set({ access_token: user_access_token })
        .then((response) => {
          const { body, status } = response;
          // console.log(response.body, "<<< ini response");
          expect(status).toBe(500);
          expect(response.body).toHaveProperty(
            "message",
            "Internal Server Error!"
          );
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });
});
