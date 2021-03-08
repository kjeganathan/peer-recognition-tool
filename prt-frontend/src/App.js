import './App.css';
import React, { Component } from "react";
import { Redirect, BrowserRouter as Router, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/Large/Login";
import Header from "./components/Medium/Header"
import Home from "./components/Large/Home"

class App extends Component {
  render(){
    return (
      <Router>
          <div>
            <Header/>
            <Redirect to="/login" />
            <Route exact path="/login" component={Login}/>
            <Route exact path="/home" component={Home}/>
          </div>
      </Router>
    );
  }
}


export default App;
