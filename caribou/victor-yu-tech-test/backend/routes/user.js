const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const isAuthenticated = require("../middleware/isAuthenticated");

router.post("/getCurrentUser", isAuthenticated, userController.getCurrentUser);

router.post("/findUser", isAuthenticated, userController.findUser);

router.post("/addContact", isAuthenticated, userController.addContact);

router.delete("/removeContact", isAuthenticated, userController.removeContact);

router.post(
  "/getUserMessages",
  isAuthenticated,
  userController.getUserMessages
);

router.post(
  "/updateUserMessages",
  isAuthenticated,
  userController.updateUserMessages
);

module.exports = router;
