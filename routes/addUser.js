const express = require("express");
const router = express.Router();
const user = require("../controllers/user.controller");

const addUser = router.post("/add", user.addUser);

module.exports = addUser;
