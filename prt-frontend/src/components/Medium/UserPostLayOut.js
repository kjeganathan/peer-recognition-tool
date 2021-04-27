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
import { BiSearch } from "react-icons/bi";
// import AwardsButton from "./AwardsButton";
import CoreValuesButton from "./CoreValuesButton";
import CommentButton from "../Small/CommentButton";
// import shrek from "../Other/shrek.jpeg";
// import p1 from "../Other/p1.jpg";
// import p2 from "../Other/p2.jpg";
// import p3 from "../Other/p3.jpg";
// import p4 from "../Other/p4.jpg";
// import marius from "../Other/marius.JPG";
// import gatsby from "../Other/gatsby.jpg";
// import profilePic from "./genericProfilePicture.jpeg";
import { CpuIcon, PaperAirplaneIcon, SquirrelIcon } from '@primer/octicons-react'
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Select from 'react-select';
import { Button } from 'semantic-ui-react'
const buttonText = { 0: "^ New to Old", 1: "V Old to New" }
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
    updateUsers(res, callback) {
        for (var i = 0; i < Object.keys(res.data).length; i++) {
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


    // updateUsers(res, callback) {
    //     for (var i = 0; i < Object.keys(res.data).length; i++) {
    //         res.data[i]["giver"] = this.getUserFromID(res.data[i]["reco"].giverID);

    //         res.data[i]["receiver"] = this.getUserFromID(res.data[i]["reco"].receiverID);
    //     }
    //     console.log(res.data[1]["giver"])
    // }

    peopleInCompany(res) {
        this.state.peopleInCompany = res.data
        console.log(this.state.peopleInCompany)
    }

    updateFeedHelper(res) {

        for (var i = 0; i < Object.keys(res).length; i++) {
            const recognition = res[i];
            console.log(recognition)
            var newItem = {
                fullName: recognition.giverName,
                recognized: recognition.receiverName,
                text: recognition.message,
                profilePicURL: "http://localhost:3001/profile-pics/" + recognition.receiverProfilePicURL
            };

            this.setState((prevState) => {
                return {
                    items: [newItem].concat(prevState.items)
                };
            });
        }
    }
    updateFeedSearch(event) {
        var rem = [{ giverName: "Jamel Spencer", receiverName: "Arron Garcia", message: "nice job" }]
        this.setState({ items: [] })

        axios.post('http://localhost:3001/lookupUser', { id: this.search.value.id }, { withCredentials: true })
            .then(function (res) { return this.updateFeedHelper(res.recognitionsReceived) });

        this.updateFeedHelper(rem);
        event.preventDefault();

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
        return <div>
        {/* <Fade left> */}
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
                                <CommentButton comments={item.comments} recognitionID={item._id} />
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
        {/* </Fade> */}
        </div>
    }

    showCVB() {
        this.setState({ showCoreValue: true });

    }
    hideCVB() {
        this.setState({ showCoreValue: false });
    }

    addToVal(event) {
        this._values = [];
        console.log(event)
        event.forEach(val => [this._values].concat(val.values));
        console.log(this._values)
    }

    reOrder(state) {
        if (curText == buttonText[0]) {
            curText = buttonText[1];
        }
        else {
            curText = buttonText[0];
        }
        this.state.items.reverse();
        this.forceUpdate();
    }

    filterButton() {
        return <div style={{ marginLeft: "55%", marginTop: "3%" }}>
            <Button
                onClick={(event) => this.reOrder(event)}
                content={curText}
            />
            <Select
                placeholder="Person to be recognized..."
                className="basic-single"
                classNamePrefix="select"
                isSearchable={true}
                name="people"
                defaultValue={this.state.peopleInCompany[0]}
                isDisabled={false}
                isLoading={false}
                isClearable={true}
                isRtl={false}
                onChange={(event) => this._recognized = event}
                options={this.state.peopleInCompany}
                maxMenuHeight={180}
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
                        components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                        // styles={colorStyle}
                        placeholder="Person to be recognized..."
                        className="basic-single"
                        classNamePrefix="select"
                        components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null, ClearIndicator: () => null, select__clearindicator: () => null }}
                        styles={customStyles}
                        isSearchable={true}
                        name="people"
                        defaultValue={this.state.peopleInCompany[0]}
                        isDisabled={false}
                        isLoading={false}
                        isClearable={true}
                        isRtl={false}
                        onChange={(event) => this._recognized = event}
                        options={this.state.peopleInCompany}
                        maxMenuHeight={180}
                    />
                </div>

                <div className='line'></div>


                <div className="recognitionFor" style={{ marginTop: "6px" }}>
                    <Select
                        isMulti
                        placeholder="Core Values"
                        name="Core Values"
                        isSearchable={true}
                        components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null, ClearIndicator: () => null, select__clearindicator: () => null }}
                        styles={customStyles}
                        onChange={(event) => this.addToVal(event)}
                        options={this.state.corevals}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        maxMenuHeight={130}
                    />
                </div>

                <div className='line'></div>

                <textarea className="box" ref={(a) => this._recognition = a}
                    placeholder="recognition"
                    onClick={() => this.showCVB("showCoreValue")}>
                </textarea>

                <button type="submit">
                    <PaperAirplaneIcon size={25} />
                </button>

                <div className={this.state.showCoreValue ? "visible" : "hidden"} >
                    <CoreValuesButton />
                </div>
            </form>
        </div>
    }




    render() {
        return (
            <div className='todoListMain'>
                {this.postArea()}
                <form onSubmit={this.updateFeedSearch.bind(this)}>
                    <div className="search">
                        <BiSearch />
                        <Select
                            components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                            placeholder="Search..."
                            isSearchable={this.state.peopleInCompany}
                            className="searchRecognitions"
                            defaultValue={this.state.peopleInCompany[0]}
                            isDisabled={false}
                            // styles={searchStyle}
                            isClearable={true}
                            isLoading={false}
                            isRtl={false}
                            isSearchable={true}
                            onChange={(event) => this.search = event}
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