import React, { Component } from "react";
import Button from "react-bootstrap/Button"
import DropdownButton from "react-bootstrap/DropdownButton"
import "./AwardsButton.css";

export default class AwardsButton extends Component{
    render(){
        return(
            <div className = "Awards-Button">
                <DropdownButton className = "Dropdown-Menu"
                menuAlign="left"
                title="Awards"
                id="dropdown-menu-align-right">
                    <Button >Thumbs Up </Button>
                    
                    <Button>Smiley Face</Button>
                    <Button>Disagree</Button>
                    <Button>Love</Button>
                </DropdownButton>
            </div>
        )
    }
}