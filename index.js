require("dotenv").config();
const express = require("express");
const app = express();

// Routes
const addUserRoutes = require("./routes/addUser");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hello world");
});

require("./config/dbconn");

app.use("/", addUserRoutes);

const PORT = 3000;

app.listen(PORT, (req, res) => {
  console.log("[Server]: Listening on port", PORT);
});
