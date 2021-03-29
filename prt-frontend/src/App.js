import './App.css';
import React, { Component } from "react";
import { Redirect, BrowserRouter as Router, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/Large/Login";
import Header from "./components/Medium/Header"
import Home from "./components/Large/Home"
import Footer from"./components/Medium/Footer"
import Profile from"./components/Medium/ProfilePage"





class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
    }
  } 

  render(){
    return (
      <Router> {/* Imported Router component */}
          <div>
            <Header/>

            {/* <Redirect to="/login" /> */}
            {/* <Route exact path="/login" exact component={Login}/> */}
            <Route exact path="/" exact component={Login}/>
            <Route exact path="/home" component={Home}/>
            <Route exact path="/profile" component={Profile}/>
            
          </div>
      </Router>
    );
  }
}


export default App;
