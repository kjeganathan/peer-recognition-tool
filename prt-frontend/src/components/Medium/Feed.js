import React, { Component } from "react";
import Recognition from "../Medium/Recognition";
import axios from "axios";

export default class Feed extends Component {
    constructor(props) {
        super(props);

        this.state = {
            company: props.company,
            // filter: props.filter,
            // sort: props.sort,
            recognitions: []
        }

        this.updateRecognitions = this.updateRecognitions.bind(this);
        this.getCompany = this.getCompany.bind(this);
    }

    async componentDidMount() {
        await this.getCompany();
        this.updateRecognitions();
    }

    async updateRecognitions() {
        console.log("updateRecognitions()");

        const recognitionsParameters = {
            company: this.state.company
        }

        const response = await axios.get(
            "http://localhost:3001/recognitions",
            { params: recognitionsParameters },
            { withCredentials: true }
        );

        const recognitions = response.data;
        console.log("recognitions[0]: " + JSON.stringify(recognitions[0], null, 4));

        this.setState({
            recognitions: recognitions
        });
        console.log("this.state.recognitions: " + JSON.stringify(this.state.recognitions[0], null, 4));
    }

    async getCompany() {
        console.log("getCompany()");

        const companyParameters = {
            companyID: this.state.company
        };

        const response = await axios.get(
            "http://localhost:3001/company",
            { params: companyParameters },
            { withCredentials: true }
        );

        const company = response.data;

        this.setState({
            company: company._id
        });

        console.log("this.state.company: " + this.state.company);
    }

    render() {
        return (
            <ol>
                {this.state.recognitions.map(this.renderRecognition)}
            </ol>
        );
    }

    renderRecognition(recognition) {
        return (
            <li key={recognition._id}>
                <Recognition
                    giverName={this.fullName(recognition.giver)}
                    receiverName={this.fullName(recognition.receiver)}
                    receiverProfilePicURL={recognition.receiverProfilePicURL}
                    message={recognition.message}
                    coreValues={recognition.coreValues}
                />
            </li>
        );
    }

    fullName(employee) {
        return employee.firstName + " " + employee.lastName;
    }
}