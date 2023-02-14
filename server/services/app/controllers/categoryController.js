const Category = require("../models/category");

class CategoryController {
  static async readAllCategory(req, res) {
    const {category} = req.params
    try {
      const options = {}
      // if(category) options = {
        
      // }
      const result = await Category.find(options);
      console.log(result)
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
  static async addCategory(req, res) {
    try {
      const { name, price } = req.body;
      if (!name || !price) {
        return res.status(400).json({ message: "Invalid input" });
      }
      const newCategory = {
        name,
        price,
      };
      await Category.create(newCategory);

      res.status(201).json({ message: "Success create category" });
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
  static async getCategoryById(req, res) {
    try {
      const { id } = req.params;
      const result = await Category.findById(id);
      if (!result) {
        return res.status(404).json({ message: "Category Not Found" });
      }
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
  static async updateCategory(req, res) {
    try {
      const { id } = req.params;
      const { name, price } = req.body;
      const category = await Category.findById(id);
      const updatedPost = {
        name,
        price,
      };
      const updateCategory = await Category.findByIdAndUpdate(id, updatedPost, {
        new: true,
      });
      res.status(200).json({ message: "update success" });
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
  static async deleteCategory(req, res) {
    try {
      const { id } = req.params;
      const category = await Category.findById(id);
      const deletedCategory = await Category.findByIdAndRemove(id, {
        returnOriginal: true,
      });
      res.status(200).json({ message: "success delete" });
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
}

module.exports = CategoryController;
