const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
  },
  price: {
    type: Number,
    required: [true, "price is required"],
  },
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
