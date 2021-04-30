const Employee = require("../models/employee.model.js");

async function peopleInCompany(req, res){
  const companyID = req.user.companyId;
  console.log(req.user) // Watch out for capitalization of "ID"
  console.log("Finding those in Company:" + companyID + ".");
  const employeesOfCompany = await Employee.find({companyId: companyID});
  peopleToRecog = []
  employeesOfCompany.forEach(employee => {
      peopleToRecog.push({
            label: employee.firstName +" "+employee.lastName,
            value: {
                name: employee.firstName +" "+employee.lastName,
                id: employee.employeeId
            }
      })
      
  });
  console.log(peopleToRecog)
  res.send(peopleToRecog);
}

// async function employeesOfManager(req, res){
//   const companyID = req.user.companyId;
//   console.log(req.user) // Watch out for capitalization of "ID"
//   console.log("Finding those in Company:" + companyID + ".");
//   const employeesOfCompany = await Employee.find({companyId: companyID});
//   employeeList = [];
//   employeesOfCompany.forEach(employee => {
      
//     if (employee.managerId == req.user.employeeId) {
//       employeeList.push(employee);
//     }
      
//     employeeList.push({
//             label: employee.firstName +" "+employee.lastName,
//             value: {
//                 name: employee.firstName +" "+employee.lastName,
//                 id: employee.employeeId
//             }
//       })
      
//   });
//   console.log(peopleToRecog)
//   res.send(peopleToRecog);
// }

module.exports = { peopleInCompany }