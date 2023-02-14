const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models");

const authentication = async (req, res, next) => {
  try {
    const { access_token } = req.headers;
    if (!access_token) {
      throw { name: "Unauthorized" };
    }
    const payload = verifyToken(access_token);
    const user = await User.findByPk(+payload.id);
    req.user = {
      id: user.id,
    };
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authentication;
