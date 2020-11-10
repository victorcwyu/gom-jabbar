const express = require("express");
const router = express.Router();
const authenticationController = require("../controllers/authenticationController");

router.post(
  "/signup",
  authenticationController.validateUserInfo,
  authenticationController.createUser
);

router.post("/login", authenticationController.login);

router.post(
  "/authenticationTokenVerification",
  authenticationController.authenticationTokenVerification
);

module.exports = router;
