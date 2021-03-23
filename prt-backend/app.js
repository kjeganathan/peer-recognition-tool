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

app.options('*', cors())
app.get("/recogs", (req, res) => {
  if (!req.isAuthenticated()) {
    res.status(401).send({ message: 'You are not logged in' });
  }
  else {
    getRecogs(req, res);
  }
});

async function getRecogs(req, res) {
  const client = new MongoClient(URI);
  try {
    var allRecogs;
    await client.connect();
    var dbo = client.db("Test-Database");
    dbo.collection("TestRecognitions").find({companyID: req.user.companyId}, function(err, result) {
      allRecogs = result;
    });
    
    var count = 0;
    recogsIndexed = {};
    await allRecogs.forEach(doc => indexRecogs(doc));
    function indexRecogs(doc){
        var recoObject = {
          reco: doc,
          giver: null,
          receiver: null
        };
        recogsIndexed[count] = recoObject;
        count++;
    }
    res.send(recogsIndexed);
  }
  finally {
    await client.close();
  }
}


app.options('*', cors())
app.post("/lookupUser", (req, res) => {
  if (!req.isAuthenticated()){
    res.status(401).send({ message: 'You are not logged in' });    
  }
  else{
    getUser(req, res);
  }
});

async function getUser(req, res) {
  const client = new MongoClient(URI);
  try {
    await client.connect();
    var dbo = client.db("Test-Database");
    dbo.collection("TestEmployees").findOne({companyId: req.body.id}, function(err, result) {
      console.log(result);
      res.send(result)
    });
  }
  finally {
    await client.close();
  }
}

/*
dbo.collection("TestEmployees").findOne({employeeId: doc.giverID}, function(err, result) {
  console.log(result);
  recoObject.giver = result;
}.bind(this));
dbo.collection("TestEmployees").findOne({employeeId: doc.receiverID}, function(err, result) {
  recoObject.receiver = result;
}.bind(this));
*/

// The call to app.listen(PORT, ...) is in server.js
module.exports = app
