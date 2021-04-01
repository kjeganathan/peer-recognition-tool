const MongoClient = require('mongodb').MongoClient;
const SESSION_LENGTH = 1_800_000;  // = 30 minutes in ms
const URI = "mongodb+srv://devapp:wintermute3000@cluster0.val9t.mongodb.net/TestDatabase"
  + "?retryWrites=true&w=majority";

const Employee = require("../models/employee.mode.js");

async function getRecogs(req, res) {
  const client = new MongoClient(URI);
  try {
    var allRecogs;
    await client.connect();
    var dbo = client.db("Test-Database");
    dbo.collection("Recognitions").find({ companyID: req.user.companyId }, function (err, result1) {
      allRecogs = result1;
    });

    var count = 0;
    recogsIndexed = {};
    await allRecogs.forEach(doc => indexRecogs(doc));
    function indexRecogs(doc) {
      var recoObject = {
        reco: doc
      };
      recogsIndexed[count] = recoObject;
      count++;
    }
    console.log(recogsIndexed)
    res.send(recogsIndexed);
  }
  finally {
    await client.close();
  }
}

async function postRec(req, res) {
  const client = new MongoClient(URI);
  try {
    await client.connect();
    var dbo = client.db("Test-Database");
    console.log(req.body);
    dbo.collection("Recognitions").insertOne(req.body, function (err, result) {
      if (err) throw err;
      console.log(result);
      res.send("posted");
    });
  }
  finally {

  }
}
module.exports = { getRecogs, postRec }