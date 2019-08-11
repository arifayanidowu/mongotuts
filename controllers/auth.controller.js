const passport = require("passport");
// const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.register = (req, res, next) => {
  const data = req.body;
  User.findOne({ email: data.email }, (err, user) => {
    if (err) {
      next();
      res.status(500).json({ success: false, msg: `An error occured` });
    }
    if (user) {
      res
        .status(500)
        .json({ success: false, msg: `User with email already exist` });
    } else {
      const newUser = new User(data);
      const saltRounds = 10;
      bcrypt.genSalt(saltRounds, (err, salt) => {
        if (err) {
          res
            .status(500)
            .json({ success: false, msg: `Unable to encrypt password` });
        }
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => {
              req.flash("success_msg", "You have registered successfully.");
              res.status(200).json({ success: true, user });
            })
            .catch(err => {
              console.log(err);
            });
        });
      });
    }
  });
};

exports.login = (req, res, next) => {
  passport.authenticate(
    "local",
    {
      successRedirect: "/",
      failureRedirect: "/login",
      failureFlash: true
    },
    user => {
      res.status(200).json({
        success: true,
        msg: `Logged in successfully`,
        user
      });
    }
  )(req, res, next);
};

exports.logout = (req, res, next) => {
  req.logout();
  req.flash("success_msg", "You are now logged out");
  res.redirect("/login");
  next();
};

exports.profile = (req, res, next) => {
  res.status(200).json({ success: true, data: req.user });
  // next();
};
