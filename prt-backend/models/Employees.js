const mongoose = require("mongoose"); //Presentation note: the module we're using to
                                      //interface with MongoDB database

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
        collection: "Employees" //The collection that a Employee document belongs to
    }
)

module.exports = Employee = mongoose.model("employee", EmployeeSchema, "Employees");