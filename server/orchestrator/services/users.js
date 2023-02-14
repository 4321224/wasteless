const axios = require("axios");
const baseURL = process.env.USERS_SERVICES_URL || "http://localhost:4002";

const Users = axios.create({
	baseURL,
});

module.exports = Users;