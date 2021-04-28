const Employee = require("../models/employee.model.js");

async function getUser(req, res){
  const employeeID = req.body.id; // Watch out for capitalization of "ID"
  console.log("Finding user with ID " + employeeID + ".");
  const user = await Employee.findOne({employeeId: employeeID});
  console.log(user);
  return user;
}

module.exports = { getUser }
