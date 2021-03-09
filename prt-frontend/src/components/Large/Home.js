
import React, { Component } from "react";
import { BrowserRouter as Router} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import UserPostLayOut from "../Medium/UserPostLayOut";

export default class Home extends Component {
  render(){
    return (
    <Router>
        <div>
          <UserPostLayOut/>
        </div>
    </Router>
    );
  }
}
