require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const app = express();

// Routes
const userRoutes = require("./routes/user.route");
const authRoutes = require("./routes/auth.route");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// DB Connect
require("./config/dbconn");

app.get("/", (req, res) => {
  res.send("Hello world");
});

// Passport
require("./config/passport");

// Handling Routes middleware
// User routes
app.use("/", userRoutes.addUser);
app.use("/", userRoutes.getUsers);
app.use("/", userRoutes.getUser);
app.use("/", userRoutes.deleteUser);
app.use("/", authRoutes.login);
app.use(
  "/",
  passport.authenticate("jwt", { session: false }),
  authRoutes.profile
);

const PORT = 3000;

app.listen(PORT, () => {
  console.log("[Server]: Listening on port", PORT);
});
