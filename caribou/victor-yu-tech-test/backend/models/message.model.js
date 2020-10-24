const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const messageSchema = new Schema(
  {
    users: {
      type: [],
      require: true,
    },
    messageHistory: {
      type: [],
      required: true,
    },
  },
  { timestamps: true }
);
