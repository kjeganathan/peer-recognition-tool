const Employee = require("../models/employee.model.js");

async function peopleInCompany(req, res){
  const companyID = req.user.companyId;
  console.log(req.user) // Watch out for capitalization of "ID"
  console.log("Finding those in Company:" + companyID + ".");
  const employeesOfComapny = await Employee.find({companyId: companyID});
  peopleToRecog = []
  employeesOfComapny.forEach(employee => {
      peopleToRecog.push({
            label: employee.firstName +" "+employee.lastName,
            value: employee.firstName +" "+employee.lastName
      })
      
  });
  console.log(peopleToRecog)
  res.send(peopleToRecog);
}

module.exports = { peopleInCompany }