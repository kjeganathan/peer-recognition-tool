const router = require('express').Router()
const Reaction = require('../models/reaction.model');

router.get("/", async (req, res) => {
    console.log("GET reactions/");

    const recognitionID = req.query.recognitionID;
    console.log("recognition: " + recognitionID);

    const emoji = req.query.emoji;
    console.log("emoji: " + emoji);

    const reactions = await Reaction.find({ recognitionID: recognitionID, emoji: emoji });
    console.log("reactions: " + JSON.stringify(reactions, null, 4).substring(0, 256));

    res.json(reactions);
    console.log("");
});

router.post("/", async (req, res) => {
    console.log("POST reactions/");

    const recognitionID = req.body.recognitionID;
    console.log("recognition: " + recognitionID);

    const giverID = req.body.giverID;
    console.log("giver: " + giverID);

    const emoji = req.body.emoji;
    console.log("emoji: " + emoji);

    var reaction = await Reaction.findOneAndDelete(
        {
            recognitionID: recognitionID,
            giverID: giverID,
            emoji: emoji
        }
    );

    console.log("reaction: " + JSON.stringify(reaction, null, 4).substring(0, 256));

    if (reaction != null) {
        res.sendStatus(200);
        console.log("");
        return;
    }

    reaction = new Reaction(
        {
            recognitionID: recognitionID,
            giverID: giverID,
            emoji: emoji
        }
    );

    await reaction.save();
    res.sendStatus(200);
    console.log("");
});

module.exports = router;
