const User = require("../models/user.model.js");
const Message = require("../models/message.model.js");
const { Children } = require("react");

exports.getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user);
    if (!user) {
      const error = new Error("User was not found!");
      error.statusCode = 400;
      throw error;
    }
    res.status(200).json({
      id: user._id,
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
      const error = new Error("You can not add yourself as a contact!");
      error.statusCode = 400;
      throw error;
    }
    const alreadyInContacts = currentUser.contacts.find((i) => {
      return i.username === username;
    });
    if (alreadyInContacts) {
      const error = new Error("This user is already in your contacts!");
      error.statusCode = 400;
      throw error;
    }
    const validUser = await User.findOne({ username });
    if (!validUser) {
      const error = new Error("That user does not exist!");
      error.statusCode = 400;
      throw error;
    }
    res.status(200).json({ username: validUser.username, id: validUser._id });
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
    const { contactId } = req.body;
    const currentUser = await User.findById(req.user);
    const updatedContacts = currentUser.contacts.filter(
      (i) => i.id !== contactId
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

exports.getUserMessages = async (req, res, next) => {
  try {
    const { userId, contactId } = req.body;
    const retrievedMessages = await Message.find();
    let userMessageHistory;
    // Case for very first document added to MongoDB collection of messages
    if (!retrievedMessages || retrievedMessages.length < 1) {
      const messageInitialization = new Message({
        users: [userId, contactId],
        messages: [],
      });
      userMessageHistory = await messageInitialization.save();
      res.status(200).json({ userMessageHistory: userMessageHistory });
      return;
    }
    // Filters for the desired document associated with the 2 users
    const filteredMessages = retrievedMessages.filter((i) => {
      if (i.users.includes(userId) && i.users.includes(contactId)) {
        return i;
      }
    });
    // Case where there are stored documents, but not between the 2 users
    if (!filteredMessages.length) {
      const messageInitialization = new Message({
        users: [userId, contactId],
        messages: [],
      });
      userMessageHistory = await messageInitialization.save();
    }
    // Retrieves the document associated with the 2 users
    if (filteredMessages.length) {
      userMessageHistory = filteredMessages[0];
    }
    res.status(200).json({ userMessageHistory: userMessageHistory });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.updateUserMessages = async (req, res) => {
  try {
    const { newMessage, messagesId } = req.body;
    const messagesQuery = { _id: messagesId };
    // Retrieves the document associated with the 2 users
    const messages = await Message.findById(messagesQuery);
    // Spreads the messageHistory array and adds the new message
    messages.messageHistory = [...messages.messageHistory, newMessage];
    // Saves and updates database
    const savedMessages = await messages.save();
    res.status(200).json({ savedMessages: savedMessages });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
