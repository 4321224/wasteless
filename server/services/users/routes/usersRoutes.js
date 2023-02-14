const express = require(`express`);
const Controller = require("../controllers/usersController");
const authentication = require("../middlewares/authentication");
const router = express.Router();

router.get(`/`, Controller.getAllUsers);
router.get(`/:id`, Controller.getUserById);
router.post(`/login`, Controller.userLogin);
router.post(`/register`, Controller.userRegister);

router.use(authentication);

router.post(`/topup`, Controller.balanceTopUp);
router.post(`/success`, Controller.successTopUp);

module.exports = router;
