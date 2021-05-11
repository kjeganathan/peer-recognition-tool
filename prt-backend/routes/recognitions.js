const express = require("express");
const router = express.Router();
const Recognition = require("../models/recognition.model.js");

router.get("/", async (req, res) => {
    console.log("GET recognitions/");

    // const companyID = req.query.companyID;
    // console.log("companyID: " + companyID);

    const company = req.query.company;
    console.log("company: " + company);

    // const recognitions = await Recognition.find({companyID: companyID});
    const recognitions = await Recognition.find({ company: company })
        .populate("giver")
        .populate("receiver")
        .populate(
            {
                path: "reactions",
                populate: {
                    path: "reactionGivers"
                }
            }
        )
        .populate(
            {
                path: "comments",
                populate: {
                    path: "commenter"
                }
            }
        )
        .populate(
            {
                path: "comments",
                populate: {
                    path: "likeGivers"
                }
            }
        );

    // console.log("recognitions: " + JSON.stringify(recognitions, null, 4).substring(0, 4000));
    console.log("recognitions[0]: " + JSON.stringify(recognitions[0], null, 4));

    res.json(recognitions);
});

module.exports = router;