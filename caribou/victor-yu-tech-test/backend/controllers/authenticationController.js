const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");
const User = require("../models/user.model.js");
const jwt = require("jsonwebtoken");
const jwtKey = process.env.JWT_SECRET_KEY;

exports.validateUserInfo = [
  // username must be at least 3 chars long
  body("username").trim().isLength({ min: 3 }),
  // confirms email is an email and canonicalizes email address
  body("email").trim().isEmail().normalizeEmail(),
  // password must be at least 3 chars long
  body("password").trim().isLength({ min: 3 }),
  // confirm password must is at least 3 chars long
  body("confirmPassword").trim().isLength({ min: 3 }),
];

exports.createUser = async (req, res, next) => {
  // Finds validation errors in request and wraps them in an object with handy functions
  const errors = validationResult(req);

  try {
    if (!errors.isEmpty()) {
      const error = new Error("Validation of user information failed!");
      error.statusCode = 422;
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
    res.status(201).json({ msg: "User created, please login!" });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });
    if (!user) {
      const error = new Error("The username is not valid!");
      error.statusCode = 401;
      throw error;
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      const error = new Error("The password is not valid!");
      error.statusCode = 401;
      throw error;
    }
    const authenticationToken = jwt.sign({ id: user._id }, jwtKey);
    res.status(200).json({ authenticationToken });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
