const User = require("../models/user.model.js");
const Message = require("../models/message.model.js");

exports.getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user);
    if (!user) {
      const error = new Error("User was not found!");
      error.statusCode = 400;
      throw error;
    }
    res.status(200).json({
      username: user.username,
      contacts: user.contacts,
      reports: user.reports,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
