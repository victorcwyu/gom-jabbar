const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// connects to database in MongoDB Atlas
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

// loads the routes from respective files
const usersRoute = require("./routes/users");
const messagesRoute = require("./routes/messages");
const reportsRoute = require("./routes/reports");

// adds the routers as middleware
app.use("/users", usersRoute);
app.use("/messages", messagesRoute);
app.use("/reports", reportsRoute);

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
