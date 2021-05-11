import React, { Component } from "react";
import Container from "react-bootstrap/Container"
import SearchBox from "../Medium/SearchBox"

export default class RecognitionForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            company: props.company
        }
    }

    render() {
        return (
            <Container className="recognition">
                <SearchBox
                    placeholder="Recipient"
                />
            </Container>
        );
    }
}