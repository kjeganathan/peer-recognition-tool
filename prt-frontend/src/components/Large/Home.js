
import React, { Component } from "react";
import { Redirect, BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import UserPostLayOut from "../Medium/UserPostLayOut";
import Profile from "../Medium/ProfilePage"
import Rockstar from "../Medium/Rockstar"
import CoreValues from "../Medium/CoreValues"

export default class Home extends Component {
    constructor(props) {
        super(props);
        // console.log(this.props);


    }

    render() {
        return (

            <Router>

                <div>

                    <Route render={() => <Profile user={this.props.location.state} />} />
                    <div class="left">
                        <Route render={() => <Rockstar user={this.props.location.state} />} />
                        <Route render={() => <CoreValues user={this.props.location.state} />} />
                    </div>
                    <Route render={() => <UserPostLayOut company={this.props.location.company._id} />} />
                </div>
            </Router>
        );
    }
}
