const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const reportSchema = new Schema(
  {
    reporter: {
      type: String,
      required: true,
    },
    location: {
      type: [],
      required: true,
    },
  },
  { timestamps: true }
);

const Report = mongoose.model("Report", reportSchema);

module.exports = Report;
