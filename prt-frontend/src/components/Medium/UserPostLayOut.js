//this file is where the program disply the input common on the screen
//file include the area text bar and the submit button at the buttom right corner
//flip move is a animation libary under react

//this file using a empty array take all the input and assign them a unique key
//using the items.map(this.createTasks), map take the element from items one by one and pass into createTasks(item)
//createTasks(item) this function will retuen one by one base the the unique key
import React, {Component} from "react";
// import FlipMove from "react-flip-move";
import "./UserPostLayOut.css";
import AwardsButton from "./AwardsButton";
import CommentButton from "../Small/CommentButton";
import profilePic from "./genericProfilePicture.jpeg";
import {PaperAirplaneIcon, SquirrelIcon } from '@primer/octicons-react'



export default class UserPostLayOut extends Component{
    constructor(props){
        super(props);

        // localStorage.setItem('username', props.user.username)
        this.state = {
            // username: props.user.username,
            username: localStorage.getItem("username"),
            recognition: '',
            items: [], //the empty array is for getting the input from the textarea
        };
        console.log(props)
        this.addItem = this.addItem.bind(this);

    }

    addItem(e){ //enter value will add them into the items array 
        console.log(this._recognized.value);
        if(this._recognition.value !== ""){
            var newItem = {
                username:this.state.username,
                recognized: this._recognized.value,
                text: this._recognition.value,
                key: Date.now() //a time value for the unique perpos
            };

            this.setState((prevState) => {
                return {
                    items: prevState.items.concat(newItem)
                };
            });
        }

        this._recognized.value = "";
        this._recognition.value = "";
        e.preventDefault(); //prevent refreash page
    }

    createTasks(item){  
        return<li key = {item.key}>
                <p className = "postHeader">
                    <AwardsButton></AwardsButton>  
                    <img class = "profilePictures" src={profilePic} alt="profilePic" width ="8%"/><strong> {item.username} </strong>is recognizing 
                    : <img class = "profilePictures" src={profilePic} alt="profilePic" width ="8%"/>
                    <strong> {item.recognized}</strong>
                </p>
                {item.text}
                <CommentButton></CommentButton>
             </li>
    }

    poatList(){
        return this.state.items.map(this.createTasks)
    }

    postArea(){
        return <div className = "recognition">
                    <form className = "post" onSubmit = {this.addItem}>
                        <input className = "recognitionFor" ref={(a) => this._recognized = a} 
                            placeholder = "who are you recognizing">
                        </input>
                        <div className = 'line'></div>
                        <textarea className = "box" ref={(a) => this._recognition = a} 
                            placeholder = "recognition">
                        </textarea>

                        <button type = "submit">
                             <SquirrelIcon size={25}/>
                        </button>
                    </form>
                </div>
    }


    render(){
        return(           
            <div className = 'todoListMain'>
                {this.postArea()}
                <ul className = "thisList">
                    {this.poatList()}
                </ul>
            </div>
        )
    }
}
