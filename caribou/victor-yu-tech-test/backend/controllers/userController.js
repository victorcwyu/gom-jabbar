const User = require("../models/user.model.js");
const Message = require("../models/message.model.js");

exports.getCurrentUser = async (req, res, next) => {
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

exports.findUser = async (req, res, next) => {
  try {
    const { username } = req.body;
    const currentUser = await User.findById(req.user);
    if (currentUser.username === username) {
      const error = new Error("You can not add yourself as a contact.");
      error.statusCode = 400;
      throw error;
    }
    const alreadyInContacts = currentUser.contact.find((i) => {
      return i.username === username;
    });
    if (alreadyInContacts) {
      const error = new Error("This user is already in your contacts.");
      error.statusCode = 400;
      throw error;
    }
    const notInContacts = await User.findOne({ username });
    if (!notInContacts) {
      const error = new Error("That user does not exist.");
      error.statusCode = 400;
      throw error;
    }
    res
      .status(200)
      .json({ username: notInContacts.username, id: notInContacts._id });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
