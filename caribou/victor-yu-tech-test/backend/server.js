const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

const uri = process.env.ATLAS_URI;

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .catch((err) =>
    console.log("Error establishing connection to MongoDB database", err)
  );

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongoDB database connection establishment success");
});

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
