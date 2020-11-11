const User = require("../models/user.model.js");
const Report = require("../models/report.model.js");

exports.addReport = async (req, res, next) => {
  try {
    const user = await User.findById(req.user);
    const { latitude, longitude, level } = req.body;
    const newReport = new Report({
      reporter: user.username,
      latitude,
      longitude,
      level,
    });
    const savedReport = await newReport.save();
    res.status(201).json({ savedReport });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.getReports = async (req, res, next) => {
  try {
    const retrievedReports = await Report.find();
    res.status(200).json({ retrievedReports });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
