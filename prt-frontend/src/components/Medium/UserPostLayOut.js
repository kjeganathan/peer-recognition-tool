//this file is where the program disply the input common on the screen
//file include the area text bar and the submit button at the buttom right corner
//flip move is a animation libary under react

//this file using a empty array take all the input and assign them a unique key
//using the items.map(this.createTasks), map take the element from items one by one and pass into createTasks(item)
//createTasks(item) this function will retuen one by one base the the unique key
import React, { Component } from "react";
import "./UserPostLayOut.css";
import { DEFAULT_REACTIONS, AwardsButton } from "./AwardsButton";
import { BiSearch} from "react-icons/bi";
import CoreValuesButton from "./CoreValuesButton";
import CommentButton from "../Small/CommentButton";
import { CpuIcon, PaperAirplaneIcon, SquirrelIcon } from '@primer/octicons-react'
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Select from 'react-select';
import Fade from 'react-reveal/Fade'; //fade animation
import { Button } from 'semantic-ui-react'
import Dropdown from "react-bootstrap/Dropdown";
const colorStyle={
    control: style => ({backgroundColor: 'rgb(210, 252, 255)', width: '93%', height: '30px',margin: '5px',})
}
const searchStyle={
    control: style => ({height: '35px',backgroundColor:'white', borderRadius:'5px',  boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)"})
}

const buttonText = {0:"^ New to Old", 1:"V Old to New"}
var curText = "^ New to Old"

export default class UserPostLayOut extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: localStorage.getItem('username'), //call username from localstorage
            fullName: localStorage.getItem('fullName'),
            cid: localStorage.getItem('cid'),
            employeeID: localStorage.getItem('employeeID'),
            recognition: '',
            items: [], //the empty array is for getting the input from the textarea
            peopleInCompany: [],
            corevals: [],
            pic: '',
            recognizedName: '',
            selectedItems: {},
            v: [],
            test: localStorage.getItem('test'),
            showFilter: false
        };
        // console.log(this.state.peopleInCompany)
        this.addItem = this.addItem.bind(this);
        this.createTasks = this.createTasks.bind(this);
        axios.get('http://localhost:3001/getPeople', { withCredentials: true })
            .then((res) => this.setState({ peopleInCompany: res.data }));
        
        axios.get('http://localhost:3001/getCoreValues', { withCredentials: true })
            .then((res) => { console.log(res);this.setState({ corevals: res.data })});

        axios.get('http://localhost:3001/values', { withCredentials: true })
            .then((res) => {console.log(res); this.setState({ v: res.data })});
    }

    componentDidMount() {
        this.updateFeed();
    }

    updateFeed() {
        axios.get("http://localhost:3001/recogs", { withCredentials: true })
            .then(res => this.updateFeedHelper(res.data));
    }

    Notifications() {
        axios.get('http://localhost:3001/notifications', { withCredentials: true })
          .then((res) => this.updateNotifications(res));
    }
    updateNotifications(res) {
        const newNotifications = res.data.notifications;
        const newElements = newNotifications.map(notification => {
          return [
            <Dropdown.Item href="#/mention">
              {notification.message}
              <p>{notification.arrivalTime}</p>
            </Dropdown.Item>,
            <Dropdown.Divider></Dropdown.Divider>
          ];
        });
        // console.log("Notifications: " + notifications);
    
        this.setState({
          numNewNotifications: newNotifications.length,
          elements: newElements
        });
    }

    updateUsers(res, callback){
        for(var i=0;i<Object.keys(res.data).length;i++){
            res.data[i]["giver"] = this.getUserFromID(res.data[i]["reco"].giverID);
            console.log(this.getUserFromID(res.data[i]["reco"].giverID))
        }
    }

    getUserFromID(employeeId) {
        var result;
        axios.post('http://localhost:3001/lookupUser', { id: employeeId }, { withCredentials: true })
            .then((result) => function (result) {
                return result['1'].data.firstName + " " + result['1'].data.lastName; ////////////////////////////////////////////////////
            });
    }

    updateUsers(res, callback) {
        for (var i = 0; i < Object.keys(res.data).length; i++) {
            res.data[i]["giver"] = this.getUserFromID(res.data[i]["reco"].giverID);

            res.data[i]["receiver"] = this.getUserFromID(res.data[i]["reco"].receiverID);
        }
        console.log(res.data[1]["giver"])
    }

    peopleInCompany(res) {
        this.state.peopleInCompany = res.data
        console.log(this.state.peopleInCompany)
    }

    updateFeedHelper(res) {
        console.log(res);
        var itemsList = []
        for (var i = 0; i<Object.keys(res).length; i++) {
            const recognition = res[i];
            var newItem = {
                _id: recognition._id,
                fullName: recognition.giverName,
                recognized: recognition.receiverName,
                text: recognition.message,
                comments: recognition.comments || [],
                reactions: {...DEFAULT_REACTIONS, ...recognition.reactions},
                profilePicURL: "http://localhost:3001/profile-pics/" + recognition.receiverProfilePicURL,
                values: recognition.values,
            };
            itemsList.push(newItem)
        }
        this.setState({items:itemsList.reverse()});
        var itemsList = []
    }

    updateFeedSearch(event) {
        event.preventDefault();
        
        var rem = [{giverName: "Jamel Spencer", receiverName: "Arron Garcia", message: "nice job"}]
        var curItems = [];
        var search = this.search.label;
        console.log(search)
        var tempItems = []
        axios.get("http://localhost:3001/recogs", { withCredentials: true })
            .then(res => this.searchUpdate(res.data));           
    }
    
    searchUpdate(recogs){
        var curItems = recogs;
        var search = this.search.label;
        console.log(search)
        var tempItems = []
        console.log(curItems);
        for (var i = 0; i<curItems.length; i++) {
            if(curItems[i].giverName == search || curItems[i].recognizedName == search){
                tempItems.push(curItems[i]);
            }
        }
        console.log(tempItems)
        this.updateFeedHelper(tempItems);
    }


    addItem(e) { //enter value will add them into the items array 
        var validPerson = false;
        var recogId;
        
        if(this._recognition.value == "") {
            window.alert("Please enter your recognition");
        }

        console.log("ok");
        this.state.peopleInCompany.forEach(person => {
            if (person.value.name == this._recognized.value.name) {
                if (person.value.name != this.state.fullName) {
                    // console.log(person)
                    validPerson = true;
                    recogId = person.value.id;
                }
                else {
                    window.alert("Please don't recognize yourself");
                    return;
                }
            }
        });
       
        console.log(validPerson)
        if (validPerson) {
            if (this._recognition.value !== "") {
                // console.log(this._values)
                var newItem = {
                    companyID: parseInt(this.state.cid),
                    giverName: this.state.fullName,
                    receiverName: this._recognized.value.name,
                    giverID: parseInt(localStorage.getItem('employeeID')),
                    receiverID: this._recognized.value.id,
                    values: this._values,
                    message: this._recognition.value,
                    creationTime: new Date()

                };
                localStorage.setItem('test', JSON.stringify(newItem));
                console.log(newItem);
                var newNotifications = {
                    employeeId: this._recognized.value.id,
                    message: this._recognition.value
                };
                var id = String(this._recognized.value.id);
                var notificationPath = 'http://localhost:3001/notifications/'+id;
                
                axios.post('http://localhost:3001/postRec', newItem, { withCredentials: true })
                    .then((res) => {
                        this.updateFeed();
                        this._recognized.value = "";
                        this._recognition.value = "";
                        this._values.value = [];
                    });
                axios.post(notificationPath, newNotifications, { withCredentials: true })
                    .then((res) => {
                        this.Notifications();
                    });
            }
            console.log(":(");
            console.log(localStorage.getItem('test'));

            // this._recognized.value = "";
            // this._recognition.value = "";
            // this._values.value = [];
        }
        else {
            alert("Invalid Person to Recognize")
            console.log("invalid person")
            this._recognized.value = "";
            this._recognition.value = "";
            this._values.value = [];
        }
    }

    createTasks(item) { // Create element from item
        this.state.pic = <img class="profilePictures" src={item.profilePicURL}></img>
        this.state.recognizedName = item.recognized;
        this.state.v = item.values;
        console.log(this.state.v)
        console.log(item)
        return <Fade left>
                    <li key={item.key}>
                        <Container>
                            <Row className="postHeader" style={{ fontSize: "20px" }}>
                                <right>
                                    {this.state.pic}
                                    <strong> {this.state.recognizedName} </strong>
                                    received a recognition from
                                    <strong> {item.fullName}</strong>
                                </right>

                            </Row>

                            <div className='postLineH'></div>

                            <Card.Body>
                                <Card.Subtitle className="mb-2 text-muted">{this.state.v.join(' & ')}</Card.Subtitle>

                                <Card.Text className="commentArea">
                                    {item.text}
                                </Card.Text>
                            </Card.Body>

                            <div className='postLineH'></div>

                            <div className="postFooter">
                                <Row >
                                    &nbsp;
                                    <Col>
                                        <CommentButton comments={item.comments} recognitionID={item._id}/>
                                    </Col>

                                    <Col className="floatright">
                                        <right>
                                            <AwardsButton reactions={item.reactions} recognitionID={item._id} />
                                        </right>
                                    </Col>
                                </Row>
                            </div>
                        </Container>
                    </li>
                </Fade>
    }

    reOrder(state){
        if(curText == buttonText[0]){
          curText = buttonText[1];
        }
        else{
          curText = buttonText[0];
        }
        this.state.items.reverse();
        this.forceUpdate();
    }

    filterButton(){
        return <div  className = {this.state.showFilter? "visible":"hidden"}>
                    <Button
                    className = "filterB"
                    onClick={(event) => this.reOrder(event)}
                    content= {curText} 
                    /> 
                    
                </div>
        //  return< div >
        //             <Button
        //             // className = "filterB"
        //             onClick={(event) => this.reOrder(event)}
        //             content= {curText} 
        //             /> 
                    
        //         </div>
    }

    postList() {
        return this.state.items.map(this.createTasks)
    }

    handleChange = (e, { value }) => this.setState({ value })
    postArea() {
        return <div className="recognition">
            <form className="post" onSubmit={this.addItem}>
                <div>
                    
                    <Select
                        placeholder= "Person to be recognized..."
                        classNamePrefix="select"
                        components={{ DropdownIndicator:() => null, IndicatorSeparator:() => null, ClearIndicator:() => null}}
                        styles={colorStyle}
                        isSearchable={true}
                        defaultValue={this.state.peopleInCompany[0]}
                        isDisabled={false}
                        isLoading={false}
                        isClearable={true}
                        isRtl={false}
                        onChange={(event) => {console.log(event); this._recognized = event}}
                        name="people"
                        options={this.state.peopleInCompany} 
                    />
                </div>

                <div className='line'></div>


                <div className="recognitionFor" style={{ marginTop: "10px" }}>
                    <Select
                        isMulti
                        placeholder= "Core Values"
                        name="Core Values"
                        isSearchable={console.log(this.state.corevals)}
                        components={{ DropdownIndicator:() => null, IndicatorSeparator:() => null, ClearIndicator:() => null}}
                        onChange={(event) => {this._values = event.map(function (obj) {
                            return obj.label;
                          });}}
                        options={this.state.corevals}
                        classNamePrefix="select"
                        styles={colorStyle}
                        isRtl={false}
                    />
                </div>

              

                <div className='line'></div>

                <textarea className="box" ref={(a) => this._recognition = a}
                    placeholder="recognition">
                </textarea>

                <button type="submit" className = "squre" onClick={() => this.hideCVB("showCoreValue")}>
                    <PaperAirplaneIcon size={25} />
                </button>

                <div className ={this.state.showCoreValue? "visible":"hidden"} >
                    <CoreValuesButton/>
                </div>
            </form>
        </div>
    }

    showCVB(){
        if(this.state.showFilter === false)
            this.setState({ showFilter: true });
        else
            this.setState({ showFilter: false });
        
    }
    // hideCVB(){
    //     this.setState({ showFilter: false });
    // }

    filter(){
        const {showFilter} = this.state;
        return <div>
                    <button className = "owl" onClick={() => this.showCVB("showFilter")}>
                        <img src="https://img.icons8.com/cotton/40/000000/owl--v1.png"/>
                        <span className="owlMessage">filter?</span>
                    </button>
                    <form onSubmit={this.updateFeedSearch.bind(this)} className = {this.state.showFilter? "visible":"hidden"}>
                        <div className = "search">
                            <BiSearch />
                            <Select
                                components={{ DropdownIndicator:() => null, IndicatorSeparator:() => null }}
                                placeholder = "Search..."
                                isSearchable={this.state.peopleInCompany}
                                className="searchRecognitions"
                                defaultValue={this.state.peopleInCompany[0]}
                                isDisabled={false}
                                styles={searchStyle}
                                isClearable ={true}
                                isLoading={false}
                                isRtl={false}
                                isSearchable={true}
                                onChange={(event) => this.search = event }
                                name="people"
                                options={this.state.peopleInCompany} 
                            />
                        </div>
                    </form>

                    {this.filterButton()}
                </div>

    }

    render() {
        return (
            <div className='todoListMain'>
                 {this.filter()}
                {this.postArea()}
                
                <ul className="thisList">
                    {this.postList()}
                </ul>

            </div>

        )
    }
}