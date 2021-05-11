const router = require('express').Router()
const Reaction = require('../models/reaction.model');

router.get("/", async (req, res) => {
    console.log("GET reactions/");

    const recognition = req.query.recognition;
    console.log("recognition: " + recognition);

    const emoji = req.query.emoji;
    console.log("emoji: " + emoji);

    const reactions = await Reaction.find({ recognition: recognition, emoji: emoji });
    console.log("reactions: " + JSON.stringify(reactions, null, 4).substring(0, 256));

    res.json(reactions);
    console.log("");
});

router.post("/", async (req, res) => {
    console.log("POST reactions/");

    const recognition = req.body.recognition;
    console.log("recognition: " + recognition);

    const giver = req.body.giver;
    console.log("giver: " + giver);

    const emoji = req.body.emoji;
    console.log("emoji: " + emoji);

    var reaction = await Reaction.findOneAndDelete(
        {
            recognition: recognition,
            giver: giver,
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
            recognition: recognition,
            giver: giver,
            emoji: emoji
        }
    );

    await reaction.save();
    res.sendStatus(200);
    console.log("");
});

module.exports = router;
