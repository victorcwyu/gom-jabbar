const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const isAuthenticated = require("../middleware/isAuthenticated");

router.post("/getCurrentUser", isAuthenticated, userController.getCurrentUser);

router.post("/findUser", isAuthenticated, userController.findUser);

module.exports = router;
