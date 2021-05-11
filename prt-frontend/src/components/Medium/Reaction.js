import React, { Component } from "react";
import Helpers from "../../helpers.js";
import Button from "react-bootstrap/Button"
import "../Medium/Reaction.css";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import axios from 'axios';

export default class Reaction extends Component {
    constructor(props) {
        super(props)

        this.state = {
            recognition: props.recognition,
            reactionName: props.reactionName,
            emoji: props.emoji,
            givers: []
        }

        this.updateGivers = this.updateGivers.bind(this);
        this.renderColor = this.renderColor.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        const body = {
            recognition: this.state.recognition,
            giver: localStorage.getItem("user"),
            emoji: this.state.emoji
        };

        axios.post("http://localhost:3001/reactions", body, { withCredentials: true })
            .then(res => this.updateGivers());
    }

    async componentDidMount() {
        this.updateGivers();
    }

    async updateGivers() {
        var givers;

        givers = await Helpers.getWithParameters(
            "http://localhost:3001/reactions",
            { recognition: this.state.recognition, emoji: this.state.emoji },
            true
        );

        givers = givers.map(giver => giver.giver);
        console.log("givers: " + JSON.stringify(givers, null, 4));

        this.setState(
            {
                givers: givers
            }
        );

    }

    renderColor() {
        if (this.state.givers.includes(localStorage.getItem("user"))) {
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
                    {this.state.emoji} {this.state.givers.length}
                </Button>
            </OverlayTrigger>
        );
    }
}

