const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema(
    {
        recognition: Schema.Types.ObjectId,
        commenter: Schema.Types.ObjectId,
        message: String,
        creationDate: Date
    }, {
        collection: "comments"
    }
);

const Comment = mongoose.model("comment", commentSchema, "comments");

module.exports = Comment;