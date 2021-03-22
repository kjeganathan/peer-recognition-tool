const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema(
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
        recognitionsGiven:      [mongoose.ObjectId],
        recognitionsReceived:   [mongoose.ObjectId]
    }, {
        collection: "Employees"
    }
)

module.exports = Employee = mongoose.model("employee", EmployeeSchema, "Employees");