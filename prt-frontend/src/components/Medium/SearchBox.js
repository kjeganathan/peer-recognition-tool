import React, {Component} from "react";
import axios from "axios";

export default class SearchBox extends Component{
    constructor(props){
        super(props);

        this.state = {
            placeholder: props.placeholder
        }
    }

    render(){
        return(
            <textarea
                rows={"1"}
                placeholder={this.state.placeholder}
            >
            </textarea>
        );
    }
}