import React, { Component } from "react";
// import "./Recognition.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import AwardsButton from "../Medium/AwardsButton"
import CommentButton from "../Small/CommentButton";
import axios from "axios";

export default class Recognition extends Component {
    constructor(props) {
        super(props);

        this.state = {
            giver: props.giver,
            receiver: props.receiver,
            receiverProfilePicURL: props.receiverProfilePicURL,
            message: props.message,
            coreValues: props.coreValues,
            comments: props.comments,
            reactions: null
        }
    }

    // GET request test
    // componentDidMount() {
    //     axios.get(
    //         "http://localhost:3001/users",
    //         {
    //             params: {
    //                 companyID: 1
    //             }
    //         }, { withCredentials: true }
    //     );
    // }

    render() {
        return (
            <Container className="recognition">
                <Row className="postHeader" style={{ fontSize: "20px" }}>
                    <right>
                        <img
                            class="profilePictures"
                            src={this.state.receiverProfilePicURL}
                        />
                        <strong>{this.state.receiver}</strong>
                        &nbsp;received a recognition from&nbsp;
                        <strong>{this.state.giver}</strong>
                    </right>
                </Row>

                <div className="postLineH" />

                <Card.Body>
                    <Card.Subtitle className="mb-2 text-muted" />

                    <Card.Text className="commentArea">
                        {this.state.message}
                    </Card.Text>
                </Card.Body>

                <div className="postLineH" />

                <div className="postFooter">
                    <Row>
                        &nbsp;

                        <Col>
                            <CommentButton comments={this.state.comments} />
                        </Col>

                        <Col className="floatright">
                            <right>
                                <AwardsButton reactions={this.state.reactions} />
                            </right>
                        </Col>
                    </Row>
                </div>
            </Container>
        );
    }
}