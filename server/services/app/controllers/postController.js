const { ObjectId } = require("mongodb");
const Post = require("../models/post");
let latlngDist = require("latlng-distance");
class PostController {
  static async getAllPost(req, res) {
    const { category_id, lat, long } = req.query;
    let options = {};
    try {
      if (category_id) {
        options = {
          category_id,
          status: "pending",
        };
      }

      console.log(req.query);

      console.log("masuk sini");
      let result = await Post.find(options);

      if (lat || long) {
        result = result.filter(
          (el) =>
            latlngDist.distanceDiffInKm(
              { lat: +lat, lon: +long },
              { lat: +el.lat, lon: +el.long }
            ) <= 5
        );
      }

      console.log(result);

      res.status(200).json(result);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
  static async getPostById(req, res) {
    const { postId } = req.params;
    try {
      const result = await Post.findById(postId);
      // console.log(result, "ini result");
      if (!result) {
        return res.status(404).json({ message: "Post Not Found" });
      }
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
  static async createPost(req, res) {
    try {
      const {
        giver_id,
        category_id,
        title,
        description,
        mainImage,
        quantity,
        lat,
        long,
        status,
      } = req.body;
      console.log(req.body);
      if (!title || !mainImage || !description || !quantity || !status) {
        return res.status(404).json({ message: "Invalid input" });
      }

      const postInput = {
        giver_id,
        category_id,
        title,
        description,
        mainImage,
        quantity,
        lat,
        long,
        status,
      };
      const result = await Post.create(postInput);
      console.log(result);
      res.status(201).json({ message: "Success create post" });
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
  static async updatePost(req, res) {
    try {
      const { postId } = req.params;
      // const { title, decription, mainImage, quantity, string } = req.body;
      const post = await Post.findById(postId);
      const updatedPost = {
        ...req.body,
      };
      const updatePost = await Post.findByIdAndUpdate(postId, updatedPost, {
        new: true,
      });
      res.status(200).json({ message: "update success" });
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
  static async deletePost(req, res) {
    try {
      const { postId } = req.params;
      const post = await Post.findById(postId);
      const deletedPost = await Post.findByIdAndRemove(postId, {
        returnOriginal: true,
      });
      res.status(200).json({ message: "success delete" });
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
}

module.exports = PostController;
