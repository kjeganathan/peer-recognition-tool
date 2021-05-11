import React, { Component } from "react";
import Comment from "../Medium/Comment";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Helpers from "../../helpers.js";

export default class Comments extends Component {
    constructor(props) {
        super(props);

        this.state = {
            recognition: props.recognition,
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

    onCommentChange(event) {
        this.setState({ comment: event.target.value });
    }

    onButtonClick(event) {
        const comment = this.state.comment;

        if (comment != "") {
            const body = {
                recognition: this.state.recognition,
                commenter: localStorage.getItem("user"),
                message: this.state.comment,
                creationDate: new Date().toJSON()
            };

            axios.post("http://localhost:3001/comments", body, { withCredentials: true })
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
                                commenter={comment.commenter}
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