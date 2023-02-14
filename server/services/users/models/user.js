"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Transaction, {
        foreignKey: "payerId",
        as: "Payer",
      });
      User.hasMany(models.Transaction, {
        foreignKey: "payeeId",
        as: "Payee",
      });
    }
  }
  User.init(
    {
      username: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: { message: "Username is already in use" },
        validate: {
          len: {
            args: [6],
            message: "Username must be 6 characters or longer",
          },
          notEmpty: { message: "Username cannot be empty" },
          notNull: { message: "Username cannot be empty" },
        },
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: { message: "Email is already in use" },
        validate: {
          isEmail: { message: "Must be in email format" },
          notEmpty: { message: "Email cannot be empty" },
          notNull: { message: "Email cannot be empty" },
        },
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          len: {
            args: [6],
            message: "Password must be 6 characters or longer",
          },
          notEmpty: { message: "Password cannot be empty" },
          notNull: { message: "Password cannot be empty" },
        },
      },
      phoneNumber: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: { message: "Phone Number is already in use" },
        validate: {
          notEmpty: { message: "Phone Number cannot be empty" },
          notNull: { message: "Phone Number cannot be empty" },
        },
      },
      address: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notEmpty: { message: "Address cannot be empty" },
          notNull: { message: "Address cannot be empty" },
        },
      },
      balance: DataTypes.INTEGER,
      points: DataTypes.INTEGER,
    },
    {
      hooks: {
        beforeCreate: (instance) => {
          instance.password = hashPassword(instance.password);
          instance.balance = 0;
          instance.points = 0;
        },
      },
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
