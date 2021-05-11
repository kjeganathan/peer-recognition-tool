const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
    }, {
        collection: "recognitions"
    }
);

const Recognition = mongoose.model("recognition", recognitionSchema, "recognitions");

module.exports = Recognition;
