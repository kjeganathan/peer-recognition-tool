const Recognition = require("../models/recognition.model.js");

// Watch out for the capitalization of companyID.
async function getRecognitionsFromCompany(req, res) {
  const companyID = req.user.companyId;
  const recognitions = await Recognition.find({ companyID: companyID });
  res.send(recognitions);
}

async function postRecognition(req, res){
  const receiverName = req.body.receiverName;
  // console.log(receiverName);

  const receiverNameTokens = receiverName.split(" ");
  // console.log(receiverNameTokens);

  const firstName = receiverNameTokens[0];
  // console.log(firstName);

  const lastName = receiverNameTokens[1];
  // console.log(lastName);

  

  const newRecognition = new Recognition(req.body);
  
  newRecognition.save()
    .then(() => res.send("Recognition posted."))
    .catch(error => res.status(400).send("Error: " + error));
}

module.exports = { postRecognition, getRecognitionsFromCompany }