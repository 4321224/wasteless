const { comparePassword } = require("../helpers/bcrypt");
const { signToken, verifyToken } = require("../helpers/jwt");
const { User, sequelize } = require("../models");
const XenditInvoice = require(`../config/xendit`);
class Controller {
  static async getAllUsers(req, res, next) {
    try {
      const users = await User.findAll();

      return res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }

  static async getUserById(req, res, next) {
    const { id } = req.params;
    try {
      console.log(id);
      const user = await User.findByPk(id, {
        attributes: { excludes: ["password"] },
      });

      console.log(user);

      return res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  static async userRegister(req, res, next) {
    const { username, email, password, phoneNumber, address } = req.body;
    try {
      const newUser = await User.create({
        username,
        email,
        password,
        phoneNumber,
        address,
      });

      res.status(201).json({
        newUser,
        message: "Create user successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  static async userLogin(req, res, next) {
    const { email, password } = req.body;
    try {
      const foundUser = await User.findOne({ where: { email } });

      if (!foundUser || !comparePassword(foundUser.password, password)) {
        throw { name: "Invalid Email or Password" };
      }

      console.log(foundUser.id);

      const access_token = signToken({ id: foundUser.id });

      const payload = verifyToken(access_token);

      console.log(payload);

      return res.status(200).json({ access_token, id: foundUser.id });
    } catch (error) {
      next(error);
    }
  }

  static async balanceTopUp(req, res, next) {
    const { balance } = req.body;
    const { id } = req.user;
    try {
      const result = await sequelize.transaction(async (t) => {
        const foundUser = await User.findOne(
          { where: { id } },
          { transaction: t }
        );

        const xenditInvoice = await XenditInvoice.createInvoice(
          `${foundUser.id}-${new Date().getTime()}`,
          +balance,
          foundUser
        );

        return xenditInvoice;
      });

      res.status(200).json({
        external_id: result.external_id,
        invoice_url: result.invoice_url,
      });
    } catch (error) {
      next(error);
    }
  }

  static async successTopUp(req, res, next) {
    try {
      const { external_id, totalPrice: amount, status } = req.body;
      console.log(req.body);
      if (status == "PAID") {
        const foundUser = await User.findOne({
          where: {
            id: external_id.split("-")[0],
          },
        });
        await User.update(
          {
            balance: sequelize.literal(`balance + ${amount}`),
          },
          {
            where: {
              id: foundUser.id,
            },
          }
        );

        res.status(201).json({ message: "Topup Success!" });
      } else throw { name: "BAD_REQUEST" };
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
