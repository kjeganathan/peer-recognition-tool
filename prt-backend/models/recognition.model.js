const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const config = require("../config.json");

const collectionName = config.RECOGNITION_COLLECTION_NAME;

const commentSchema = new Schema(
    {
        // commenterID: Number,
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
        // reactionGiverIDs: [Number]
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
        // companyID: Number,
        company: {
            type: Schema.Types.ObjectId,
            ref: "Company"
        },
        // giverID: Number,
        giver: {
            type: Schema.Types.ObjectId,
            ref: "Employee"
        },
        // receiverID: Number,
        values: [String],
        message: String,
        creationDate: Date,
        comments: [commentSchema],
        reactions: [reactionSchema]
    }, {
        collection: collectionName
    }
);

const Recognition = mongoose.model("Recognition", recognitionSchema, collectionName);

module.exports = Recognition;
