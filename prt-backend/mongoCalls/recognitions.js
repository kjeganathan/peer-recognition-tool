const MongoClient = require('mongodb').MongoClient;
const SESSION_LENGTH = 1_800_000;  // = 30 minutes in ms
const URI = "mongodb+srv://devapp:wintermute3000@cluster0.val9t.mongodb.net/TestDatabase"
  + "?retryWrites=true&w=majority";

const Recognition = require("../models/recognition.model.js");

// Watch out for the capitalization of companyID.
async function getRecognitionsFromCompany(req, res) {
  const companyID = req.user.companyId;
  const recognitions = await Recognition.find({ companyID: companyID });
  res.send(recognitions);
}

async function postRecognition(req, res){
  const newRecognition = new Recognition(req.body);
  newRecognition.save()
    .then(() => res.send("Recognition posted."))
    .catch(error => res.status(400).send("Error: " + error));
}

module.exports = { postRecognition, getRecognitionsFromCompany }