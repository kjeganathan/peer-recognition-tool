const express = require('express');

const mongoose = require('mongoose');
const config = require("./config.json");

const { Schema } = mongoose;

const employeeSchema = new Schema({
  firstName:            String,
  lastName:             String,
  companyId:            Number,
  password:             String,
  positionTitle:        String,
  isManager:            Boolean,
  employeeId:           Number,
  managerId:            Number,
  email:                String,
  startDate:            String,
  recognitionsGiven:    [mongoose.ObjectId],
  recognitionsReceived: [mongoose.ObjectId]
});

const Employee = mongoose.model("Employee", employeeSchema);

const databaseUsername = config.username;
const databasePassword = config.password;
const databaseName = config.database;

const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const URI = "mongodb+srv://"
  + databaseUsername + ":" + databasePassword
  + "@cluster0.val9t.mongodb.net/"
  + databaseName
  + "?retryWrites=true&w=majority";

mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors());
app.use(bodyParser.json());

app.post("/home", (request, response) => {
    console.log("Request: \n" + request.body);
    console.log("Response: \n" + response.body);
    // res.send(req.body);
    if(!request.body.username || !request.body.password){
      response.sendStatus(400); //Bad Request
    }else{
      const query = Employee.findOne({"email": databaseUsername, "password": databasePassword});
      console.log(query);
    }
});

// The call to app.listen(PORT, ...) is in server.js
module.exports = app
