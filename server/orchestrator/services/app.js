const axios = require("axios");
const baseURL = process.env.APP_SERVICES_URL || "http://localhost:4001";

const App = axios.create({
	baseURL
});

module.exports = App;