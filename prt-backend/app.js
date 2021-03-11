
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

//get request to '/employee' using res.send inside
// var recognitions = {
//   recognizer: null,
//   recognizee: null,
//   core: null,
//   message: null,
// }

app.use(express.static(__dirname + "/../prt-frontend/public/"));

app.get("/", function(request, response){
  console.log("Index requested.");
})

app.use(cors());
app.use(bodyParser.json());
app.post("/home", (req, res) => {
    console.log(req.body)
    res.send(req.body);
});

// The call to app.listen(PORT, ...) is in server.js
module.exports = app
