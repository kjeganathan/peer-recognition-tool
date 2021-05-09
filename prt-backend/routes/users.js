const express = require("express");
const router = express.Router();
const Employee = require("../models/employee.model.js");

router.get("/", async(req, res) => {
    console.log("GET users/");
    // console.log("req.query: " + JSON.stringify(req.query, null, 4));

    const companyID = req.query.companyID;
    console.log("companyID: " + companyID);

    // const employeeID = req.body.employeeId;
    // console.log("employeeID: " + employeeID);

    const users = await Employee.find({companyId: companyID});
    console.log("users: " + JSON.stringify(users, null, 4));

    res.json(users);
});

module.exports = router;