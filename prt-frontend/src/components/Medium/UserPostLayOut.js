//this file is where the program disply the input common on the screen
//file include the area text bar and the submit button at the buttom right corner
//flip move is a animation libary under react

//this file using a empty array take all the input and assign them a unique key
//using the items.map(this.createTasks), map take the element from items one by one and pass into createTasks(item)
//createTasks(item) this function will retuen one by one base the the unique key
import React, {Component} from "react";
import FlipMove from "react-flip-move";
import "./UserPostLayOut.css";
import axios from 'axios';
import ReactDOM from 'react-dom';


export default class UserPostLayOut extends Component{
    constructor(props){
        super(props);

        this.state = {
            items: [] //the empty array is for getting the input from the textarea
        };

        this.addItem = this.addItem.bind(this);
    }
    
    componentDidMount(){
        console.log("here");
        axios.get('http://localhost:3001/recogs', {withCredentials: true})
            .then((res) => this.updateFeed(res));
    }

    updateFeed(res){
        console.log(res);
        for(var i=0;i<Object.keys(res.data).length;i++){

            this._inputElement.value=res.data[i].message;
            if(this._inputElement.value !== ""){
                var newItem = {
                    text: this._inputElement.value,
                    key: Date.now() //a time value for the unique perpos
                };
    
                this.setState((prevState) => {
                    return {
                        items: prevState.items.concat(newItem)
                    };
                });
            }
    
            this._inputElement.value = "";
    
            console.log(this.state.items);
        }
    };

    formatRecog(){

    }

    addItem(e){ //enter value will add them into the items array 
        if(this._inputElement.value !== ""){
            var newItem = {
                text: this._inputElement.value,
                key: Date.now() //a time value for the unique perpos
            };

            this.setState((prevState) => {
                return {
                    items: [newItem].concat(prevState.items)
                };
            });
        }

        this._inputElement.value = "";

        console.log(this.state.items);

        e.preventDefault(); //prevent refreash page
    }

    createTasks(item){
        return<li key = {item.key}>{item.text}</li>
        // return <li><textarea className = "textArea" key = {item.key}>{item.text}</textarea></li>
    }

    render(){
        return(
            <div className = 'todoListMain'>
                <div className = "header">
                    <form onSubmit = {this.addItem}>
                        <textarea ref={(a) => this._inputElement = a} 
                            placeholder = "write some common">
                        </textarea>

                        <button type = "submit">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-upload" viewBox="0 0 16 16">
                            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                            <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z"/>
                            </svg>
                        </button>
                    </form>
                </div>

                <ul className = "thisList">
                    <FlipMove duration = {250} easing = "ease-out">
                        {this.state.items.map(this.createTasks)}
                    </FlipMove>
                </ul>
            </div>
        )
    }
}