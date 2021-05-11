import React, { Component } from "react";
import Recognition from "../Medium/Recognition";
import Helpers from "../../helpers.js";
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
        this.renderRecognition = this.renderRecognition.bind(this);
        this.getCompany = this.getCompany.bind(this);
    }

    async componentDidMount() {
        await this.getCompany();
        this.updateRecognitions();
    }

    async updateRecognitions() {
        console.log("updateRecognitions()");

        const recognitions = await Helpers.getWithParameters(
            "http://localhost:3001/recognitions",
            { company: this.state.company },
            true
        );

        this.setState({
            recognitions: recognitions
        });
        console.log("this.state.recognitions: " + JSON.stringify(this.state.recognitions, null, 4).substring(0, 256));
    }


    async getCompany() {
        console.log("getCompany()");

        const company = await Helpers.getWithParameters(
            "http://localhost:3001/company",
            {companyID: this.state.company},
            true
        );

        this.setState({
            company: company._id
        });
        console.log("this.state.company: " + this.state.company);
        console.log("");
    }

    renderRecognition(recognition) {
        return (
            <li key={recognition._id}>
                <Recognition
                    giverName={recognition.giverName}
                    receiverName={recognition.receiverName}
                    receiverProfilePicURL={recognition.receiverProfilePicURL}
                    message={recognition.message}
                    coreValues={recognition.coreValues}
                />
            </li>
        );
    }

    // async getWithParameters(route, parameters, isWithCredentials) {
    //     var debug = "GET " + route;

    //     const response = await axios.get(
    //         route,
    //         { params: parameters },
    //         { withCredentials: isWithCredentials }
    //     );

    //     const data = response.data;
    //     debug += "\nResponse data: " + JSON.stringify(data, null, 4).substring(0, 256);
    //     console.log(debug);
    //     return data;
    // }

    render() {
        return (
            <ol>
                {this.state.recognitions.map(this.renderRecognition)}
            </ol>
        );
    }

}