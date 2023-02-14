const Search = require("../controllers/search");
const router = require("express").Router();

router.get("/", Search.getSearchPost);

module.exports = router;
