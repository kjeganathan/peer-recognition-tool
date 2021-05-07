const app = require('./app')
const path = require("path")
require('./docs')

const PORT = process.env.PORT || 8000

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});


// Run the server in a separate file so Jest doesn't get stuck when we run
// tests
app.listen(PORT, function() {
  console.log("Server is running on Port: " + PORT)
})
