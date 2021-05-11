import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
// import AwardsButton from "../Medium/AwardsButton"
import Reaction from "../Medium/Reaction";
import CommentButton from "../Small/CommentButton";
import Comment from "../Medium/Comment"
import Helpers from "../../helpers.js";

export default class Recognition extends Component {
    constructor(props) {
        super(props);

        this.state = {
            _id: props._id,
            giver: props.giver,
            receiver: props.receiver,
            message: props.message,
            coreValues: props.coreValues,
            isShowingComments: true
        }
    }

    async componentDidMount() {
        const giver = await Helpers.getWithParameters(
            "http://localhost:3001/users",
            { user: this.state.giver },
            true
        );

        const receiver = await Helpers.getWithParameters(
            "http://localhost:3001/users",
            { user: this.state.receiver },
            true
        );

        this.setState(
            {
                giverName: this.fullName(giver),
                receiverName: this.fullName(receiver)
            }
        );
    }

    render() {
        return (
            <Container className="recognition">
                {/* <Row className="postHeader" style={{ fontSize: "20px" }}> */}
                <Row style={{fontSize: "20px"}}>
                    {/* <right> */}
                    <Col md="auto">
                        <img
                            class="profilePictures"
                            src={this.state.receiverProfilePicURL}
                        />
                    </Col>

                    <Col>
                        <strong>{this.state.receiverName}</strong>
                        &nbsp;received a recognition from&nbsp;
                        <strong>{this.state.giverName}</strong>
                        {/* </right> */}
                    </Col>
                </Row>

                <div className="postLineH" />

                {/* <Card.Body>
                    <Card.Subtitle className="mb-2 text-muted" />

                    <Card.Text className="commentArea"> */}
                <Row>
                    {this.state.message}
                </Row>
                {/* </Card.Text>
                </Card.Body> */}

                <div className="postLineH" />

                {/* <div className="postFooter"> */}
                <Row>
                    &nbsp;

                        <Col>
                        <CommentButton comments={this.state.comments} />
                    </Col>

                    <Col className="floatright">
                        <right>
                            <Reaction
                                recognition={this.state._id}
                                reactionName="Thumbs Up"
                                emoji="👍"
                            />
                            <Reaction
                                recognition={this.state._id}
                                reactionName="GOAT"
                                emoji="🐐"
                            />
                            <Reaction
                                recognition={this.state._id}
                                reactionName="Laugh"
                                emoji="😄"
                            />
                            <Reaction
                                recognition={this.state._id}
                                reactionName="Heart"
                                emoji="❤️"
                            />
                        </right>
                    </Col>
                </Row>
                {/* </div> */}

                <Row>
                    <Col>
                        <Comment
                            commenter="foo"
                            message="bar"
                        />
                    </Col>
                </Row>
            </Container>
        );
    }

    fullName(employee) {
        return employee.firstName + " " + employee.lastName;
    }
}