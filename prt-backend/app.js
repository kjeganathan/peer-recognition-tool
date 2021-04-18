const express = require('express');
const config = require("./config");
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const scheduler = require("node-schedule");

const recogs = require('./mongoCalls/recognitions.js');
const recogPeople = require('./mongoCalls/recogPeople.js');
const user = require('./mongoCalls/user.js');

const Employee = require('./models/employee.model.js');
const Company = require("./models/company.model.js");
const Recognition = require("./models/recognition.model.js");
const MonthlyAward = require("./models/monthly-award.model.js");

const app = express();
const { response } = require('express');
const databaseURI = config.DATABASE_URI;
const testFilesystemURI = config.TEST_FILESYSTEM_URI;
const sessionLength = config.SESSION_LENGTH;


app.use(session({ secret: 'compsci320', maxAge: sessionLength }));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(bodyParser.json());
app.use("/profile-pics", express.static(testFilesystemURI));
app.options('*', cors());

mongoose.connect(databaseURI, { useNewUrlParser: true, useUnifiedTopology: true });

// Calling passport.use tells Passport to run this code to match a username and
// password to a user.
// See http://www.passportjs.org/docs/configure/

passport.use(new LocalStrategy(
  {
    usernameField: 'username',
    passwordField: 'password'
  },
  verify
));

function verify(username, password, done) {
  Employee.findOne({ email: username }, (error, employee) => {
    return verifyHelper(error, employee, password, done);
  });
}

function verifyHelper(error, user, password, done) {
  if (error != null) {
    return done(error);
  }

  if (user == null) {
    return done(null, false, { message: "Employee not found." });
  }

  if (user.password != password) {
    return done(null, false, { message: "Incorrect password." });
  }

  return done(null, user);
}

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((ID, done) => {
  Employee.findById(ID, (error, user) => {
    done(error, user);
  });
});

// Handle POST request from login
app.post('/login', passport.authenticate('local'), (req, res) => {
  res.send({ message: 'Logged in successfully', user: req.user });
});

// Endpoint to return all recognitions
app.get("/recogs", (req, res) => {
  if (!req.isAuthenticated()) {
    res.status(401).send({ message: 'You are not logged in' });
  }
  else {
    recogs.getRecognitionsFromCompany(req, res);
  }
});

app.post("/lookupUser", (req, res) => {
  if (!req.isAuthenticated()) {
    res.status(401).send({ message: 'You are not logged in' });
  }
  else {
    user.getUser(req, res);
  }
});

app.get("/getCurrentUser", (req, res) => {
  if (!req.isAuthenticated()) {
    res.status(401).send({ message: 'You are not logged in' });
  }
  else {
    res.send(req.user);
  }
});

app.get("/getPeople", (req, res) => {
  if (!req.isAuthenticated()) {
    res.status(401).send({ message: 'You are not logged in' });
  }
  else {
    recogPeople.peopleInCompany(req, res);
  }
});

app.options('*', cors())
app.post("/postRec", (req, res) => {
  if (!req.isAuthenticated()) {
    res.status(401).send({ message: 'You are not logged in' });
  }
  else {
    recogs.postRecognition(req, res);
  }
});

app.use('/notifications', require('./routes/notifications'));
app.use('/core-values', require('./routes/core-values'));
app.use('/rockstars', require('./routes/rockstars.js'));
app.use('/values', require('./routes/coreValues'));

const testRule = new scheduler.RecurrenceRule();
testRule.second = [new scheduler.Range(0, 59)];
// // const testJobInterval = "/1 * * * * *";
// const testJob = scheduler.scheduleJob(testRule, testJobFunction);

// function testJobFunction(){
//   console.log("Tick");
// }

const rockstarRule = new scheduler.RecurrenceRule();
// rockstarRule.second = 0;
// rockstarRule.minute = 0;
rockstarRule.minute = [new scheduler.Range(0, 59)];
// rockstarRule.hour = 0;
// rockstarRule.date = 1;
rockstarRule.month = [new scheduler.Range(0, 11)];

async function getAwardWinners() {
  const companies = await Company.find({});
  // console.log(companies);
  companies.forEach(getAwardWinnersOfCompany);
}

async function getAwardWinnersOfCompany(company) {
  var awardWinners = [];
  const companyID = company.companyId;
  const coreValues = company.values;
  const recognitions = await Recognition.find({ companyID: companyID });
  // const recognitionHistograms = getRecognitionHistograms(recognitions);
  // const rockstarHistogram = recognitionHistograms.rockstarHistogram;
  // const valueHistograms = recognitionHistograms.valueHistograms;
  const rockstarHistogram = new Map();
  const valueHistograms = new Map();
  var maxNumRecognitions = 0;

  recognitions.forEach(recognition => {
    const receiverID = recognition.receiverID;
    const coreValues = recognition.values;

    if (rockstarHistogram.has(receiverID)) {
      const curNumRecognitions = rockstarHistogram.get(receiverID);
      const newNumRecognitions = curNumRecognitions + 1;
      rockstarHistogram.set(receiverID, newNumRecognitions);
    } else {
      rockstarHistogram.set(receiverID, 1);
    }

    const numRecognitions = rockstarHistogram.get(receiverID);

    // if (numRecognitions == maxNumRecognitions) {
    // awardWinners.push(receiverID);
    if (numRecognitions > maxNumRecognitions) {
      // awardWinners = [];
      maxNumRecognitions = numRecognitions;
      // awardWinners.push(receiverID);
    }

    // coreValues.forEach(coreValue => {

    // });
  });

  for (const [receiverID, numRecognitions] of rockstarHistogram.entries()) {
    if (numRecognitions == maxNumRecognitions) {
      // console.log(receiverID + " has the max number of recogs: " + numRecognitions);
      const awardWinner = await Employee.findOne({
        companyId: companyID,
        employeeId: receiverID
      });

      const newRockstarAward = new MonthlyAward({
        awardName: "Rockstar of the Month",
        companyID: companyID,
        employeeID: awardWinner.companyId,

        employeeName: awardWinner.firstName +
          " " +
          awardWinner.lastName,

        dateGiven: new Date(),
        numRecognitions: numRecognitions,
        value: ""
      });

      newRockstarAward.save();
    }
  }
}


getAwardWinners();
// function getRecognitionHistograms(recognitions) {
// }

// const calculateRockstarsJob = scheduler.scheduleJob(testRule, getAwardWinners);

// The call to app.listen(PORT, ...) is in server.js
module.exports = app
