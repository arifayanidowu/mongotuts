const router = require("express").Router();
const auth = require("../controllers/auth.controller");

exports.login = router.post("/auth/login", auth.login);

exports.profile = router.get("/auth/profile", auth.profile);
