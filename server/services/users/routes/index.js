const express = require(`express`);
const Controller = require("../controllers/usersController");
const router = express.Router();
const errorHandler = require("../middlewares/errorHandler");
const usersRoutes = require("./usersRoutes")
const transactionRoutes = require("./transactionRoutes")

router.use(`/users`,usersRoutes)
router.use(`/transaction`,transactionRoutes)
// router.get(`/users`, Controller.getAllUsers);
// router.get(`/users/:id`, Controller.getUserById);
// router.post(`/users/login`, Controller.userLogin);
// router.post(`/users/register`, Controller.userRegister);

// router.delete(`/users/:id`)
// router.put(`/users/:id`)
// router.patch(`/users/:id`)

router.use(errorHandler);

module.exports = router;
