
import React, { Component } from "react";
import { Redirect, BrowserRouter as Router, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import profilePic from "./genericProfilePicture.jpeg";
import './ProfilePage.css';

export default class ProfilePage extends Component {
  constructor(props){
    super(props);
    console.log(this.props);
    console.log(this.props.state)
  } 
  render(){

    return (
        <div class= "entireProfile">
            
          <img class = "profilePicture" src={profilePic} alt="profilePic"/>
        
        <div className= "profile" style= {{width:"50rem", height:"60vmin", border:"1px solid #000"}}>
            <div >
               
                <div className = "userInfo">
                    <div className = "profileHeader">
                      <h2 class = "info" id = "name">Jamel Spencer </h2>
                    </div>
                    <h3 class = "info" ><strong>Company: </strong><i>Greenlife Consulting</i> </h3>
                    <h3 class = "info" ><strong>Email: </strong><i>Jamel_Spencer@greenlifeconsulting.com</i> </h3>
                    <h3 class = "info"><strong>Position:</strong> <i>Software Engineer</i></h3>
                    <h3 class = "info"><strong>Number of Comments:</strong> <i>5</i></h3>
                </div>
            </div>
            
        </div>
        </div>
    );
 }
}