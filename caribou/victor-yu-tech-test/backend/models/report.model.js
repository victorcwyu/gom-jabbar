const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const reportSchema = new Schema(
  {
    reporter: {
      type: String,
      required: true,
    },
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
    level: {
      type: Number,
      required: true,
      min: 1,
      max: 10,
    },
  },
  { timestamps: true }
);

const Report = mongoose.model("Report", reportSchema);

module.exports = Report;
