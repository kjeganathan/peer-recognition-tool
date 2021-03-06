const app = require('./app')

const PORT = 3001

// Run the server in a separate file so Jest doesn't get stuck when we run
// tests
app.listen(PORT, function() {
  console.log("Server is running on Port: " + PORT)
})
