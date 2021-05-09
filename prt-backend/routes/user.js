const express = require("express");
const router = express.Router();
const Employee = require("../models/employee.model.js");

router.get("/", async(req, res) => {
    console.log("GET user/");

    const companyID = req.query.companyID;
    console.log("companyID: " + companyID);

    const employeeID = req.query.employeeID;
    console.log("employeeID: " + employeeID);

    const user = await Employee.findOne({companyId: companyID, employeeId: employeeID});
    console.log("user: " + JSON.stringify(user));

    res.json(user);
});

module.exports = router;