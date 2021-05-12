const express = require("express");
const router = express.Router();
const Employee = require("../models/employee.model.js");
const Company = require("../models/company.model.js");

router.get("/", async (req, res) => {
    var debug = "GET employees/";
    // console.log("GET employees/");

    const employeeID = req.query.employeeID;
    // debug += "\nemployeeID: " + employeeID;
    // console.log("employeeID: " + employeeID);

    if (employeeID != null) {
        const employee = await Employee.findById(employeeID);
        // debug += "\nemployee: " + JSON.stringify(employee, null, 4).substring(0, 256) + "\n";
        // console.log("employee: " + JSON.stringify(employee, null, 4).substring(0, 256));

        res.json(employee);
        // console.log(debug);
        return;
    }

    const companyID = req.query.companyID;
    debug += "\ncompanyID: " + companyID;
    // console.log("companyID: " + companyID);

    const company = await Company.findById(companyID);
    debug += "\ncompany: " + JSON.stringify(company, null, 4).substring(0, 256);
    
    const employees = await Employee.find({ companyId: company._id });
    debug += "\nemployees: " + JSON.stringify(employees, null, 4).substring(0, 256) + "\n";
    // console.log("employees: " + JSON.stringify(employees, null, 4).substring(0, 256));

    res.json(employees);
    console.log(debug);
});

module.exports = router;