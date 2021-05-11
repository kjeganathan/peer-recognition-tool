const express = require("express");
const router = express.Router();
const Employee = require("../models/employee.model.js");

router.get("/", async (req, res) => {
    console.log("GET users/");

    const user = req.body.user;
    console.log("employee: " + user);

    if (user != null) {
        const user = await Employee.findById(user);
        console.log("user: " + JSON.stringify(user, null, 4));

        res.json(user);
        console.log("");
        return;
    }
    const company = req.query.company;
    console.log("company: " + company);

    const users = await Employee.find({ company: company });
    console.log("users[0]: " + JSON.stringify(users[0], null, 4));

    res.json(users);
    console.log("");
});

module.exports = router;