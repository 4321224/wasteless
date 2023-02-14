const Post = require("../models/post");

class SearchController {
  static async getSearchPost(req, res) {
    try {
      const search = req.query.search || "";
      let sort = req.query.sort;
      let category = req.query.category || "category";

      const categoryOptions = ["Botol", "Kotak Plastik", "Kardus"];

      // category === "name"
      //    (category = [...categoryOptions])
      //   : (category = req.query.category.split(","));
      // req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);

      // let sortBy = {};
      // if (sort[1]) {
      //   sortBy[sort[0]] = sort[1];
      // } else {
      //   sortBy[sort[0]] = "asc";
      // }

      const response = await Post.find({
        title: { $regex: search, $options: "i" },
      })
        .where("title")
        .in([...title])
        .sort({ createdAt: "asc" });

      res.status(200).json(response);
    } catch (error) {
      console.log(error, "ini error");
      res.status(500).json(error.message);
    }
  }
}

module.exports = SearchController;
