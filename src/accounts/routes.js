const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();

//controllers
const { register, login } = require("./controllers");

router.post("/register", bodyParser.json(), register);
router.post("/login", bodyParser.json(), login);

module.exports = router;
