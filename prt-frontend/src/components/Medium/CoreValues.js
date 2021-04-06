import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import axios from 'axios';
import "./CoreValues.css";
import ReactDOM from 'react-dom';
import profilePic from "./genericProfilePicture.jpeg";

export default class CoreValues extends Component {
  constructor(props) {
    // assign initial state
    super(props);

    this.state = {
      companyName: localStorage.getItem('company'),
      // companyName: "",
      coreValues: []
      // coreValues: []
    }
  }
  
  componentDidMount() {
    // this.setState({
    //   // companyName: localStorage.getItem("company"),
    //   coreValues: this.getCoreValues()
    // });
    this.getCoreValues();
  }

  getCoreValues() {
    axios.get("http://localhost:3001/core-values", { withCredentials: true })
      .then(res => {
        this.setState({
          coreValues: res.data
        })
      })
      .catch(err => console.log(err));
  }

  // getCoreValuesCallback(res) {
  //   // console.log(res);
  //   console.log(res.data);
  //   return res.data;
  // }

  load(values) {
    var strin = { backgroundColor: "rgb(" + [values.charCodeAt(0) * 2, values.charCodeAt(1) * 2, values.charCodeAt(2) / 122 * 255].toString() + ")" };

    return (
      <div>
        <strong><h3 class="values" style={strin}>{values} </h3> </strong>
      </div>
    );
  }

  // updateFeed() {
  //   // axios.get("http://localhost:3001/recogs", { withCredentials: true })
  //   //   .then(res => this.updateFeedHelper(res));
  // };


  render() {
    return (
      <div class="coreValues-panel">
        <h2 class="coreTitle">Company Values</h2>
        <hr class="line"></hr>
        {this.state.coreValues.map(this.load)}
      </div>
    );
  }

}
