import React, { Component } from "react";
import Helpers from "../../helpers.js";
import Button from "react-bootstrap/Button"
import DropdownButton from "react-bootstrap/DropdownButton"
// import "./AwardsButton.css";
import "../Medium/Reaction.css";
import Tooltip from "react-bootstrap/Tooltip";
import Overlay from "react-bootstrap/Overlay";
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
            .then(res => this.updateGivers())
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
        // return (
        //     <div class="share-button">
        //         <span>
        //             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trophy-fill" viewBox="0 0 16 16">
        //                 <path d="M2.5.5A.5.5 0 0 1 3 0h10a.5.5 0 0 1 .5.5c0 .538-.012 1.05-.034 1.536a3 3 0 1 1-1.133 5.89c-.79 1.865-1.878 2.777-2.833 3.011v2.173l1.425.356c.194.048.377.135.537.255L13.3 15.1a.5.5 0 0 1-.3.9H3a.5.5 0 0 1-.3-.9l1.838-1.379c.16-.12.343-.207.537-.255L6.5 13.11v-2.173c-.955-.234-2.043-1.146-2.833-3.012a3 3 0 1 1-1.132-5.89A33.076 33.076 0 0 1 2.5.5zm.099 2.54a2 2 0 0 0 .72 3.935c-.333-1.05-.588-2.346-.72-3.935zm10.083 3.935a2 2 0 0 0 .72-3.935c-.133 1.59-.388 2.885-.72 3.935z" />
        //             </svg>
        //         </span>
        //         <>
        //             {['top'].map((placement) => (
        //                 <OverlayTrigger
        //                     key={placement}
        //                     placement={placement}
        //                     overlay={
        //                         <Tooltip id={`tooltip-${placement}`}>
        //                             <strong>Thumbs Up</strong>
        //                         </Tooltip>
        //                     }
        //                 >
        //                     <Button onClick={() => this.handleButtonClick("thumbsUp")} className="buttons">
        //                         {(this.state.thumbsUp.length > 0) ? <badge className="badge1" >{this.state.thumbsUp.length}</badge> : null}
        //                         <img src="https://img.icons8.com/color/20/000000/flex-biceps.png" />

        //                     </Button>
        //                 </OverlayTrigger>
        //             ))}
        //         </>


        //         <>
        //             {['top'].map((placement) => (
        //                 <OverlayTrigger
        //                     key={placement}
        //                     placement={placement}
        //                     overlay={
        //                         <Tooltip id={`tooltip-${placement}`}>
        //                             <strong>Goat</strong>
        //                         </Tooltip>
        //                     }
        //                 >
        //                     <Button onClick={() => this.handleButtonClick("goat")} className="buttons">
        //                         {(this.state.goat.length > 0) ? <badge className="badge2" >{this.state.goat.length}</badge> : null}
        //                         <img src="https://img.icons8.com/color/20/000000/pet.png" />

        //                     </Button>
        //                 </OverlayTrigger>
        //             ))}
        //         </>

        //         <>
        //             {['top'].map((placement) => (
        //                 <OverlayTrigger
        //                     key={placement}
        //                     placement={placement}
        //                     overlay={
        //                         <Tooltip id={`tooltip-${placement}`}>
        //                             <strong>Laugh</strong>
        //                         </Tooltip>
        //                     }
        //                 >
        //                     <Button onClick={() => this.handleButtonClick("laugh")} className="buttons">

        //                         {(this.state.laugh.length > 0) ? <badge className="badge3" >{this.state.laugh.length}</badge> : null}

        //                         <img src="https://img.icons8.com/color/20/000000/pug.png" />

        //                     </Button>
        //                 </OverlayTrigger>
        //             ))}
        //         </>




        //         <>
        //             {['top'].map((placement) => (
        //                 <OverlayTrigger
        //                     key={placement}
        //                     placement={placement}
        //                     overlay={
        //                         <Tooltip id={`tooltip-${placement}`}>
        //                             <strong>Love</strong>
        //                         </Tooltip>
        //                     }
        //                 >
        //                     <Button onClick={() => this.handleButtonClick("love")} className="buttons">
        //                         {(this.state.love.length > 0) ? <badge className="badge4" >{this.state.love.length}</badge> : null}
        //                         <img src="https://img.icons8.com/color/20/000000/heart-with-arrow--v2.png" />

        //                     </Button>
        //                 </OverlayTrigger>
        //             ))}
        //         </>
        //     </div>
        // )
    }
}

