const express = require("express");
const router = express.Router();

const authenticationController = require("../controllers/authenticationController");

router.post(
  "/signup",
  authenticationController.validateUserInfo,
  authenticationController.createUser
);

module.exports = router;
