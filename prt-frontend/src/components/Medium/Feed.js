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
        console.log("recognitions: " + JSON.stringify(recognitions, null, 4).substring(0, 1000));

        this.setState({
            recognitions: recognitions
        });
        console.log("this.state.recognitions: " + JSON.stringify(this.state.recognitions, null, 4).substring(0, 1000));
    }

    async getCompany(){
        console.log("getCompany()");

        const companyParameters = {
            companyID: this.state.company
        };

        const response = await axios.get(
            "http://localhost:3001/company",
            {params: companyParameters},
            {withCredentials: true}
        );

        const company = response.data;

        this.setState({
            company: company._id
        });

        console.log("this.state.company: " + this.state.company);
    }

    fullName(employee) {
        return employee.firstName + " " + employee.lastName;
    }

    render() {
        return (
            // <ul>
            //     {this.state.recognitions.map(async recognition => {
            //         const component = await this.renderRecognition(recognition);
            //         <li key={recognition._id}>{component}</li>
            //     })}
            // </ul>
            <div>
                Test
            </div>
        );
    }

    // // renderRecognitions() {
    // //     return (
    // //         <ul>
    // //             {this.state.recognitions.map(recognition => (
    // //                 <li key={recognition._id}>{this.renderRecognition(recognition)}</li>
    // //             ))}
    // //         </ul>
    // //     )
    // // }

    // async renderRecognition(recognition) {
    //     var response;

    //     const giverParameters = {
    //         companyID: this.state.companyID,
    //         employeeID: recognition.giverID
    //     };

    //     response = await axios.get(
    //         "http://localhost:3001/user",
    //         { params: giverParameters },
    //         { withCredentials: true }
    //     );

    //     const giver = response.data;
    //     // console.log("giver: " + JSON.stringify(giver, null, 4).substring(0, 1000));

    //     const receiverParameters = {
    //         companyID: this.state.companyID,
    //         employeeID: recognition.receiverID
    //     };

    //     response = await axios.get(
    //         "http://localhost:3001/user",
    //         { params: receiverParameters },
    //         { withCredentials: true }
    //     );

    //     const receiver = response.data;
    //     // console.log("receiver: " + JSON.stringify(receiver, null, 4).substring(0, 1000))

    //     // newRecognitions.push(
    //     return (
    //         <Recognition
    //             giverName={this.fullName(giver)}
    //             receiverName={this.fullName(receiver)}
    //         // receiverProfilePicURL=
    //         />
    //     );

    //     // console.log(newRecognitions);


    // }
}