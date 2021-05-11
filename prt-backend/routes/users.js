const express = require("express");
const router = express.Router();
const Employee = require("../models/employee.model.js");

router.get("/", async (req, res) => {
    console.log("GET users/");
    console.log("req.query.user: " + req.query.user);

    if (req.query.user != null) {
        const user = await Employee.findById(req.query.user);
        console.log("user: " + JSON.stringify(user, null, 4));

        res.json(user);
        console.log("");
        return;
    }
    const company = req.query.company;
    console.log("company: " + company);

    const users = await Employee.find({ company: company });
    console.log("users: " + JSON.stringify(users[0], null, 4).substring(0, 256));

    res.json(users);
    console.log("");
});

module.exports = router;