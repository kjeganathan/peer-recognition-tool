import React, { Component } from "react";
import "./UserPostLayOut.css";
// import { BiSearch } from "react-icons/bi";
// import CoreValuesButton from "./CoreValuesButton";
import Feed from "../Medium/Feed";
import RecognitionForm from "../Medium/RecognitionForm";
import { PaperAirplaneIcon } from '@primer/octicons-react'
import axios from 'axios';
// import Select from 'react-select';
// import { Button } from 'semantic-ui-react'
import Dropdown from "react-bootstrap/Dropdown";
import Helpers from "../../helpers.js"

export default class UserPostLayOut extends Component {
    constructor(props) {
        super(props);

        this.state = {
            company: props.company,
            user: props.user
        };

        console.log("UserPostLayOut\nthis.state: " + JSON.stringify(this.state, null, 4).substring(0, 256));
    }

    Notifications() {
        axios.get('http://localhost:3001/notifications', { withCredentials: true })
            .then((res) => this.updateNotifications(res));
    }

    updateNotifications(res) {
        const newNotifications = res.data.notifications;
        const newElements = newNotifications.map(notification => {
            return [
                <Dropdown.Item href="#/mention">
                    {notification.message}
                    <p>{notification.arrivalTime}</p>
                </Dropdown.Item>,
                <Dropdown.Divider></Dropdown.Divider>
            ];
        });

        this.setState({
            numNewNotifications: newNotifications.length,
            elements: newElements
        });
    }

    render() {
        return (
            <>
                <RecognitionForm
                    company={this.state.company}
                    user={this.state.user}
                />
                <Feed
                    company={this.state.company}
                    user={this.state.user}
                />
            </>
        );
    }
}