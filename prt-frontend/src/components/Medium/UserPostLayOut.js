//this file is where the program disply the input common on the screen
//file include the area text bar and the submit button at the buttom right corner
//flip move is a animation libary under react

//this file using a empty array take all the input and assign them a unique key
//using the items.map(this.createTasks), map take the element from items one by one and pass into createTasks(item)
//createTasks(item) this function will retuen one by one base the the unique key
import React, { Component } from "react";
// import FlipMove from "react-flip-move";
import "./UserPostLayOut.css";
import { DEFAULT_REACTIONS, AwardsButton } from "./AwardsButton";
import { BiSearch} from "react-icons/bi";
import CoreValuesButton from "./CoreValuesButton";
import CommentButton from "../Small/CommentButton";
import shrek from "../Other/shrek.jpeg";
import p1 from "../Other/p1.jpg";
import p2 from "../Other/p2.jpg";
import p3 from "../Other/p3.jpg";
import p4 from "../Other/p4.jpg";
import marius from "../Other/marius.JPG";
import gatsby from "../Other/gatsby.jpg";
import profilePic from "./genericProfilePicture.jpeg";
import { CpuIcon, PaperAirplaneIcon, SquirrelIcon } from '@primer/octicons-react'
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Select from 'react-select';
import Fade from 'react-reveal/Fade'; //fade animation
import { Button } from 'semantic-ui-react'
const colorStyle={
    control: style => ({backgroundColor: 'rgb(210, 252, 255)', width: '93%', height: '30px',margin: '5px'})
}
const searchStyle={
    control: style => ({height: '35px',backgroundColor:'white', borderRadius:'5px',  boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)"})
}

const buttonText = {0:"^ New to Old", 1:"V Old to New"}
var curText = "^ New to Old"

const customStyles = {
    control: (base, state) => ({
    //   ...base,
      background: "rgb(210, 252, 255)",
      height: '30px',
      width: '93%',
      // match with the menu
      borderRadius: state.isFocused ? "3px 3px 0 0" : 3,
    }),
    menu: base => ({
      ...base,
      // override border radius to match the box
      borderRadius: 0,
      // kill the gap
      marginTop: '5px',
    }),
    menuList: base => ({
        ...base,
        // kill the white space on first and last option
        padding: 0,
      })
  };
  
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
            selectedItems: {}
        };
        console.log(this.state.peopleInCompany)
        this.addItem = this.addItem.bind(this);
        this.createTasks = this.createTasks.bind(this);
        axios.get('http://localhost:3001/getPeople', { withCredentials: true })
            .then((res) => this.setState({ peopleInCompany: res.data }));
        
        axios.get('http://localhost:3001/getCoreValues', { withCredentials: true })
            .then((res) => this.setState({ corevals: res.data }));
    }

   /* componentWillMount() {
        axios.get('http://localhost:3001/getPeople', { withCredentials: true })
            .then((res) => this.setState({ peopleInCompany: res.data }));
        
        axios.get('http://localhost:3001/getCoreValues', { withCredentials: true })
            .then((res) => this.setState({ corevals: res.data }));
    }*/

    componentDidMount() {
        this.updateFeed();
    }

    updateFeed() {
        axios.get("http://localhost:3001/recogs", { withCredentials: true })
            .then(res => this.updateFeedHelper(res.data));
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
                profilePicURL: "http://localhost:3001/profile-pics/" + recognition.receiverProfilePicURL
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
        this.state.peopleInCompany.forEach(person => {
            if (person.value.name == this._recognized.value.name) {
                if (person.value.name != this.state.fullName) {
                    console.log(person)
                    validPerson = true;
                    recogId = person.value.id;
                }
            }
        });
        console.log(validPerson)
        if (validPerson) {
            console.log(this._recognized.value);
            if (this._recognition.value !== "") {
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
                console.log(newItem);
                axios.post('http://localhost:3001/postRec', newItem, { withCredentials: true })
                    .then((res) => {
                        console.log(res.data);
                        this.updateFeed();
                    });
            }

            this._recognized.value = "";
            this._recognition.value = "";
            this._values.value = [];
           //e.preventDefault(); //prevent refreash page
        }
        else {
            console.log("invalid person")
            this._recognized.value = "";
            this._recognition.value = "";
            this._values.value = [];
        }
    }

    createTasks(item) { // Create element from item
        this.state.pic = <img class="profilePictures" src={item.profilePicURL}></img>
        this.state.recognizedName = item.recognized;
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
                                <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>

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
        return <div style={{marginLeft: "55%", marginTop: "3%"}}>
                    <Button
                    onClick={(event) => this.reOrder(event)}
                    content= {curText} 
                    /> 
                    
                </div>
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
                        className="basic-single"
                        classNamePrefix="select"
                        components={{ DropdownIndicator:() => null, IndicatorSeparator:() => null, ClearIndicator:() => null, select__clearindicator:() => null}}
                        styles={colorStyle}
                        isSearchable={true}
                        className="basic-single"
                        classNamePrefix="select"
                        defaultValue={this.state.peopleInCompany[0]}
                        isDisabled={false}
                        isLoading={false}
                        isClearable={true}
                        isRtl={false}
                        onChange={(event) => this._recognized = event}
                        isSearchable={true}
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
                    components={{ DropdownIndicator:() => null, IndicatorSeparator:() => null, ClearIndicator:() => null, select__clearindicator:() => null}}
                    onChange={(event) => this._values = event}
                    options={this.state.corevals}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    styles={colorStyle}
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




    render() {
        return (
            <div className='todoListMain'>
                {this.postArea()}
                <form onSubmit={this.updateFeedSearch.bind(this)}>
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
                <ul className="thisList">
                    {this.postList()}
                </ul>

            </div>

        )
    }
}