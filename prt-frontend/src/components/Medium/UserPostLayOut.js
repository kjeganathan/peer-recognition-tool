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
import axios from 'axios';



export default class UserPostLayOut extends Component{
    constructor(props){
        super(props);

        this.state = {
            username: localStorage.getItem('username'), //call username from localstorage
            fullName: localStorage.getItem('fullName'),
            cid: localStorage.getItem('cid'),
            recognition: '',
            items: [], //the empty array is for getting the input from the textarea
        };
        console.log(this.state.cid);
        console.log(props)
        this.addItem = this.addItem.bind(this);

    }
    
    componentDidMount(){
        axios.get('http://localhost:3001/recogs', {withCredentials: true})
            .then((res) => this.updateFeed(res));
    }

    getUserFromID(employeeId){
        var result;
        axios.post('http://localhost:3001/lookupUser', {id: employeeId}, {withCredentials: true})
            .then((result) => function(result){
                return result['1'].data.firstName+ " "+ result['1'].data.lastName; ////////////////////////////////////////////////////
            });
    }
    updateUsers(res, callback){
        for(var i=0;i<Object.keys(res.data).length;i++){
            res.data[i]["giver"] = this.getUserFromID(res.data[i]["reco"].giverID);
            console.log(this.getUserFromID(res.data[i]["reco"].giverID))

            res.data[i]["receiver"] = this.getUserFromID(res.data[i]["reco"].receiverID);
        }
        console.log(res.data[1]["giver"])
    }

    updateFeed(res){
        var tempRecognized = "";
        var messageValue = "";
        console.log(res.data[1])
        for(var i=0;i<Object.keys(res.data).length;i++){
            
            tempRecognized=res.data[i]["reco"].receiverName;
            messageValue = res.data[i]["reco"].message;
                var newItem = {
                    // username: res.data[i]["reco"].giverName, ////////////////////////////////////////
                    fullName: res.data[i]["reco"].giverName,
                    recognized: tempRecognized,
                    text: messageValue,
                };
    
                this.setState((prevState) => {
                    return {
                        items: [newItem].concat(prevState.items)
                    };
                });

        var tempRecognized = "";
        var messageValue = "";
        }
    };

    addItem(e){ //enter value will add them into the items array 
        console.log(this._recognized.value);
        if(this._recognition.value !== ""){
            var newItem = {
                companyID: parseInt(this.state.cid),
                giverID: -1,
                receiverID: -1,
                value: [],
                message: this._recognition.value,
                giverName: this.state.fullName,
                receiverName: this._recognized.value,
            };
            axios.post('http://localhost:3001/postRec', newItem, {withCredentials: true})
            .then((res) => console.log(res.data));
        }

        this._recognized.value = "";
        this._recognition.value = "";
        e.preventDefault(); //prevent refreash page
    }

    createTasks(item){  
        return<li key = {item.key}>
                <p className = "postHeader" style = {{color: "black" , backgroundColor: "rgb(210, 252, 255)"}}>
                    <AwardsButton></AwardsButton>

                    <img class = "profilePictures" src={profilePic} alt="profilePic" width ="8%"/><strong> {item.recognized} </strong>received a recognition from

                    <strong> {item.fullName}</strong>
                </p>
             {item.text}
             <CommentButton></CommentButton>
             </li>
    }

    postList(){
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
                    {this.postList()}
                </ul>
            </div>

        )
    }
}
