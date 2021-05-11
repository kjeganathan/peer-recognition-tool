import React, { Component } from "react";
import Helpers from "../../helpers.js";
import routeNames from "../../routeNames.js";
import Button from "react-bootstrap/Button"
import "../Medium/Reaction.css";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import axios from 'axios';

export default class Reaction extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user: props.user,
            recognitionID: props.recognitionID,
            reactionName: props.reactionName,
            emoji: props.emoji,
            giverIDs: []
        }

        this.updateGiverIDs = this.updateGiverIDs.bind(this);
        this.renderColor = this.renderColor.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        const body = {
            recognitionID: this.state.recognitionID,
            giverID: this.state.user._id,
            emoji: this.state.emoji
        };

        axios.post(routeNames.reactions, body, { withCredentials: true })
            .then(res => this.updateGiverIDs());
    }

    async componentDidMount() {
        this.updateGiverIDs();
    }

    async updateGiverIDs() {
        var giverIDs;

        giverIDs = await Helpers.getWithParameters(
            routeNames.reactions,
            { recognitionID: this.state.recognitionID, emoji: this.state.emoji },
            true
        );

        giverIDs = giverIDs.map(giver => giver.giverID);
        console.log("giverIDs: " + JSON.stringify(giverIDs, null, 4));

        this.setState(
            {
                giverIDs: giverIDs
            }
        );

    }

    renderColor() {
        if (this.state.giverIDs.includes(this.state.user._id)) {
            return "buttons given";
        }

        return "buttons not-given";
    }

    render() {
        return (
            <OverlayTrigger
                key="top"
                placement="top"
                overlay={
                    <Tooltip>
                        {this.state.reactionName}
                    </Tooltip>
                }
            >
                <Button
                    className={this.renderColor()}
                    onClick={this.onClick}
                >
                    {this.state.emoji} {this.state.giverIDs.length}
                </Button>
            </OverlayTrigger>
        );
    }
}

