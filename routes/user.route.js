const express = require("express");
const router = express.Router();
const user = require("../controllers/user.controller");

exports.getUsers = router.get("/users", user.getUsers);
exports.getUser = router.get("/user/:id", user.getUser);
exports.addUser = router.post("/add", user.addUser);
exports.deleteUser = router.delete("/user/:id", user.deleteUser);
exports.login = router.get("/user/login", user.login);
