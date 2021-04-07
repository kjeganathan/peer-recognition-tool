const Recognition = require("../models/recognition.model.js");
const Employee = require("../models/employee.model.js");

// Watch out for the capitalization of companyID.
async function getRecognitionsFromCompany(req, res) {
  const companyID = req.user.companyId;
  const recognitions = await Recognition.find({ companyID: companyID });
  res.send(recognitions);
}

async function postRecognition(req, res) {
  // const receiverName = req.body.receiverName;
  // // console.log(receiverName);

  // const receiverNameTokens = receiverName.split(" ");
  // // console.log(receiverNameTokens);

  // const firstName = receiverNameTokens[0];
  // // console.log(firstName);

  // const lastName = receiverNameTokens[1];
  // // console.log(lastName);
  //   db.Recognitions.find().forEach(function (document) {
  //     db.Recognitions.update(
  //         { _id: document._id },
  //         {
  //             $set:
  //             {
  //                 receiverProfilePicURL: getProfilePicURL(
  //                     document.receiverName,
  //                     document.companyID
  //                 )
  //             }
  //         }
  //     );
  // });


  const newRecognition = new Recognition(req.body);
  // console.log("newRecognition: ");
  // console.log(newRecognition);

  setReceiverValues(newRecognition); //Won't be necessary after better input validation

  newRecognition.save()
    .then(() => res.send("Recognition posted."))
    .catch(error => res.status(400).send("Error: " + error));
}


// Retooled from prt-database-scripts/addAssociatedProfilePicURLs.js
// function setReceiverValues(fullName, companyID) {
  // Won't be necessary after better input validation
function setReceiverValues(newRecognition) {
  // console.log("Executing setReceiverValues() on: ");
  // console.log(newRecognition);

  const fullName = newRecognition.receiverName;
  // console.log("fullName: " + fullName);

  const companyID = newRecognition.companyID;
  // console.log("companyID: " + companyID);

  const nameTokens = fullName.split(" ");
  // console.log("nameTokens: " + nameTokens);

  if (nameTokens.length != 2) {
    // return {
    //   receiverID: -1,
    //   receiverProfile: "test-profile-pic-10.jpg"
    // }
    // newRecognition.receiverID = -1;
    // newRecognition.receiverProfile = "test-profile-pic-10.jpg";
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
      }
    })
    .catch(error => console.log(error));
  // const employee = db.Employees.findOne(query)

  // if (employee == null) {
  //   return "test-profile-pic-10.jpg";
  // }

  // return employee.profilePicURL;
}

function setPlaceholders(newRecognition) {
  console.log("Executing setPlaceholders() on: ");
  console.log(newRecognition);
  newRecognition.receiverID = -1;
  newRecognition.receiverProfile = "test-profile-pic-10.jpg";
}

module.exports = { postRecognition, getRecognitionsFromCompany }