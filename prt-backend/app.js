// Source: https://medium.com/swlh/set-up-an-express-js-app-with-passport-js-and-mongodb-for-password-authentication-6ea05d95335c
// Source: https://github.com/FBosler/fb-tutorial-social-login/tree/steps/3_backend_1

const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
const config = require("./config.json");

const session = require("express-session");
const mongoose = require("mongoose");

const passport = require("./passport.js"); //Presentation note 1: all the code for
                                           //authentication has been moved to passport.js

const SESSION_LENGTH = 1_800_000;  // = 30 minutes in ms
const databaseURI = config.URI;

mongoose //Presentation note 2: we are now using Mongoose again, because we've reached the
         //point where the extra complexity is worth it
  .connect(databaseURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(console.log("Connected to MongoDB database."))
  .catch(error => console.log(error));

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(session({ secret: 'compsci320', maxAge: SESSION_LENGTH }));
app.use(passport.initialize());
app.use(passport.session());

app.post("/login", //Presentation note 3: use passport.js's authentication function when
                   //we receive a post request from the login page
  passport.authenticate("local"),
  (req, res) => { //called only on success
    console.log("Logging in.");
    res.send({ user: req.user });
  }
);

// app.get('/testlogin', (req, res) => {
//   // Check if the user is logged in by calling req.isAuthenticated().
//   if (!req.isAuthenticated()) {
//     res.status(401).send({ message: 'You are not logged in' });
//   } else {
//     res.send({ message: 'Congratulations, you are logged in', user: req.user });
//   }
// });

app.post("/home", (req, res) => {
  console.log(req.body)
  res.send(req.body);
});

// The call to app.listen(PORT, ...) is in server.js
module.exports = app
