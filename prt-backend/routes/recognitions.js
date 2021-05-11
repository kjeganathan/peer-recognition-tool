const express = require("express");
const router = express.Router();
const Recognition = require("../models/recognition.model.js");

router.get("/", async (req, res) => {
    console.log("GET recognitions/");

    const company = req.query.company;
    console.log("company: " + company);

    const recognitions = await Recognition.find({ company: company });
    console.log("recognitions: " + JSON.stringify(recognitions, null, 4).substring(0, 256));

    res.json(recognitions);
    console.log("");
});

module.exports = router;