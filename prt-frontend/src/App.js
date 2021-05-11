import './App.css';
import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/Large/Login";
import Header from "./components/Medium/Header"
import Home from "./components/Large/Home"
// import Footer from "./components/Medium/Footer"

import HomeManager from "./components/Large/HomeManager"
import Profile from "./components/Medium/ProfilePage"

class App extends Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     username: '',
        // }
    }

    render() {
        return (

            <Router> {/* Imported Router component */}
                <div>
                    <Header />
                    <Route exact path="/" exact component={Login} />
                    <Route exact path="/home" component={Home} />

                    <Route exact path="/profile" component={Profile} />
                    <Route exact path="/homemanager" component={HomeManager} />
                </div>
            </Router>
        );
    }
}


export default App;
