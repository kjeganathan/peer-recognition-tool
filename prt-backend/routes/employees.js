const express = require("express");
const router = express.Router();
const Employee = require("../models/employee.model.js");
const Company = require("../models/company.model.js");

router.get("/", async (req, res) => {
    var debug = "GET employees/";

    const employeeID = req.query.employeeID;
    debug += "\nemployeeID: " + employeeID;

    if (employeeID != null) {
        const employee = await Employee.findById(employeeID);
        // debug += "\nemployee: " + JSON.stringify(employee, null, 4).substring(0, 256) + "\n";

        res.json(employee);
        // console.log(debug);
        return;
    }

    const companyID = req.query.companyID;
    debug += "\ncompanyID: " + companyID;

    const company = await Company.findById(companyID);
    debug += "\ncompany: " + JSON.stringify(company, null, 4).substring(0, 256);

    const employees = await Employee.find({ companyId: company.companyId });
    debug += "\nemployees: " + JSON.stringify(employees, null, 4).substring(0, 256) + "\n";

    res.json(employees);
    console.log(debug);
});

module.exports = router;