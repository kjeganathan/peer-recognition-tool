import React, {Component} from "react";
import Card from "react-bootstrap/Card";

export default class Comment extends Component{
    constructor(props){
        super(props);

        this.state = {
            commenter: props.commenter,
            message: props.message
        }
    }

    render(){
        return(
            <Card>
                {this.state.commenter}<br/>
                {this.state.message}
            </Card>
        );
    }
}