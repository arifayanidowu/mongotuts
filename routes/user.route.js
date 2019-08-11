const express = require("express");
const router = express.Router();
const user = require("../controllers/user.controller");

exports.getUsers = router.get("/users", user.getUsers);
exports.getUser = router.get("/user/:id", user.getUser);
exports.deleteUser = router.delete("/user/:id", user.deleteUser);
exports.updateUser = router.patch("/user/:id", user.updateUser);
