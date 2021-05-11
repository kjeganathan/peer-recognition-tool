import React, { Component } from "react";
import Comment from "../Medium/Comment";
import Helpers from "../../helpers.js";

export default class Comments extends Component {
    constructor(props) {
        super(props);

        this.state = {
            recognition: props.recognition,
            comments: []
        }
    }

    async componentDidMount() {
        const comments = await Helpers.getWithParameters(
            "http://localhost:3001/comments",
            { recognition: this.state.recognition },
            true
        );

        this.setState(
            {
                comments: comments
            }
        );
    }

    render() {
        return (
            <ul>
                {this.state.comments.map(comment => (
                    <li key={comment._id}>
                        <Comment
                            commenter={comment.commenter}
                            message={comment.message}
                        />
                    </li>
                ))}
            </ul>
        );
    }
}