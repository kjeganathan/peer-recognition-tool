import './App.css';
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/Large/Login";
import Header from "./components/Medium/Header"


class App extends Component {
  render(){
    return (
        <div>
          <Header/>
          <Login/>
        </div>
    );
  }
}


export default App;
