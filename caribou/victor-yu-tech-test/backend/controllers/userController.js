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
    const alreadyInContacts = currentUser.contacts.find((i) => {
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

exports.addContact = async (req, res, next) => {
  try {
    const { contactData } = req.body;
    const currentUser = await User.findById(req.user);
    const alreadyInContacts = currentUser.contacts.find((i) => {
      return i.username === contactData.username;
    });
    if (alreadyInContacts) {
      const error = new Error("This user is already in your contacts.");
      error.statusCode = 400;
      throw error;
    }
    currentUser.contacts.push(contactData);
    currentUser.save();
    res.status(201).json({ contactData });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.removeContact = async (req, res, next) => {
  try {
    const { contactData } = req.body;
    const currentUser = await User.findById(req.user);
    const updatedContacts = currentUser.contacts.filter(
      (i) => i.id !== contactData.id
    );
    currentUser.contacts = updatedContacts;
    await currentUser.save();
    res.status(200).json({ updatedContacts });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
