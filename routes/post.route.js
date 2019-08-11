const express = require("express");
const router = express.Router();
const post = require("../controllers/post.controller");

exports.createPost = router.post("/create/:id", post.createPost);
exports.updatePost = router.patch("/update/:id", post.updatePost);
exports.getPosts = router.get("/posts", post.getPosts);
