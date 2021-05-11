const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reactionSchema = new Schema(
    {
        recognition: Schema.Types.ObjectId,
        giver: Schema.Types.ObjectId,
        emoji: String
    }, {
        collection: "reactions"
    }
);

const Reaction = mongoose.model("reaction", reactionSchema, "reactions");

module.exports = Reaction;