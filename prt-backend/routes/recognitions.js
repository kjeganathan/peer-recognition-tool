const express = require("express");
const router = express.Router();
const Recognition = require("../models/recognition.model.js");

router.get("/", async(req, res) => {
    console.log("GET recognitions/");

    // const companyID = req.query.companyID;
    // console.log("companyID: " + companyID);

    const company = req.query.company;
    console.log("company: " + company);

    // const recognitions = await Recognition.find({companyID: companyID});
    const recognitions = await Recognition.find({company: company});
    console.log("recognitions: " + JSON.stringify(recognitions, null, 4).substring(0, 1000));

    res.json(recognitions);
});

module.exports = router;