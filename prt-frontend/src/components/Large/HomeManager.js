
import React, { Component } from "react";
import { Redirect, BrowserRouter as Router, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import UserPostLayOut from "../Medium/UserPostLayOut";
import Profile from"../Medium/ProfilePage";
import Rockstar from"../Medium/Rockstar";
import CoreValues from"../Medium/CoreValues";
import exportFromJSON from 'export-from-json';
import axios from 'axios';

export default class HomeManager extends Component {
  constructor(props){
    super(props);
    console.log(this.props);
    this.state = {
      listofemployees: [],
      listOfEmployeeRecogs: []
    }
    axios.get("http://localhost:3001/getEmployees", { withCredentials: true })
         .then(res => this.setState({listofemployees: res.data}));
  }
  
  ExportToExcel = () => {  
    this.createExportData().then(res => {
      var data=this.state.listOfEmployeeRecogs;
      console.log(data);
      if (data.length == 0) {
        alert("No recognitions from your employees");
      } else {
        const fileName = 'download';
        const exportType = 'csv';
        exportFromJSON({ data, fileName, exportType });
      }
    }
    );  
  } 

  createData(listofallrecogs){
    var er = [];
    var count = 0;
    console.log(this.state.listofemployees.length);
    console.log(listofallrecogs.length);
    for (var j = 0; j<this.state.listofemployees.length; j++){
      var fullName = this.state.listofemployees[j].firstName + " " + this.state.listofemployees[j].lastName;
      for (var i = 0; i<listofallrecogs.length; i++) {
          if(listofallrecogs[i].receiverName == fullName){
            count+=1;
            er.push(listofallrecogs[i]);
          }
      }
    }
    console.log(count);
    console.log(er);
    this.setState({listOfEmployeeRecogs: er});
    return;
  }

  createExportData(){
    console.log('here');
    var listofemployees =[];
    var listofallrecogs =[];
    var listOfEmployeeRecogs = [];

    console.log(this.state.listofemployees);

    return axios.get("http://localhost:3001/recogs", { withCredentials: true })
         .then(res => this.createData(res.data));
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
