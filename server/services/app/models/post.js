const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "title is required"],
  },
  giver_id: {
    type: String,
    required: [true, "description is required"],
  },
  taker_id: {
    type: String
  },
  category_id: {
    type: String,
    required: [true, "description is required"],
  },
  description: {
    type: String,
    required: [true, "description is required"],
  },
  mainImage: {
    type: String,
    required: [true, "mainImage is required"],
  },
  quantity: {
    type: Number,
    required: [true, "quantity is required"],
  },
  lat: {
    type: String,
    required: [true, "lattitude is required"],
  },
  long: {
    type: String,
    required: [true, "longitude is required"],
  },
  status: {
    type: String,
    required: [true, "status is required"],
  },
});

const Post = mongoose.model("Posts", postSchema);

module.exports = Post;
