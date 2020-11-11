const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middleware/isAuthenticated");
const reportController = require("../controllers/reportController");

router.post("/addReport", isAuthenticated, reportController.addReport);

router.get("/getReports", isAuthenticated, reportController.getReports);

module.exports = router;
