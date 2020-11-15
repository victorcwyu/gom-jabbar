const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// socket.io
io.on("connection", (socket) => {
  let roomId;
  console.log("User connected");

  socket.on("joinroom", (data) => {
    roomId = data.id;
    socket.join(roomId);
  });

  socket.on("update", async (data) => {
    const { senderId, messages } = data;
    const sendTo = messages.users.filter((i) => i !== senderId)[0];
    socket.to(sendTo).emit("newMessage", data.newMessage);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

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
const authenticationRoutes = require("./routes/authentication");
const userRoutes = require("./routes/user");
const reportsRoutes = require("./routes/reports");

// adds the routers as middleware
app.use("/authentication", authenticationRoutes);
app.use(userRoutes);
app.use("/reports", reportsRoutes);

// error handling middleware
app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({
    message: message,
    data: data,
  });
});

server.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
