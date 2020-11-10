const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middleware/isAuthenticated");
const reportController = require("../controllers/reportController");

router.post("/addReport", isAuthenticated, reportController.addReport);

module.exports = router;
