const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const employeeSchema = new Schema(
    {
        firstName:              String,
        lastName:               String,
        companyId:              Number,
        password:               String,
        positionTitle:          String,
        companyName:            String,
        isManager:              Boolean,
        employeeId:             Number,
        managerId:              Number,
        email:                  String,
        startDate:              String,
        profilePicURL:          String
    }, {
        collection: "employees"
    }
);

const Employee = mongoose.model("employee", employeeSchema, "employees");

module.exports = Employee;