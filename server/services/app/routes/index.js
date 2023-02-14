const router = require("express").Router();
const post = require("./post");
const category = require("./category");
const search = require("./search");
const appointment = require("./appointment");

router.use("/posts", post);
router.use("/categories", category);
router.use("/search", search);
router.use("/appointment", appointment);

module.exports = router;
