const router = require('express').Router()
const Comment = require("../models/comment.model");
// const Recognition = require('../models/recognition.model');

router.get("/", async (req, res) => {
    console.log("GET comments/");

    const recognition = req.query.recognition;
    console.log("recognition: " + recognition);

    const comments = await Comment.find({recognition: recognition});
    console.log("comments: " + JSON.stringify(comments, null, 4).substring(0, 256));

    res.json(comments);
    console.log("");
});

router.post("/", async (req, res) => {
    console.log("POST comments/");

    const recognition = req.body.recognition;
    console.log("recognition: " + recognition);

    const commenter = req.body.commenter;
    console.log("giver: " + commenter);

    const message = req.body.message;
    console.log("comment: " + message);

    const creationDate = new Date(req.body.creationDate);
    console.log("creationDate: " + JSON.stringify(creationDate).substring(0, 256));

    const comment = new Comment(
        {
            recognition: recognition,
            commenter: commenter,
            message: message,
            creationDate: creationDate
        }
    );

    await comment.save();
    res.sendStatus(200);
    console.log("");
});

module.exports = router;
