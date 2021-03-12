
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

// Authentication Setup
const session = require("express-session")
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const SESSION_LENGTH = 1_800_000;  // = 30 minutes in ms

// Calling passport.use tells Passport to run this code to match a username and
// password to a user.
//    See http://www.passportjs.org/docs/configure/
passport.use(new LocalStrategy(
  {
    usernameField: 'username',
    passwordField: 'password'
  },
  function(username, password, done) {
    // TODO: When connected with database, actually look up a user.
    if (username === 'username' && password === 'password') {
      // We would want to return a user from the database here
      const dummyUserObject = { userId: 0 };
      return done(null, dummyUserObject);
    }

    // Returning done with false indicates that the credentials were incorrect
    return done(null, false, {
      message: 'WIP, use username = "username" and password = "password"'
    });
  }
));

passport.serializeUser(function(user, done) {
  // TODO: Use database and return user ID
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  // TODO: Use database and lookup by given user ID
  done(null, user);
});

//get request to '/employee' using res.send inside
var recognitions = {
  recognizer: null,
  recognizee: null,
  core: null,
  message: null,
}

app.use(cors());
app.use(bodyParser.json());
app.use(session({ secret: 'compsci320', maxAge: SESSION_LENGTH }));
app.use(passport.initialize());
app.use(passport.session());

app.post('/login', passport.authenticate('local'), (req, res) => {
  res.send({ message: 'Logged in successfully', user: req.user });
});

app.get('/testlogin', (req, res) => {
  // Check if the user is logged in by calling req.isAuthenticated().
  if (!req.isAuthenticated()) {
    res.status(401).send({ message: 'You are not logged in' });
  } else {
    res.send({ message: 'Congratulations, you are logged in', user: req.user });
  }
});

app.post("/home", (req, res) => {
  console.log(req.body)
  res.send(req.body);
});

// The call to app.listen(PORT, ...) is in server.js
module.exports = app
