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
        this.renderRecognition = this.renderRecognition.bind(this);
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

        // const response = await axios.get(
        //     "http://localhost:3001/recognitions",
        //     { params: recognitionsParameters },
        //     { withCredentials: true }
        // );

        const recognitions = this.getWithParameters(
            "http://localhost:3001/recognitions",
            recognitionsParameters,
            true
        );
        // console.log("recognitions[0]: " + JSON.stringify(recognitions[0], null, 4));

        this.setState({
            recognitions: recognitions
        });
        console.log("this.state.recognitions: " + JSON.stringify(this.state.recognitions[0], null, 4));
    }

    async updateRecognition(recognition){
        console.log("updateRecognition()");

        const giverParameters = {
            user: recognition.giver
        }

        var response = await axios.get(
            "http://localhost:3001/users",
            {params: giverParameters},
            {withCredentials: true}
        );

        const giver = response.data;
        console.log("giver: " + JSON.stringify(giver, null, 4));

        const receiverParameters = {

        }
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

    async getWithParameters(route, parameters, isWithCredentials){
        var debug = "GET " + route;

        const response = await axios.get(
            route,
            {params: parameters},
            {withCredentials: isWithCredentials}
        );

        const data = response.data;
        debug += "\nresponse.data: " + JSON.stringify(data, null, 4).substring(0, 256) + "\n";
        console.log(debug);
        return data;
    }

    render() {
        return (
            <ol>
                {this.state.recognitions.map(this.renderRecognition)}
            </ol>
        );
    }

}