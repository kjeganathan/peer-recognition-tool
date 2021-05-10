const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const config = require("../config.json");

const collectionName = config.RECOGNITION_COLLECTION_NAME;

const commentSchema = new Schema(
    {
        commenter: {
            type: Schema.Types.ObjectId,
            ref: "Employee"
        },

        message: String,
        creationDate: Date,
        likeGiverIDs: [
            {
                type: Schema.Types.ObjectId,
                ref: "Employee"
            }
        ]
    }
);

const reactionSchema = new Schema(
    {
        reactionID: Number,
        reactionGivers: [
            {
                type: Schema.Types.ObjectId,
                ref: "Employee"
            }
        ]
    }
);

const recognitionSchema = new Schema(
    {
        company: {
            type: Schema.Types.ObjectId,
            ref: "Company"
        },

        giver: {
            type: Schema.Types.ObjectId,
            ref: "Employee"
        },

        receiver: {
            type: Schema.Types.ObjectId,
            ref: "Employee"
        },

        coreValues: [String],
        message: String,
        creationDate: Date,
        reactions: [reactionSchema],
        comments: [commentSchema]
    }, {
        collection: collectionName
    }
);

const Recognition = mongoose.model("Recognition", recognitionSchema, collectionName);

module.exports = Recognition;
