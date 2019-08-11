const bcrypt = require("bcrypt");
const User = require("../models/User");
const mongoose = require("mongoose");
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
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    User.findById(req.params.id).exec((err, data) => {
      if (err) {
        next();
        res.status(500).json({
          success: false,
          msg: `An error occured while trying to fetch data`
        });
      }
      if (data) {
        res.status(200).json({ success: true, data });
      } else {
        res.status(404).json({
          success: false,
          msg: `Data with id: "${req.params.id}" does not exist`
        });
      }
    });
  }
};

exports.updateUser = (req, res, next) => {
  const body = req.body;
  User.findOneAndUpdate(
    { _id: req.params.id },
    body,
    { new: true },
    (err, data) => {
      if (err) {
        next();
        res.status(500).json({ success: false, msg: `Unexpected error.` });
      }
      res.status(200).json({ success: true, data });
    }
  );
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
