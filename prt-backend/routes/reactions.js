const router = require('express').Router()
const Reaction = require('../models/reaction.model');

router.get("/", async (req, res) => {
    console.log("GET reactions/");

    const recognition = req.query.recognition;
    console.log("recognition: " + recognition);

    const emoji = req.query.emoji;
    console.log("emoji: " + emoji);

    const reactions = await Reaction.find({recognition: recognition, emoji: emoji});
    console.log("reactions: " + JSON.stringify(reactions, null, 4).substring(0, 256));

    res.json(reactions);
    console.log("");
});

// /**
//  * @openapi
//  * /postReaction/{id}:
//  *   post:
//  *     description: Add/remove a reaction to the recognition with the given ID
//  *     parameters:
//  *       -
//  *          name: value
//  *          in: body
//  *          description: Reaction
//  *          required: true
//  *          schema:
//  *              type: object
//  *              properties:
//  *                reaction:
//  *                  type: string
//  *     responses:
//  *       '201':
//  *         description: Returns the updated recognition including reactions
//  */
// router.post('/:recogId', async (req, res) => {
//   if (!req.isAuthenticated()) {
//     res.status(401).json({ message: "You are not logged in" });
//     return
//   }

//   const recog = await Recognition.findOne({ _id: req.params.recogId });

//   if (!recog) {
//     res.status(404).send(`No recognition with ID ${req.params.recogId}`);
//     return;
//   }

//   if (!('reaction' in req.body)) {
//     res.status(422).send('Use format {"reaction": "type of reaction"}');
//     return;
//   }

//   if (recog.reactions === undefined) {
//     recog.reactions = {};
//   }

//   const reactions = recog.reactions;
//   const employeeId = req.user.employeeId;

//   // Reactions are stored in a mongoose.Map, which can only be updated using
//   // get/set functions.
//   // https://mongoosejs.com/docs/schematypes.html#maps
//   if (reactions.get(req.body.reaction) === undefined) {
//     reactions.set(req.body.reaction, []);
//   }

//   const reactionType = reactions.get(req.body.reaction);

//   // Using the same endpoint for adding/removing probably isn't the most robust
//   // idea, but it gets the job done for our purposes.
//   if (reactionType.includes(employeeId)) {
//     reactionType.remove(employeeId);
//   } else {
//     reactionType.push(employeeId);
//   }

//   await recog.save();
//   res.status(201).send(recog);
// });

module.exports = router;
