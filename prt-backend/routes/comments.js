const router = require('express').Router()
const Comment = require("../models/comment.model");
// const Recognition = require('../models/recognition.model');

router.get("/", async (req, res) => {
    console.log("GET comments/");

    const recognitionID = req.query.recognitionID;
    console.log("recognition: " + recognitionID);

    const comments = await Comment.find({recognitionID: recognitionID});
    console.log("comments: " + JSON.stringify(comments, null, 4).substring(0, 256));

    res.json(comments);
    console.log("");
});

router.post("/", async (req, res) => {
    console.log("POST comments/");

    const recognitionID = req.body.recognitionID;
    console.log("recognition: " + recognitionID);

    const commenterID = req.body.commenterID;
    console.log("giver: " + commenterID);

    const message = req.body.message;
    console.log("comment: " + message);

    const creationDate = new Date(req.body.creationDate);
    console.log("creationDate: " + JSON.stringify(creationDate).substring(0, 256));

    const comment = new Comment(
        {
            recognitionID: recognitionID,
            commenterID: commenterID,
            message: message,
            creationDate: creationDate
        }
    );

    await comment.save();
    res.sendStatus(200);
    console.log("");
});

module.exports = router;
