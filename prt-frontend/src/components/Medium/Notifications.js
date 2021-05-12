import React, { Component } from "react";
import Dropdown from "react-bootstrap/Dropdown";

import { BiBell } from 'react-icons/bi';
import { SignOutIcon, BellIcon } from '@primer/octicons-react'
import './Notifications.css';

import axios from 'axios';

export default class Notifications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // numNewNotifications: 4,
      elements: [],
    };

    this.componentDidMount = this.componentDidMount.bind(this);
    this.updateNotifications = this.updateNotifications.bind(this);
    console.log(this.props)
  }

  componentDidMount() {
    axios.get('http://localhost:3001/notifications', { withCredentials: true })
      .then((res) => this.updateNotifications(res));
  }

  delete(state, notifID){
    console.log(typeof(notifID));
    axios.delete('http://localhost:3001/notifications/', notifID, { withCredentials: true }) //error cost
      .then((res) => {
          // this.componentDidMount();
          this.updateNotifications(res);
      });
  }

  updateNotifications(res) {
    var numberId = 0;
    const newNotifications = res.data.notifications;
    const newElements = newNotifications.map(notification => {
        numberId = numberId + 1;
        console.log(numberId)
      return [
        // <Dropdown.Item href="#/mention" onClick = {(event) => this.delete(event,notification._id)}>
        <Dropdown.Item href="#/mention">
          {notification.message}
          <p>{notification.arrivalTime}</p>
        </Dropdown.Item>,
        <Dropdown.Divider></Dropdown.Divider>
      ];
    });
    // console.log("Notifications: " + notifications);

    this.setState({
      numNewNotifications: newNotifications.length,
      elements: newElements
    });
  }

  CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <button class="notificationButton jelly"
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
        this.setState((state) => { return { numNewNotifications: 0 } });
        this.componentDidMount();
      }}
    >
      {children}
    </button>
  ));

  render() {
    let badge = null;
    if (this.state.numNewNotifications > 0) {
      badge = <span class="badge badge-pill x2">{this.state.numNewNotifications}</span>;
    }
    return (
      <Dropdown>
        <Dropdown.Toggle as={this.CustomToggle}>
          <BiBell size={30} />
          {/* <BellIcon size={30}/> */}
          {badge}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Header>Notifications</Dropdown.Header>
          {this.state.elements}
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

