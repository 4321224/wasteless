const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET || "rahasia";

const signToken = (payload) => jwt.sign(payload, secretKey);
const verifyToken = (access_token) => jwt.verify(access_token, secretKey);

module.exports = { signToken, verifyToken };
