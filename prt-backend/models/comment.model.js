const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema(
    {
        recognitionID: Schema.Types.ObjectId,
        commenterID: Schema.Types.ObjectId,
        message: String,
        creationDate: Date
    }, {
        collection: "comments"
    }
);

const Comment = mongoose.model("comment", commentSchema, "comments");

module.exports = Comment;