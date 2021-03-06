import React, { Component } from "react";
import logo from "../Other/logo.png"
import "./Header.css";

export default class Header extends Component{
    render(){
        return(
            <header className = "Login-header">
                <img src={logo} className= "App-logo" alt = "logo" style={{margin: '10px 20px', width:'180px',height:'60px'}}></img>
            </header>
        )
    }
}