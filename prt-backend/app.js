
const express = require('express');

const mongoose = require('mongoose');
const config = require("../config.json");

const username = config.username;
const password = config.password;
const database = config.database;

const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const URI = "mongodb+srv://"
  + username + ":" + password
  + "@cluster0.val9t.mongodb.net/"
  + database
  + "?retryWrites=true&w=majority";

mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors());
app.use(bodyParser.json());
app.post("/home", (req, res) => {
    console.log(req.body)
    res.send(req.body);
});

// The call to app.listen(PORT, ...) is in server.js
module.exports = app
