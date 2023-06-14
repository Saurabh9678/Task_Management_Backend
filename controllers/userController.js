const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const User = require("../models/user");
const sendToken = require("../utils/jwtToken");

exports.registerUser = catchAsyncError(async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return next(
      new ErrorHandler("Please enter your username and password", 400)
    );
  }

  const usernameExist = await User.findOne({
    where: { username: username },
  }).catch((err) => {
    return next(new ErrorHandler(`Error: + ${err}`, 400));
  });

  if (usernameExist) {
    return next(
      new ErrorHandler(
        "Username already exist, please login or choose a different username",
        409
      )
    );
  }

  const user = await User.create({
    username,
    password,
  });

  sendToken(user, 201, res);
});

exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return next(
      new ErrorHandler("Please enter your username and password", 400)
    );
  }

  const user = await User.findOne({ where: { username } });

  if (!user) {
    return next(new ErrorHandler("Invalid username or password", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid username or password", 401));
  }

  sendToken(user, 200, res);
});
