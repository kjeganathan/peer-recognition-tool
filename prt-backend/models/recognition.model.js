const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recognitionSchema = new Schema(
    {
        companyID: Schema.Types.ObjectId,
        giverID: Schema.Types.ObjectId,
        receiverID: Schema.Types.ObjectId,
        coreValues: [String],
        message: String,
        creationDate: Date,
    }, {
        collection: "recognitions"
    }
);

const Recognition = mongoose.model("recognition", recognitionSchema, "recognitions");

module.exports = Recognition;
