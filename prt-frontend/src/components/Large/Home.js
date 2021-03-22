
import React, { Component } from "react";
import { Redirect, BrowserRouter as Router, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import UserPostLayOut from "../Medium/UserPostLayOut";
import Profile from"../Medium/ProfilePage"
export default class Home extends Component {
  constructor(props){
    super(props);
    console.log(this.props);
  } 
  render(){
    return (

    <Router>
        <div>
          <Route render={() => <UserPostLayOut user={this.props.location.state} />}/>
          <Route exact path="/profile"  render={() => <Profile user={this.props.location.state} />}/>
        </div>
    </Router>
    );
  }
}
