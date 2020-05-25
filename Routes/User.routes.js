const dotenv = require('dotenv');
dotenv.config();
const express = require("express");
const router = express.Router();

// Load User model
const User = require("../Models/User.model.js");


router.get("/", (req, res) => {
  console.log("req to /")
  User.find({}).then(users => {
    if(users){
      console.log(users)
      return res.status(200).json({message: "Got Users"})
    } else {
      console.log("error retreiving users")
      return res.status(500).json({message: "Could not get users."})
    }
  })
});

module.exports = router;
