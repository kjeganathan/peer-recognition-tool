import React, {Component} from "react";
import axios from "axios";

export default class SearchBox extends Component{
    constructor(props){
        super(props);

        this.state = {
            placeholder: props.placeholder,
            text: ""
            
        }

        this.onTextChange = this.onTextChange.bind(this);
    }

    onTextChange(event){
        this.setState(
            {
                text: event.target.value
            }
        );
    }

    render(){
        return(
            <textarea
                rows={"1"}
                placeholder={this.state.placeholder}
                onChange={this.onTextChange}
                value={this.state.text}
            >
            </textarea>
        );
    }
}