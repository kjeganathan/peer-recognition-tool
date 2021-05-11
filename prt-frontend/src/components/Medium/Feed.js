import React, { Component } from "react";
import Recognition from "../Medium/Recognition";
import Helpers from "../../helpers.js";

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
            "http://localhost:3001/recognitions",
            { company: this.state.company },
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
                    giver={recognition.giver}
                    receiver={recognition.receiver}
                    message={recognition.message}
                    coreValues={recognition.coreValues}
                />
            </li>
        );
    }
}