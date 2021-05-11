const express = require("express");
const router = express.Router();
const Company = require("../models/company.model.js");

router.get("/", async(req, res) => {
    console.log("GET company/");

    const companyID = req.query.companyID;
    console.log("companyID: " + companyID);

    const company = await Company.findOne({companyId: companyID});
    console.log("company: " + JSON.stringify(company, null, 4).substring(0, 1000));
    console.log("");

    res.json(company);
});

module.exports = router;