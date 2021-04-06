const router = require("express").Router();
const Company = require("../models/company.model.js");

router.get("/", async (req, res) => {
    if (!req.isAuthenticated()) {
        res.status(401).json({ message: "You are not logged in" });
        return
    }

    const companyID = req.user.companyId;
    console.log("companyID: " + companyID + "\n");
    const company = await Company.findOne({ companyId: companyID });
    //Watch out for the differences in capitalization of companyID between server and database
    console.log(company.values);
    res.status(200).json(
        company.values
    );
});

module.exports = router;