const CategoryController = require("../controllers/categoryController");
const router = require("express").Router();

router.get("/", CategoryController.readAllCategory);
router.post("/", CategoryController.addCategory);
router.get("/:id", CategoryController.getCategoryById);
router.patch("/:id", CategoryController.updateCategory);
router.delete("/:id", CategoryController.deleteCategory);

module.exports = router;
