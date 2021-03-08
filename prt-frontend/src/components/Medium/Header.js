import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import logo from "../Other/logo.png"
import "./Header.css";
import Notifications from '../Medium/Notifications'
import { BiLogOut } from 'react-icons/bi';

class Header extends Component{
  
    render(){
        const path = this.props.location.pathname.slice(1);
        let notificationsButton = null;
        let logoutButton = null;
        if(path != "login"){
            notificationsButton =  <Notifications/>;
            logoutButton = 
            <button class = "logout" style={{margin:'20px',float: 'right'}} onClick={()=>this.props.history.push('/login')}>
                <BiLogOut size = {30}/>  
            </button>;
        }
        return(
            <header className = "header">
                <div class="header-butttons">
                    {logoutButton}
                    {notificationsButton}      
                    <img src={logo} className= "App-logo" alt = "logo" style={{margin: '10px 20px', width:'180px',height:'60px'}}></img>
                </div>
            </header>
        );
    }
}
export default withRouter(Header);

