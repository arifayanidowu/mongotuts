const router = require("express").Router();
const auth = require("../controllers/auth.controller");

exports.register = router.post("/register", auth.register);

exports.login = router.post("/auth/login", auth.login);

exports.profile = router.get("/auth/profile", auth.profile);

exports.logout = router.get("/logout", auth.logout);
