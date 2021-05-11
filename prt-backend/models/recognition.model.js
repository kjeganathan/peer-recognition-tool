const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recognitionSchema = new Schema(
    {
        company: Schema.Types.ObjectId,
        giver: Schema.Types.ObjectId,
        receiver: Schema.Types.ObjectId,
        coreValues: [String],
        message: String,
        creationDate: Date,
    }, {
        collection: "recognitions"
    }
);

const Recognition = mongoose.model("recognition", recognitionSchema, "recognitions");

module.exports = Recognition;
