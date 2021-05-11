import React, { Component } from "react";
import Comment from "../Medium/Comment";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Helpers from "../../helpers.js";
import routeNames from "../../routeNames.js";

export default class Comments extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: props.user,
            recognitionID: props.recognitionID,
            comments: [],
            comment: ""
        }

        this.onCommentChange = this.onCommentChange.bind(this);
        this.onButtonClick = this.onButtonClick.bind(this);
    }

    async componentDidMount() {
        this.updateComments();
    }

    async updateComments() {
        const comments = await Helpers.getWithParameters(
            routeNames.comments,
            { recognitionID: this.state.recognitionID },
            true
        );

        this.setState(
            {
                comments: comments
            }
        );
    }

    onCommentChange(event) {
        this.setState({ comment: event.target.value });
    }

    onButtonClick(event) {
        const comment = this.state.comment;

        if (comment != "") {
            const body = {
                recognitionID: this.state.recognitionID,
                commenterID: this.state.user._id,
                message: this.state.comment,
                creationDate: new Date().toJSON()
            };

            axios.post(routeNames.comments, body, { withCredentials: true })
                .then(res => this.updateComments());
        }

        this.setState(
            {
                comment: ""
            }
        );
    }

    render() {
        return (
            <>
                <ul>
                    {this.state.comments.map(comment => (
                        <li key={comment._id}>
                            <Comment
                                date={new Date(comment.creationDate)}
                                commenterID={comment.commenterID}
                                message={comment.message}
                            />
                        </li>
                    ))}
                </ul>
                <textarea
                    value={this.state.comment}
                    onChange={this.onCommentChange}
                />
                <Button onClick={this.onButtonClick}>Post</Button>
            </>
        );
    }


}