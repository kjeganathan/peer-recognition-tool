const Recognition = require("../models/recognition.model.js");
const Employee = require("../models/employee.model.js");

// Watch out for the capitalization of companyID.
async function getRecognitionsFromCompany(req, res) {
  const companyID = req.user.companyId;
  const recognitions = await Recognition.find({ companyID: companyID });
  res.send(recognitions);
}

async function postRecognition(req, res) {
  await fillReceiverValues(req.body);
  const newRecognition = new Recognition(req.body);

  newRecognition.save()
    .then(() => res.send("Recognition posted."))
    .catch(error => res.status(400).send("Error: " + error));
}

async function fillReceiverValues(newRecognition) {
  const fullName = newRecognition.receiverName;
  const companyID = newRecognition.companyID;
  nameTokens = fullName.split(" ");

  if (nameTokens.length != 2) {
    setPlaceholders(newRecognition);
    return;
  }

  const firstName = nameTokens[0];
  const lastName = nameTokens[1];

  const query = {
    companyId: companyID,
    firstName: firstName,
    lastName: lastName
  }

  const employee = await Employee.findOne(query)

  if (employee == null) {
    setPlaceholders(newRecognition);
    return;
  }
  newRecognition.receiverID = employee.employeeId; //watch out for capitalization of employeeID
  newRecognition.receiverProfilePicURL = employee.profilePicURL;
}

function setPlaceholders(newRecognition) {
  newRecognition.receiverID = -1;
  newRecognition.receiverProfilePicURL = "test-profile-pic-10.jpg";
}

module.exports = { postRecognition, getRecognitionsFromCompany }