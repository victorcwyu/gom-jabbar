const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const validateUserInfo = () => {
  return [
    // username must be at least 3 chars long
    body("username").trim().isLength({ min: 3 }),
    // confirms email is an email and canonicalizes email address
    body("email").trim().isEmail().normalizeEmail(),
    // password must be at least 3 chars long
    body("password").trim().isLength({ min: 3 }),
    // confirm password must is at least 3 chars long
    body("confirmPassword").trim().isLength({ min: 3 }),
  ];
};

const createUser = async (req, res, next) => {
  // Finds validation errors in request and wraps them in an object with handy functions
  const errors = validationResult(req);

  try {
    if (!errors.isEmpty()) {
      const error = new Error("User validation failed!");
      error.statusCode = 400;
      throw error;
    }
    const { username, email, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
      const error = new Error("The passwords must match!");
      error.statusCode = 400;
      throw error;
    }
    const existingUser = await User.findOne({ username: username });
    if (existingUser) {
      const error = new Error("An account with this username already exists!");
      error.statusCode = 400;
      throw error;
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
      username,
      email,
      password: hashedPassword,
    });
    const savedUser = await user.save();
    res
      .status(201)
      .json({ msg: "User created, please login!", user: savedUser });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

module.exports = { validateUserInfo, createUser };
