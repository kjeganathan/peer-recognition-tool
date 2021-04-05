const recogs = require('./mongoCalls/recognitions.js')
const user = require('./mongoCalls/user.js')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const session = require("express-session")
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const { response } = require('express')
const MongoClient = require('mongodb').MongoClient;
const SESSION_LENGTH = 1_800_000;  // = 30 minutes in ms
const URI = "mongodb+srv://devapp:wintermute3000@cluster0.val9t.mongodb.net/TestDatabase"
  + "?retryWrites=true&w=majority";
app.use(session({ secret: 'compsci320', maxAge: SESSION_LENGTH }));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(bodyParser.json());
app.options('*', cors()) 


//recognitiom and employee structure
var recognitions = {
  recognizer: null,
  recognizee: null,
  core: null,
  message: null,
}

var employee = {
    _id: null,
    firstName: null,
    lastName: null,
    companyId: null,
    password: null,
    positionTitle: null,
    companyName: null,
    isManager: null,
    employeeId: null,
    managerId: null,
    email: null,
    startDate: null,
    recognitionsGiven: null,
    recognitionsReceived: null
}

// Calling passport.use tells Passport to run this code to match a username and
// password to a user.
//    See http://www.passportjs.org/docs/configure/
passport.use(new LocalStrategy(
  {
    usernameField: 'username',
    passwordField: 'password'
  },
  async function(username, password, done) {
      const client = new MongoClient(URI);
      try {
          await client.connect();
          var dbo = client.db("Test-Database");
          dbo.collection("Employees").findOne({email: username}, function(err, result) {
          if( result ==null){
            return done(null, false, {
              message: 'WIP, use username = "username" and password = "password"'
            });
          }
                // TODO: When connected with database, actually look up a user.
          if (username === result.email && password === result.password) {
          // We would want to return a user from the database here
            return done(null, result);
          }

          // Returning done with false indicates that the credentials were incorrect
          return done(null, false, {
            message: 'WIP, use username = "username" and password = "password"'
          });
          });
        }
      finally {
        await client.close();
      }
    }
));


passport.serializeUser(function(user, done) {
  // TODO: Use database and return user ID
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

/**
 * @openapi
 * /login:
 *   post:
 *     description: Log in with a given username and password
 *     parameters:
 *       -
 *          name: credentials
 *          in: body
 *          description: Username and password
 *          required: true
 *          schema:
 *              type: object
 *              required:
 *                - username
 *                - password
 *              properties:
 *                username:
 *                  type: string
 *                password:
 *                  type: string
 */
app.post('/login', passport.authenticate('local'), (req, res) => {
  res.send({ message: 'Logged in successfully', user: req.user });
});

/**
 * @openapi
 * /recogs:
 *   post:
 *     description: get Recogs
 *     parameters:
 *       -
 *          name: credentials
 *          in: body
 *          description: Username and password
 *          required: true
 *          schema:
 *              type: object
 *              required:
 *                - username
 *                - password
 *              properties:
 *                username:
 *                  type: string
 *                password:
 *                  type: string
 */
app.get("/recogs", (req, res) => {
  if (!req.isAuthenticated()) {
    res.status(401).send({ message: 'You are not logged in' });
  }
  else {
    recogs.getRecogs(req, res);
  }
});

app.options('*', cors())
app.post("/lookupUser", (req, res) => {
  if (!req.isAuthenticated()){
    res.status(401).send({ message: 'You are not logged in' });    
  }
  else{
    user.getUser(req, res);
  }
});

app.options('*', cors())
app.get("/getCurrentUser", (req, res) => {
  if (!req.isAuthenticated()){
    res.status(401).send({ message: 'You are not logged in' });    
  }
  else{
    res.send(req.user);
  }
});

app.options('*', cors())
app.post("/postRec", (req, res) => {
  if (!req.isAuthenticated()){
    res.status(401).send({ message: 'You are not logged in' });    
  }
  else{
    recogs.postRec(req, res);
  }
});

app.use('/awards', require('./awards'))

// The call to app.listen(PORT, ...) is in server.js
module.exports = app