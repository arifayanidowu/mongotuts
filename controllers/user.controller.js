const bcrypt = require("bcrypt");
const User = require("../models/User");

exports.addUser = (req, res, next) => {
  const data = req.body;
  const user = new User(data);

  User.findOne({ email: data.email }, (err, userData) => {
    if (err) {
      next();
      res.status(500).json({ msg: "An Unexpected error has occured" });
    }
    if (userData) {
      res
        .status(500)
        .json({ msg: `This user "${userData.email}" already exist` });
    } else {
      const saltrounds = 10;
      bcrypt.genSalt(saltrounds, (err, salt) => {
        if (err) {
          res
            .status(500)
            .json({ success: false, msg: `Unable to save user data` });
        }
        bcrypt.hash(user.password, salt, (err, hash) => {
          if (err) {
            res.status(500).json({ success: false, msg: `Couldn't save data` });
          } else {
            user.password = hash;
            user.save((err, data) => {
              if (err) {
                res.status(500).json({
                  msg: `An error occured while trying to save data: ${data}`
                });
              } else {
                return res.status(200).send({ success: true, data });
              }
            });
          }
        });
      });
    }
  });
};

exports.getUsers = (req, res, next) => {
  User.find({}, (err, data) => {
    if (err) {
      next();
      res.status(500).json({
        success: false,
        msg: `An Unexpected error while trying to fetch data`
      });
    } else {
      res.status(200).json({ success: true, data });
    }
  });
};

exports.getUser = (req, res, next) => {
  User.findById(req.params.id, (err, data) => {
    if (err) {
      next();
      res
        .status(500)
        .json({ msg: `An error occured while trying to fetch data` });
    } else {
      res.status(200).json({ success: true, data });
    }
  });
};

exports.deleteUser = (req, res, next) => {
  User.findByIdAndDelete(req.params.id, (err, data) => {
    if (err) {
      next(err);
      res.status(500).json({
        success: false,
        msg: `Failed to delete data with id: ${req.params.id}`
      });
    } else {
      res.status(200).json({ success: true, data });
    }
  });
};

// exports.login = (req, res, next) => {
//   const data = req.body;

//   User.findOne({ email: data.email }, (err, credentials) => {
//     if (err) {
//       next(err);
//       res.status(500).json({ success: false, msg: `Failed to log in user` });
//     }
//     if (credentials) {
//       bcrypt
//         .compare(data.password, credentials.password)
//         .then(res => {
//           res.status(200).json({ success: true, res });
//         })
//         .catch(err => {
//           res
//             .status(404)
//             .json({ success: false, msg: `Unapproved credentials` });
//         });
//     }
//   });
// };

exports.login = (req, res, next) => {
  const data = req.body;

  User.findOne({ email: data.email }).exec((err, credentials) => {
    if (err) {
      next(err);
      res.status(500).json({ success: false, msg: "Failed to log in user" });
    }
    if (credentials) {
      bcrypt
        .compare(data.password, credentials.password)
        .then(userData => {
          res.status(200).json({ success: true, userData });
        })
        .catch(err => {
          next(err);
          res
            .status(404)
            .json({ success: false, msg: `Unauthorized login credentials` });
        });
    }
  });
};
