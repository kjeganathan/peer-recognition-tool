import React, { Component} from "react";
import "./Rockstar.css";
import ReactDOM from 'react-dom';
import axios from 'axios';
import profilePic from "./genericProfilePicture.jpeg";
import Carousel from "react-bootstrap/Carousel";
/*
{name: "Jamel Spencer",
          position: "Software Architect",
          numRecognitions: "5",
          coreValues: ["Integrity", "Passion", "Teamwork"]}, {name: "Kathryn Merritt",
          position: "Engineering Manager",
          numRecognitions: "5",
          coreValues: ["Leader", "Innovative","Helpful"]}
          */
export default class Rockstar extends Component{
    constructor(props){ 
        super(props);
        this.state = {
          rockstars: [],
      }
      this.rockstar = this.rockstar.bind(this);
    }
    componentDidMount() {
        axios.get('http://localhost:3001/rockstars', { withCredentials: true })
        .then(res => {
            this.setState({
              rockstars: res.data.rockstars
            })
          })
          .catch(err => console.log(err));
          console.log(this.state.rockstars)
      }
    coreValueFunc(values){
        
        var strin = {backgroundColor:"rgb(" + [values.charCodeAt(0)*2,values.charCodeAt(1)*2,values.charCodeAt(2)/122*255].toString() + ")"};
        console.log(strin)
        
        return (
            <strong><p class = "coreValues" style = {strin}>{values} </p> </strong>
        )
        
    }

    rockstar(user){
        
        return(
        <Carousel.Item interval={50000}>
        <div class ="rockstar-info">
            <img class = "profilePicture" src={profilePic} alt="profilePic" /> 
            <div class = "rockstar-text">
                <div class = "user-info">
                    <h3 class = "name">{user.name}</h3> 
                    <p class = "position">{user.position}</p> 
                </div>
                <p class = "details">Received <strong>{user.numRecognitions} </strong>Recognitions!</p> 
                <hr class = "line"></hr>
                <strong><p class = "coreValuesTitle">Top Core Values:</p> </strong>
                {user.coreValues.map(this.coreValueFunc)}
            </div>
        </div>
        </Carousel.Item>)
        
    }
    update(){
        return this.state.rockstars.map(this.rockstar)
    }
  render(){
      
    return (
        <div class = "rockstar-panel">
            <h2 class ="title">Rockstar of the Month</h2>
            <hr class = "line"></hr>
            <Carousel fade ={true} indicators ={false} controls >
                {this.update()} 
            </Carousel>
        </div>
    );
    }

}
