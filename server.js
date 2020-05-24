const dotenv = require('dotenv');
dotenv.config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", 'http://localhost:3000'); // local
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
//configure cors
var allowedOrigins = [
  'http://localhost:3000',
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

app.listen(PORT, () => console.log(`Server up and running on port ${PORT}!`));
