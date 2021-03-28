import React, { Component} from "react";
import Dropdown from "react-bootstrap/Dropdown";

import { BiBell } from 'react-icons/bi';
import {SignOutIcon, BellIcon  } from '@primer/octicons-react'
import './Notifications.css';

export default class Notifications extends Component{
    constructor(props){
        super(props);
        this.state = {
          newNotifications: 4
        };
        console.log(this.props)
    }

    CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
        <button class = "notificationButton jelly"
          ref={ref}
          onClick={(e) => {
            e.preventDefault();
            onClick(e);
            this.setState((state)=>{return{newNotifications:0}});
          }}
        >
          {children}
        </button>
      ));
      
    render() {
        let badge = null;
        if(this.state.newNotifications > 0){
            badge =<span class="badge badge-pill x2">{this.state.newNotifications}</span>;
        }
        return (
        <Dropdown>
            <Dropdown.Toggle as={this.CustomToggle}>
                <BiBell size = {30}/>  
                {/* <BellIcon size={30}/> */}
                {badge}
            </Dropdown.Toggle>  
            
            <Dropdown.Menu> 
            <Dropdown.Header>Notifications</Dropdown.Header>
            <Dropdown.Item href="#/mention">You have been recognized by: John Doe!<p>2 days ago</p> </Dropdown.Item>
            <Dropdown.Divider/>
            <Dropdown.Item href="#/mention">You have been recognized by: Jane Doe!<p>3 days ago</p> </Dropdown.Item>
            <Dropdown.Divider/>
            <Dropdown.Item href="#/mention">Tiffany commented on your recognition<p>5 days ago</p> </Dropdown.Item>
            <Dropdown.Divider/>
            <Dropdown.Item href="#/mention">Steve liked your recognition<p>6 days ago</p> </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
        );
      }
}

