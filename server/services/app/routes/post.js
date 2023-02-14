const PostController = require("../controllers/postController");
const router = require("express").Router();

router.get("/", PostController.getAllPost);
router.post("/", PostController.createPost);
router.get("/:postId", PostController.getPostById);
router.patch("/:postId", PostController.updatePost);
router.delete("/:postId", PostController.deletePost);

module.exports = router;
