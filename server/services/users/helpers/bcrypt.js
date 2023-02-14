const bcrypt = require("bcryptjs");
const salt = process.env.SALT || 6;

const hashPassword = (password) => bcrypt.hashSync(password, 6);
const comparePassword = (hash, password) => bcrypt.compareSync(password, hash);

module.exports = { hashPassword, comparePassword };
