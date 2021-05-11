import React, {Component} from "react";
import Card from "react-bootstrap/Card";
import Helpers from "../../helpers.js";

export default class Comment extends Component{
    constructor(props){
        super(props);

        this.state = {
            date: props.date,
            commenter: props.commenter,
            commenterName: "",
            message: props.message
        }
    }

    async componentDidMount(){
        const commenter = await Helpers.getWithParameters(
            "http://localhost:3001/users",
            {user: this.state.commenter},
            true
        );

        this.setState(
            {
                commenterName: Helpers.fullName(commenter)
            }
        );
    }

    render(){
        return(
            <Card>
                <strong>{this.state.commenterName}</strong>
                <i>{this.state.date.toDateString()}</i>
                {this.state.message}
            </Card>
        );
    }
}