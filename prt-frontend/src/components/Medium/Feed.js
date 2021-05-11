import React, { Component } from "react";
import Recognition from "../Medium/Recognition";
import Helpers from "../../helpers.js";
import routeNames from "../../routeNames.js";

export default class Feed extends Component {
    constructor(props) {
        super(props);

        this.state = {
            company: props.company,
            recognitions: []
        }

        this.updateRecognitions = this.updateRecognitions.bind(this);
        this.renderRecognition = this.renderRecognition.bind(this);
    }

    async componentDidMount() {
        this.updateRecognitions();
    }

    async updateRecognitions() {
        const recognitions = await Helpers.getWithParameters(
            routeNames.recognitions,
            { companyID: this.state.company._id },
            true
        );

        this.setState({
            recognitions: recognitions
        });
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
                    _id={recognition._id}
                    giverID={recognition.giverID}
                    receiverID={recognition.receiverID}
                    message={recognition.message}
                    coreValues={recognition.coreValues}
                />
            </li>
        );
    }
}