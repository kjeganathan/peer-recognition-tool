
import React, { Component } from "react";
import { Redirect, BrowserRouter as Router, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import profilePic from "./genericProfilePicture.jpeg";
import './ProfilePage.css';
import axios from 'axios';

export default class ProfilePage extends Component {
  constructor(props){
    super(props);
    console.log(this.props);
    console.log(this.props.state)
  } 
  componentDidMount(){
    axios.get('http://localhost:3001/getCurrentUser', {withCredentials: true})
        .then((res) => this.updateProfile(res));
  }

  updateProfile(res){
    console.log("here")
    document.getElementById("name").innerHTML = "<strong>"+ res.data.firstName +" "+ res.data.lastName+"</strong>";
    document.getElementById("email").innerHTML = "<strong>Email: </strong><i>"+res.data.email+"</i> ";
    document.getElementById("position").innerHTML = "<strong>Position:</strong> <i>"+res.data.positionTitle+"</i>";
    document.getElementById("comments").innerHTML = "<strong>Number of Recs:</strong> <i>"+res.data.recognitionsReceived.length+"</i>";
  }
  render(){

    return (
        <div class= "entireProfile">
            
          <img class = "profilePicture" src={profilePic} alt="profilePic"/>
        
        <div className= "profile" style= {{width:"50rem", height:"60vmin", border:"1px solid #000"}}>
            <div >
               
                <div className = "userInfo">
                    <div className = "profileHeader">
                      <h2 class = "info" id = "name"></h2>
                    </div>
                    <h3 id = "company" class = "info" ></h3>
                    <h3 id = "email" class = "info" ></h3>
                    <h3 id = "position" class = "info"></h3>
                    <h3 id = "comments" class = "info"></h3>
                </div>
            </div>
            
        </div>
        </div>
    );
 }
}