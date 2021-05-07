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
                    {/* <img src={logo} className= "App-logo" alt = "logo" style={{margin: '10px 10px', width:'180px',height:'60px'}}></img> */}
                    <img className= "App-logo" style={{margin: '10px 10px', width:'160px',height:'60px'}} src="https://images.squarespace-cdn.com/content/v1/5f69a9ce43305d499a7b27d6/1600891945550-JKC721BM2OM5JHS76QX7/ke17ZwdGBToddI8pDm48kP5cuDb6rlHGYNPMD_blOPsUqsxRUqqbr1mOJYKfIPR7LoDQ9mXPOjoJoqy81S2I8N_N4V1vUb5AoIIIbLZhVYy7Mythp_T-mtop-vrsUOmeInPi9iDjx9w8K4ZfjXt2dqcZMND0BvAkTfFXymHonNnYV6rJmtizd1UFWgnEZwICCjLISwBs8eEdxAxTptZAUg/ukg+white.png?format=300w"/>
    
                </div>
            </header>
        );
    }
}
export default withRouter(Header);

