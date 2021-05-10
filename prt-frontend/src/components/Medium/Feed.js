import React, { Component } from "react";
import Recognition from "../Medium/Recognition";
import axios from "axios";

export default class Feed extends Component {
    constructor(props) {
        super(props);

        this.state = {
            companyID: props.companyID,
            // filter: props.filter,
            // sort: props.sort,
            recognitions: []
        }

        this.updateRecognitions = this.updateRecognitions.bind(this);
        // this.renderRecognitions = this.renderRecognitions.bind(this);
        this.renderRecognition = this.renderRecognition.bind(this);
    }

    componentDidMount() {
        // const parameters = {
        //     companyID: this.state.companyID
        // }

        // axios.get("http://localhost:3001/recognitions", { params: parameters }, { withCredentials: true })
        //     .then(res => this.updateRecognitions(res.data));
        this.updateRecognitions();
    }

    async updateRecognitions() {
        // var response;
        console.log("updateRecognitions()");

        const recognitionsParameters = {
            companyID: this.state.companyID
        }

        const response = await axios.get(
            "http://localhost:3001/recognitions",
            { params: recognitionsParameters },
            { withCredentials: true }
        );
        // console.log("response: " + JSON.stringify(response, null, 4).substring(0, 256));

        const recognitions = response.data;
        console.log("recognitions: " + JSON.stringify(recognitions, null, 4).substring(0, 1000));

        this.setState({
            recognitions: recognitions
        });
        console.log("this.state.recognitions: " + JSON.stringify(this.state.recognitions, null, 4).substring(0, 1000));
        // this.setState({
        //     recognitions: recognitions
        // });
        // console.log("this.state: " + JSON.stringify(this.state.recognitions, null, 4).substring(0, 1000));

        // console.log("recognitions: " + JSON.stringify(recognitions, null, 4).substring(0, 256));
    }

    fullName(employee) {
        return employee.firstName + " " + employee.lastName;
    }

    render() {
        return (
            <ul>
                {this.state.recognitions.map(async recognition => {
                    const component = await this.renderRecognition(recognition);
                    <li key={recognition._id}>{component}</li>
                })}
            </ul>
        );
    }

    // renderRecognitions() {
    //     return (
    //         <ul>
    //             {this.state.recognitions.map(recognition => (
    //                 <li key={recognition._id}>{this.renderRecognition(recognition)}</li>
    //             ))}
    //         </ul>
    //     )
    // }

    async renderRecognition(recognition) {
        var response;

        const giverParameters = {
            companyID: this.state.companyID,
            employeeID: recognition.giverID
        };

        response = await axios.get(
            "http://localhost:3001/user",
            { params: giverParameters },
            { withCredentials: true }
        );

        const giver = response.data;
        // console.log("giver: " + JSON.stringify(giver, null, 4).substring(0, 1000));

        const receiverParameters = {
            companyID: this.state.companyID,
            employeeID: recognition.receiverID
        };

        response = await axios.get(
            "http://localhost:3001/user",
            { params: receiverParameters },
            { withCredentials: true }
        );

        const receiver = response.data;
        // console.log("receiver: " + JSON.stringify(receiver, null, 4).substring(0, 1000))

        // newRecognitions.push(
        return (
            <Recognition
                giverName={this.fullName(giver)}
                receiverName={this.fullName(receiver)}
            // receiverProfilePicURL=
            />
        );

        // console.log(newRecognitions);


    }
}