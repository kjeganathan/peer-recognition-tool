const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema(
    {
        commenterID: Number,
        message: String,
        creationDate: Date,
        likeGiverIDs: [Number]
    }
);

const reactionSchema = new Schema(
    {
        reactionID: Number,
        reactionGiverIDs: [Number]
    }
);

const recognitionSchema = new Schema(
    {
        companyID: Number,
        // giverName: String,
        // receiverName: String,
        giverID: Number,
        receiverID: Number,
        values: [String],
        message: String,
        creationDate: Date,
        // receiverProfilePicURL: String,
        comments: [commentSchema],
        reactions: [reactionSchema]

        // comments: [{
        //     message: String,
        //     giverName: String,
        //     creationDate: Date,
        //     employeeId: Number,
        //     likes: [Number] //Array of the employeeIds of people who liked it
        // }],

        // reactions: {  // Map of reaction types (key) to employeeIds (value)
        //     type: Map,
        //     of: [Number]
        // },
    }, {
        collection: "Recognitions"
    }
);

//mongoose.model(ModelName, schema, ModelCollection)
const Recognition = mongoose.model("Recognition", recognitionSchema, "Recognitions");

module.exports = Recognition;
