
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const PORT = 3001

//get request to '/employee' using res.send inside
var recognitions = {
    recognizer: null,
    recognizee: null,
    core: null,
    message: null,
}


app.use(cors());
app.use(bodyParser.json());
app.post("/home", (req, res) => {
    console.log(req.body)
    res.send(req.body);
});


app.listen(PORT, () => console.log("Backend server live on " + PORT));


console.log(app.get('http://localhost:3001/?'))


module.exports = app
