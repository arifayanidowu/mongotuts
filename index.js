require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const flash = require("connect-flash");
const session = require("express-session");
const app = express();
const { ensureAuthenticated, forwardAuthenticated } = require("./config/auth");

require("./config/passport")(passport);

// Routes
const userRoutes = require("./routes/user.route");
const authRoutes = require("./routes/auth.route");
const postRoutes = require("./routes/post.route");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Express session
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
app.use(flash());

app.get("/", forwardAuthenticated, (req, res) => {
  res.send("Hello world");
});

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

// Passport
// DB Connect
require("./config/dbconn");

// Handling Routes middleware
// User routes
app.use("/", userRoutes.getUsers);
app.use("/", userRoutes.getUser);
app.use("/", userRoutes.deleteUser);
app.use("/", userRoutes.updateUser);

// Post routes
app.use("/", postRoutes.createPost);
app.use("/", postRoutes.updatePost);
app.use("/", postRoutes.getPosts);

// Auth routes
app.use("/", authRoutes.login);
app.use("/", authRoutes.register);
app.use("/", ensureAuthenticated, authRoutes.profile);

const PORT = 3000;

app.listen(PORT, () => {
  console.log("[Server]: Listening on port", PORT);
});
