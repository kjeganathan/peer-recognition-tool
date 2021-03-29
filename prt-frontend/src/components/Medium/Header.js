import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import logo from "../Other/logo.png"
import "./Header.css";
import Notifications from '../Medium/Notifications'
import { BiLogOut } from 'react-icons/bi';
import { BiHomeAlt } from 'react-icons/bi';
import {SignOutIcon  } from '@primer/octicons-react'
class Header extends Component{
    constructor(props){
        super(props);
        console.log(props);
    }
    render(){

        const path = this.props.location.pathname.slice(1);
        let notificationsButton = null;
        let logoutButton = null;
        let profileButton = null;
        // if(path !== "login"){
        //     notificationsButton = <Notifications/>;
        //     logoutButton = 
        //     <button className = "logout jelly" style={{margin:'20px 10px 0px 5px',float: 'right'}} onClick={()=>this.props.history.push('/login')}>
        //         <BiLogOut size = {30}/>  
        //     </button>;
        // }
        if(path !== ""){
            notificationsButton = <Notifications/>;
            logoutButton = 
            <button className = "logout jelly" style={{margin:'20px 10px 0px 5px',float: 'right'}} onClick={()=>this.props.history.push('/')}>
                <BiLogOut size = {30}/>  
            </button>;
        }

        return(
            <header className = "header">
                <div class="header-butttons">
                    {logoutButton}
                    {notificationsButton}      
                    <img src={logo} className= "App-logo" alt = "logo" style={{margin: '10px 10px', width:'180px',height:'60px'}}></img>
                </div>
            </header>
        );
    }
}
export default withRouter(Header);

