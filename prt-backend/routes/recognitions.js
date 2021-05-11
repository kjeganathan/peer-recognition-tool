const express = require("express");
const router = express.Router();
const Recognition = require("../models/recognition.model.js");

router.get("/", async (req, res) => {
    console.log("GET recognitions/");

    const company = req.query.company;
    console.log("company: " + company);

    const recognitions = await Recognition.find({ company: company })
        .populate("giver")
        .populate("receiver");

    console.log("recognitions[0]: " + JSON.stringify(recognitions[0], null, 4));
    res.json(recognitions);
});

module.exports = router;