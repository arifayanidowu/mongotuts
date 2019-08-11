const passport = require("passport");
const jwt = require("jsonwebtoken");

exports.login = (req, res, next) => {
  passport.authenticate(
    "local",
    { session: false, successRedirect: "/", failureRedirect: "/auth/login" },
    (err, user, info) => {
      if (err || !user) {
        return res
          .status(400)
          .json({ success: false, msg: `Invalid login credentials` });
      }

      req.login(user, { session: false }, err => {
        if (err) {
          next(err);
        }

        const token = jwt.sign(user, process.env.SECRET);
        return res.status(200).send({ user, token });
      });
    }
  )(req, res);
};

exports.profile = (req, res, next) => {
  next(req.user);
  res.status(200).json({ success: true, data: req.user });
};
