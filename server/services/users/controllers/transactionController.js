const { Transaction, User, History, sequelize } = require("../models");

class Controller {
  static async create(req, res, next) {
    let { id: payerId } = req.user;
    let { payeeId, totalPrice } = req.body;
    let status = `Success`;
    try {
      const result = await sequelize.transaction(async (t) => {
        const commission = 0.1 * totalPrice;
        const transaction = await Transaction.create(
          { payerId, payeeId, totalPrice, commission },
          { transaction: t }
        );

        const [_,payingUser] = await User.update(
          {
            balance: sequelize.literal(`balance - ${totalPrice}`),
            points: sequelize.literal(`points + ${commission}`),
          },
          {
            where: { id: payerId },
            transaction: t,
            returning: true,
            plain: true,
          }
        );

        if (payingUser.balance < 0)
          throw { name: "BAD_TRANSACTION_REQUEST", message: "Not enough balance" };

        await User.update(
          {
            balance: sequelize.literal(`balance + ${totalPrice - commission}`),
            points: sequelize.literal(`points + ${commission}`),
          },
          { where: { id: payeeId }, transaction: t }
        );

        return transaction;
      });

      res.status(200).json({ result });
    } catch (error) {
      status = "Failed";
      next(error);
    } finally {
      await History.create({ payerId, payeeId, amount: totalPrice, status });
    }
  }

  static async getIncoming(req, res, next) {
    const { id } = req.params;
    try {
      const incomingPayment = await Transaction.findAll({
        where: { payeeId: id },
        include: [
          {
            model: User,
            as: "Payee",
            attributes: {
              exclude: ["password"],
            },
          },
          {
            model: User,
            as: "Payer",
            attributes: {
              exclude: ["password"],
            },
          },
        ],
      });

      res.status(200).json({ incomingPayment });
    } catch (error) {
      next(error);
    }
  }

  static async getOutgoing(req, res, next) {
    const { id } = req.params;
    try {
      const outgoingPayment = await Transaction.findAll({
        where: { payerId: id },
        include: [
          {
            model: User,
            as: "Payee",
            attributes: {
              exclude: ["password"],
            },
          },
          {
            model: User,
            as: "Payer",
            attributes: {
              exclude: ["password"],
            },
          },
        ],
      });

      res.status(200).json(outgoingPayment);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
