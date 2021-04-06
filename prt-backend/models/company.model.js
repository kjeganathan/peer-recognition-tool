const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const companySchema = new Schema(
    {
        companyId:      Number,
        companyName:    String,
        values:         [String]
    },{
        collection: "Companies"
    }
);

const Company = mongoose.model("Company", companySchema, "Companies");

module.exports = Company;