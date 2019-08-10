const User = require("../models/User");

exports.addUser = function(req, res, next) {
  const data = req.body;
  const user = new User(data);

  User.findOne({ email: data.email }, (err, userData) => {
    if (userData) {
      console.log(`user ${userData} already exist`);
    }
    if (err) {
      res.status(500).json({ msg: "An Unexpected error has occured" });
    } else {
      user.save((err, data) => {
        if (err) {
          console.log(`An error occured while trying to save data: ${data}`);
          res.status(500).json({
            msg: `An error occured while trying to save data: ${data}`
          });
        } else {
          next();
          return res.status(200).send({ success: true, data });
        }
      });
    }
  });
};
