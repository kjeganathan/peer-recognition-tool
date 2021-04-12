const MongoClient = require('mongodb').MongoClient;
const SESSION_LENGTH = 1_800_000;  // = 30 minutes in ms
const URI = "mongodb+srv://devapp:wintermute3000@cluster0.val9t.mongodb.net/TestDatabase"
  + "?retryWrites=true&w=majority";

async function getUser(req, res) {
    const client = new MongoClient(URI);
    try {
      var user;
      await client.connect();
      var dbo = client.db("Test-Database");
      dbo.collection("Employees").findOne({employeeId: req.body.id}, function(err, result) {
        user = result;
        console.log(result);
      });
      console.log(user)
      return user;
    }
    finally {
      await client.close();
    }
  }




  module.exports = {getUser}