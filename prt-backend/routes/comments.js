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

// /**
//  * @openapi
//  * /postComment/{id}:
//  *   post:
//  *     description: Add a comment to the recognition with the given ID
//  *     parameters:
//  *       -
//  *          name: value
//  *          in: body
//  *          description: Comment to add
//  *          required: true
//  *          schema:
//  *              type: object
//  *              properties:
//  *                message:
//  *                  type: string
//  *     responses:
//  *       '201':
//  *         description: Returns the updated recognition including comments
//  */
// router.post('/:recogId', async (req, res) => {
//   if (!req.isAuthenticated()) {
//     res.status(401).json({ message: "You are not logged in" });
//     return
//   }

//   const recog = await Recognition.findOne({ _id: req.params.recogId });

//   if (!recog) {
//     res.status(404).send(`No comment with ID ${req.params.recogId}`);
//     return;
//   }

//   if (!('message' in req.body)) {
//     res.status(422).send('Use format {"message": "comment text"}');
//     return;
//   }

//   // TODO: Proper validation would probably be a good idea
//   await recog.comments.push({
//     message: req.body.message,
//     giverName: `${req.user.firstName} ${req.user.lastName}`,
//     creationDate: new Date(),
//     employeeId: req.user.employeeId,
//     likes: []
//   });

//   await recog.save();
//   res.status(201).send(recog);
// });

module.exports = router;
