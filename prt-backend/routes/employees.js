const express = require("express");
const router = express.Router();
const Employee = require("../models/employee.model.js");

router.get("/", async (req, res) => {
    console.log("GET users/");

    const employeeID = req.query.employeeID;
    console.log("employeeID: " + employeeID);

    if (employeeID != null) {
        const employee = await Employee.findById(employeeID);
        console.log("employee: " + JSON.stringify(employee, null, 4).substring(0, 256));

        res.json(employee);
        console.log("");
        return;
    }
    const companyID = req.query.companyID;
    console.log("company: " + companyID);

    const employees = await Employee.find({ companyID: companyID });
    console.log("employees: " + JSON.stringify(employees, null, 4).substring(0, 256));

    res.json(employees);
    console.log("");
});

module.exports = router;