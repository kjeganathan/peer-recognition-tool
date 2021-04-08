const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
    if (!req.isAuthenticated()) {
        res.status(401).json({ message: "You are not logged in" });
        return;
    }

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
});

module.exports = router;