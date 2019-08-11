const Post = require("../models/Post");
const User = require("../models/User");

exports.createPost = (req, res, next) => {
  const body = req.body;
  User.findOne({ _id: req.params.id }, (err, data) => {
    const post = new Post(body);
    post.user = data.id;
    if (err) {
      next();
      res.status(500).json({ success: false, msg: "Failed to create post" });
    }
    post
      .save()
      .then(data => {
        res.status(200).json({ success: true, data });
      })
      .catch(err => {
        throw err;
      });
  });
};

exports.getPosts = (req, res, next) => {
  Post.find({}, (err, data) => {
    if (err) {
      next();
      res.status(500).json({ success: false, msg: `Unable to fetch posts` });
    }
    res.status(200).json({ success: true, data });
  });
};

exports.updatePost = (req, res, next) => {
  const body = req.body;
  Post.findOneAndUpdate(
    { _id: req.params.id },
    body,
    { new: true },
    (err, data) => {
      if (err) {
        next();
        res.status(500).json({ success: false, msg: `Unable to update post` });
      }
      res.status(200).json({ success: true, data });
    }
  );
};
