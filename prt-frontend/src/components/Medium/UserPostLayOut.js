import React, { Component } from "react";
import "./UserPostLayOut.css";
import { BiSearch } from "react-icons/bi";
import CoreValuesButton from "./CoreValuesButton";
import Feed from "../Medium/Feed";
import RecognitionForm from "../Medium/RecognitionForm";
import { CpuIcon, PaperAirplaneIcon, SquirrelIcon } from '@primer/octicons-react'
import axios from 'axios';
import Select from 'react-select';
import { Button } from 'semantic-ui-react'
import Dropdown from "react-bootstrap/Dropdown";
import Helpers from "../../helpers.js"

export default class UserPostLayOut extends Component {
    constructor(props) {
        super(props);


        this.state = {
            company: localStorage.getItem("company")
        };

        console.log("this.state.company: " + this.state.company);

        // console.log(this.state.peopleInCompany)
        // axios.get('http://localhost:3001/getPeople', { withCredentials: true })
        // .then((res) => this.setState({ peopleInCompany: res.data }));

        // axios.get('http://localhost:3001/getCoreValues', { withCredentials: true })
        // .then((res) => this.setState({ corevals: res.data }));
    }

    async componentDidMount() {
        // console.log("cid: " + localStorage.getItem("cid"));

        // const company = await Helpers.getWithParameters(
        //     "http://localhost:3001/companies",
        //     {companyID: localStorage.getItem("cid")},
        //     true
        // );

        // this.setState({company: company._id});
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
                <RecognitionForm />
                <Feed
                    company={this.state.company}
                />
            </>
        );
    }
}