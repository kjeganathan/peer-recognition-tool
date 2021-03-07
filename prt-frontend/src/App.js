import './App.css';
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/Large/Login";
import Header from "./components/Medium/Header"
import Footer from"./components/Medium/Footer"

class App extends Component {
  render(){
    return (
        <div>
          <Header/>
          <Login/>
          <Footer/>
        </div>
    );
  }
}


export default App;
