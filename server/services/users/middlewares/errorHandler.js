const errorHandler = (error, req, res, next) => {
  console.log(error);
  let code;
  let message;

  switch (error.name) {
    case `SequelizeValidationError`:
    case `SequelizeUniqueConstraintError`:
      code = 400;
      message = error.errors.map((el) => el.message);
      break;
    //ini belum dipake
    case `BAD_TRANSACTION_REQUEST`:
    case `BAD_PATCH_REQUEST`:
      code = 400;
      message = error.message;
      break;
    case `Unauthorized`:
      code = 401;
      message = "Invalid token";
      break;
    case `JsonWebTokenError`:
      code = 401;
      message = "Invalid token";
      break;
    case `Invalid Email or Password`:
      code = 401;
      message = "Invalid Email or password!";
      break;
    // case `Not Found`:
    // code = 404;
    // message = "Data not found";
    // break;
    default:
      code = 500;
      message = "Internal Server Error!";
      break;
  }
  res.status(code).json({ message });
};

module.exports = errorHandler;
