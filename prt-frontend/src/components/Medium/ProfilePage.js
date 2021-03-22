
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
                      <h2 class = "info" id = "name">Firstname Lastname </h2>
                    </div>
                    
                    <h3 class = "info" ><strong>Company: </strong>Greenhouse Inc. </h3>
                    <h3 class = "info"><strong>Position:</strong> Employee</h3>
                    <h3 class = "info"><strong>Number of Comments:</strong> 5</h3>
                </div>
            </div>
            
        </div>
        </div>
    );
 }
}