const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const User = require("../models/User");

module.exports = function(passport) {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      User.findOne({ email }).exec((err, data) => {
        if (err || !data) {
          return done(null, false, { msg: `This email is not registered` });
        } else {
          bcrypt.compare(password, data.password, (err, isMatch) => {
            if (err) {
              throw err;
            }
            if (isMatch) {
              return done(null, data);
            } else {
              return done(null, false, { msg: `Password Incorrect` });
            }
          });
        }
      });
    })
  );

  passport.serializeUser(function(user, done) {
    return done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, (err, user) => {
      return done(err, user);
    });
  });
};
