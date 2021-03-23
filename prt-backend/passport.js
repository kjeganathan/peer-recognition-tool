const Employee = require("./models/Employees.js") //Presentation note 4: we now have a 
                                                  //schema defined for employees in
                                                  //Mongoose
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.serializeUser((user, done) => {
    // TODO: Use database and return user ID
    done(null, user);
});

passport.deserializeUser((ID, done) => {
    done(null, user);
});

passport.use(new LocalStrategy({ //Presentation note 5: here is where we set up the strategy
                                 //that passport.js uses to authenticate users
    usernameField: "username",
    passwordField: "password"
}, (username, password, done) => {
    Employee.findOne({ email: username }) //Find the one employee whose email matches the
                                          //posted username
        .then(user => {
            console.log("Finding user with email " + username + ":");
            console.log(user);
            if (user != null) {
                console.log("Comparing passwords.");
                if (password == user.password) { //Compare their passwords
                    return done(null, user);
                }
                return done(null, false, { message: "Incorrect email or password." });
            }
        })
        .catch(error => {
            return done(null, false, {message: error});
        })
}
));

module.exports = passport;