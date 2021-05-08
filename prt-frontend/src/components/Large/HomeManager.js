
import React, { Component } from "react";
import { Redirect, BrowserRouter as Router, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import UserPostLayOut from "../Medium/UserPostLayOut";
import Profile from"../Medium/ProfilePage"
import Rockstar from"../Medium/Rockstar"
import CoreValues from"../Medium/CoreValues"

export default class HomeManager extends Component {
  constructor(props){
    super(props);
    console.log(this.props);
  }
  
  ExportToExcel = () => {  
    // exportFromJSON({ data, fileName, exportType })  
  }  

  render(){
    return (
      <Router>
          <div>
          <Route render={() => <Profile user={this.props.location.state}/>} />
          <div class = "left">
              <Route render={() => <Rockstar user={this.props.location.state}/>} />
              <Route render={() => <CoreValues user={this.props.location.state}/>} />
          </div>
          <button type="button" onClick={this.ExportToExcel}>Export Employee Data</button>  
          <Route render={() => <UserPostLayOut user={this.props.location.state} />}/>
          </div>
      </Router>
    );
  }
}
