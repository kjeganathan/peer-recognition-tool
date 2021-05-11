const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const companySchema = new Schema(
    {
        companyId:      Number,
        companyName:    String,
        values:         [String]
    },{
        collection: "companies"
    }
);

const Company = mongoose.model("company", companySchema, "companies");

module.exports = Company;