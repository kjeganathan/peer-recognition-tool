//this file is where the program disply the input common on the screen
//file include the area text bar and the submit button at the buttom right corner
//flip move is a animation libary under react

//this file using a empty array take all the input and assign them a unique key
//using the items.map(this.createTasks), map take the element from items one by one and pass into createTasks(item)
//createTasks(item) this function will retuen one by one base the the unique key
import React, {Component} from "react";
import FlipMove from "react-flip-move";
import "./UserPostLayOut.css";
import profilePic from "./genericProfilePicture.jpeg";

export default class UserPostLayOut extends Component{
    constructor(props){
        super(props);

        this.state = {
            username: props.user.username,
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
             <p className = "postHeader" style = {{color: "black", backgroundColor: "rgba(38, 109, 53, 0.5)"}}>
                 <img class = "profilePictures" src={profilePic} alt="profilePic" width ="8%"/><strong> {item.username} </strong>is recognizing 
                 : <img class = "profilePictures" src={profilePic} alt="profilePic" width ="8%"/>
                 <strong> {item.recognized}</strong></p>
             {item.text}</li>
        
    }

    render(){
        return(
            
            <div className = 'todoListMain'>
                <div className = "recognition">
                    <form className = "post" onSubmit = {this.addItem}>
                    <textarea className = "recognitionFor" ref={(a) => this._recognized = a} 
                            placeholder = "who are you recognizing">
                        </textarea>
                    <textarea className = "recognition" ref={(a) => this._recognition = a} 
                            placeholder = "recognition">
                        </textarea>
                        <button type = "submit">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-upload" viewBox="0 0 16 16">
                            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                            <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z"/>
                            </svg>
                        </button>
                    </form>
                </div>

                <ul className = "thisList">
                    
                        {this.state.items.reverse().map(this.createTasks)}
                        
                    
                </ul>
            </div>
        )
    }
}
