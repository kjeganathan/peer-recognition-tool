const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const monthlyAwardSchema = new Schema(
    {
        awardName:          String,
        companyID:          Number,
        employeeID:         Number,
        employeeName:       String,
        dateGiven:          Date,
        numRecognitions:    Number,
        value:              String
    },{
        collection: "MonthlyAwards"
    }
)

const MonthlyAward = mongoose.model("MonthlyAward", monthlyAwardSchema, "MonthlyAwards");

module.exports = MonthlyAward;