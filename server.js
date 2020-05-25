const dotenv = require('dotenv');
dotenv.config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

//MongoDB setup
const mongoose = require("mongoose");
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/node-server-template'

//App variables
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:3000'

//Routes
const users = require("./Routes/User.routes.js");

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

//default response headers
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", CLIENT_URL); // local
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//configure cors
var allowedOrigins = [
  CLIENT_URL,
];
app.use(cors({
  origin: function(origin, callback){
    if(!origin) return callback(null, true);

    //check for allowed origins
    if(allowedOrigins.indexOf(origin) === -1){
      var msg = 'The CORS policy for this site does not ' + 'allow access from the origin ' + origin;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

// Connect to MongoDB
mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB successfully connected to URI: " + MONGODB_URI))
  .catch(err => console.log(err));

//Configure Routes
app.use("/users", users);

app.listen(PORT, () => console.log(`Server up and running on port ${PORT}!`));
