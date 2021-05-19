# peer-recognition-tool

Before starting the program please create a json file “config.json” in the folder “prt-backend” and put the following code into the file:

```
{              
"DATABASE_URI":"mongodb+srv://devapp:wintermute3000@cluster0.val9t.mongodb.net/Test-Database?retryWrites=true&w=majority",
"TEST_FILESYSTEM_URI": "../prt-test-filesystem",
"SESSION_LENGTH": 1800000
}
```

Note: For safety reasons `config.json` is not on Github, because the file contains the password to the database.

The project contains two main folders (prt-frontend) for frontend, (prt-backend) for backend. To start the program, please cd into both of these folders and command `npm start`

Important commands for both Backend and Frontend:
1. Set up the environment with `npm install`
2. Run tests with `npm test`
3. Start the server for development with `npm start` (same as `nodemon server.js`)
