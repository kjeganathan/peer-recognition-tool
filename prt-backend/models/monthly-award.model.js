const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const monthlyAwardSchema = new Schema(
    {
        awardName:          String,
        companyId:          Number,
        employeeId:         Number,
        dateGiven:          Date,
        numRecognitions:    Number,
        value:              String
    },{
        collection: "MonthlyAwards"
    }
)

const MonthlyAward = mongoose.model("MonthlyAward", monthlyAwardSchema, "MonthlyAwards");

module.exports = MonthlyAward;