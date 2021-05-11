import React, {Component} from "react";
import Card from "react-bootstrap/Card";
import Helpers from "../../helpers.js";
import routeNames from "../../routeNames.js";

export default class Comment extends Component{
    constructor(props){
        super(props);

        this.state = {
            date: props.date,
            commenterID: props.commenterID,
            commenterName: "",
            message: props.message
        }
    }

    async componentDidMount(){
        const commenter = await Helpers.getWithParameters(
            routeNames.employees,
            {employeeID: this.state.commenterID},
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