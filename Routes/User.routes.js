const dotenv = require('dotenv');
dotenv.config();
const express = require("express");
const router = express.Router();

// Load User model
const User = require("../Models/User.model.js");

router.post("/hello", (req, res) => {
  return "hello"
});

module.exports = router;
