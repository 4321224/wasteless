if (process.env.NODE_ENV !== "production") require("dotenv").config();
const express = require(`express`);
const router = require("./routes");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  // res.send("This is a microservices server for users");
});

app.use(router);

module.exports = app;
