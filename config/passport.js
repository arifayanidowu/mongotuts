const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const User = require("../models/User");

passport.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    (email, password, callback) => {
      return User.findOne({ email, password }).exec((err, user) => {
        if (err) {
          callback(null, false, { msg: `Invalid login credentials` });
        }
        if (!user) {
          callback(null, false, { msg: `Incorrect email or password` });
        } else {
          callback(null, user, { msg: `Logged In successfully` });
        }
      });
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET
    },
    (jwtPayload, callback) => {
      return User.findById(jwtPayload.id).exec((err, user) => {
        if (err) {
          return callback(err);
        } else {
          return callback(null, user);
        }
      });
    }
  )
);
