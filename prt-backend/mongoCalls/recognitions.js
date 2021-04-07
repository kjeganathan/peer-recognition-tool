const Recognition = require("../models/recognition.model.js");
const Employee = require("../models/employee.model.js");

// Watch out for the capitalization of companyID.
async function getRecognitionsFromCompany(req, res) {
  const companyID = req.user.companyId;
  const recognitions = await Recognition.find({ companyID: companyID });
  res.send(recognitions);
}

async function postRecognition(req, res) {
  const newRecognition = req.body;
  console.log("newRecognition: ");
  console.log(newRecognition);

  await fillReceiverValues(req.body);
  console.log("\nnewRecognition after fillReceiverValues(): ");
  console.log(newRecognition);

  // const newRecognition = new Recognition(req.body);
  // fillReceiverValues(newRecognition); //Won't be necessary after better input validation

  // newRecognition.save()
  new Recognition(newRecognition).save()
    .then(() => res.send("Recognition posted."))
    .catch(error => res.status(400).send("Error: " + error));
}

async function fillReceiverValues(newRecognition) {
  // const newRecognition = {};
  // Object.assign(newRecognition, recognition);
  const fullName = newRecognition.receiverName;
  const companyID = newRecognition.companyID;
  const nameTokens = fullName.split(" ");

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

  Employee.findOne(query)
    .then(employee => {
      if (employee == null) {
        setPlaceholders(newRecognition);
      } else {
        console.log("Writing non-placeholder values");
        newRecognition.receiverID = employee.employeeId; //watch out for capitalization of employeeID
        newRecognition.receiverProfilePicURL = employee.profilePicURL;
        console.log("newRecognition: ");
        console.log(newRecognition);
      }
    })
    .catch(error => console.log(error));

  // return newRecognition;
}

function setPlaceholders(newRecognition) {
  console.log("Executing setPlaceholders() on: ");
  console.log(newRecognition);
  newRecognition.receiverID = -1;
  newRecognition.receiverProfile = "test-profile-pic-10.jpg";
}

module.exports = { postRecognition, getRecognitionsFromCompany }