const XenditInvoice = require("./User");
const app = require("../server/services/users/app");
const { sequelize, User } = require("../server/services/users/models");
const request = require("supertest");


jest.setTimeout(5000);

let user_access_token = null;

	beforeAll(async () => {
        const user = await User.create({
            username: "kareenwijaya",
            email: "karen_wijaya@gmail.com",
            password: "karin123",
            address: "jakarta",
            phoneNumber: "081234832132",
          });
          user_access_token = signToken({ id: user.id });
	});

	beforeEach(() => {
		jest.restoreAllMocks();
	});

	afterAll(async () => {
		await XenditInvoice.deleteAll();
	});
  describe("Testing invoice xendit", () => {
	it("Should be return error when hit findAll", (done) => {
    jest.spyOn(XenditInvoice, "findAll").mockRejectedValue("Invalid token"); // you can pass your value as arg
		// or => User.findAll = jest.fn().mockRejectedValue('Error')
		request(app)
        .post("/users/topup")
			.then((res) => {
        // expect your response here
				expect(res.status).toBe(401);
				expect(res.body).toBe("Invalid token");
				done();
			})
			.catch((err) => {
				done(err);
			});
	});
    it("Should be return success when hit invoice", (done) => {
        jest
          .spyOn(XenditInvoice, "xendit invoice")
          .mockResolvedValue({ balance: 500000  });
      
        request(app)
        .post("/users/topup")
        .send({ balance: 500000 })
        .set("access_token", user_access_token)
          .then((res) => {
            expect(res.status).toBe(201);
            expect(res.body).toBeInstanceOf(Object);
            done();
          })
          .catch((err) => {
            done(err);
          });
      });
});