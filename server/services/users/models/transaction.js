"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Transaction extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Transaction.belongsTo(models.User, {
				foreignKey: "payerId",
				as: "Payer",
			});
			Transaction.belongsTo(models.User, {
				foreignKey: "payeeId",
				as: "Payee",
			});
		}
	}
	Transaction.init(
		{
			payerId: DataTypes.INTEGER,
			payeeId: DataTypes.INTEGER,
			totalPrice: DataTypes.INTEGER,
			commission: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: "Transaction",
		}
	);
	return Transaction;
};
