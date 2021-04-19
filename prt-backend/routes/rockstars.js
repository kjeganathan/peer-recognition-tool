const express = require("express");
const router = express.Router();
const Employee = require("../models/employee.model.js");

const Rockstars = 
[
    {
        name: "Jamel Spencer",
        position: "Software Architect",
        numRecognitions: "5",
        coreValues: ["Integrity", "Passion", "Teamwork"]
    }
];

router.get("/", async (req, res) => {
    if (!req.isAuthenticated()) {
        res.status(401).json({ message: "You are not logged in" });
        return;
    }
    else{
       /* var mostRecognized;
        var numRecogs;
        console.log(req.user)
        const employees = await Employee.findOne({ companyID: req.user.companyId });
        employees.forEach(employee => {
            console.log(employee.recognitionsReceived);
        });
        this.Rockstars = [
            {
              name: "Jamel Spencer",
              position: "Software Architect",
              numRecognitions: "5",
              coreValues: ["Integrity", "Passion", "Teamwork"]
            }
        ];*/
        res.status(200).json(
            {
                rockstars: [{
                    name: "Jamel Spencer",
                    position: "Software Architect",
                    numRecognitions: "5",
                    coreValues: ["Integrity", "Passion", "Teamwork"]
                }, {
                    name: "Kathryn Merritt",
                    position: "Engineering Manager",
                    numRecognitions: "5",
                    coreValues: ["Leader", "Innovative", "Helpful"]
                }]
            }
        );
    }
});

module.exports = router;