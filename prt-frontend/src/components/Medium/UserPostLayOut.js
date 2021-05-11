import React, { Component } from "react";
import "./UserPostLayOut.css";
import { BiSearch } from "react-icons/bi";
import CoreValuesButton from "./CoreValuesButton";
import Feed from "../Medium/Feed";
import RecognitionForm from "../Medium/RecognitionForm";
import { CpuIcon, PaperAirplaneIcon, SquirrelIcon } from '@primer/octicons-react'
import axios from 'axios';
import Select from 'react-select';
import { Button } from 'semantic-ui-react'
import Dropdown from "react-bootstrap/Dropdown";
import Helpers from "../../helpers.js"

export default class UserPostLayOut extends Component {
    constructor(props) {
        super(props);

        
        this.state = {
            // username: localStorage.getItem('username'), //call username from localstorage
            // fullName: localStorage.getItem('fullName'),
            // cid: localStorage.getItem('cid'),
            // employeeID: localStorage.getItem('employeeID'),
            company: null,
            recognition: '',
            items: [], //the empty array is for getting the input from the textarea
            peopleInCompany: [],
            corevals: [],
            pic: '',
            recognizedName: '',
            selectedItems: {},
        };
        
        console.log(this.state.peopleInCompany)
        axios.get('http://localhost:3001/getPeople', { withCredentials: true })
        .then((res) => this.setState({ peopleInCompany: res.data }));
        
        axios.get('http://localhost:3001/getCoreValues', { withCredentials: true })
        .then((res) => this.setState({ corevals: res.data }));
    }
    
    async componentDidMount() {
        console.log("cid: " + localStorage.getItem("cid"));

        const company = await Helpers.getWithParameters(
            "http://localhost:3001/companies",
            {companyID: localStorage.getItem("cid")},
            true
        );

        this.setState({company: company._id});
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

    peopleInCompany(res) {
        this.state.peopleInCompany = res.data
        console.log(this.state.peopleInCompany)
    }

    updateFeedHelper(res) {
        var itemsList = [];
        for (var i = 0; i < Object.keys(res).length; i++) {
            const recognition = res[i];
            var newItem = {
                _id: recognition._id,
                fullName: recognition.giverName,
                recognized: recognition.receiverName,
                text: recognition.message,
                comments: recognition.comments || [],
                // reactions: { ...DEFAULT_REACTIONS, ...recognition.reactions },
                profilePicURL: "http://localhost:3001/profile-pics/" + recognition.receiverProfilePicURL
            };
            itemsList.push(newItem)
        }
        this.setState({ items: itemsList.reverse() });
    }

    // updateFeedSearch(event) {
    //     event.preventDefault();

    //     var rem = [{ giverName: "Jamel Spencer", receiverName: "Arron Garcia", message: "nice job" }]
    //     var curItems = [];
    //     var search = this.search.label;
    //     console.log(search)
    //     var tempItems = []
    //     axios.get("http://localhost:3001/recogs", { withCredentials: true })
    //         .then(res => this.searchUpdate(res.data));
    // }

    // searchUpdate(recogs) {
    //     var curItems = recogs;
    //     var search = this.search.label;
    //     console.log(search)
    //     var tempItems = []
    //     console.log(curItems);
    //     for (var i = 0; i < curItems.length; i++) {
    //         if (curItems[i].giverName == search || curItems[i].recognizedName == search) {
    //             tempItems.push(curItems[i]);
    //         }
    //     }
    //     console.log(tempItems)
    //     this.updateFeedHelper(tempItems);
    // }

    // reOrder(state) {
    //     if (curText == buttonText[0]) {
    //         curText = buttonText[1];
    //     }
    //     else {
    //         curText = buttonText[0];
    //     }
    //     this.state.items.reverse();
    //     this.forceUpdate();
    // }

    // filterButton() {
    //     return <div style={{ marginLeft: "55%", marginTop: "3%" }}>
    //         <Button
    //             onClick={(event) => this.reOrder(event)}
    //             content={curText}
    //         />

    //     </div>
    // }

    // postArea() {
    //     return <div className="recognition">
    //         <form className="post" onSubmit={this.addItem}>
    //             <div>

    //                 <Select
    //                     placeholder="Person to be recognized..."
    //                     className="basic-single"
    //                     classNamePrefix="select"
    //                     components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null, ClearIndicator: () => null, select__clearindicator: () => null }}
    //                     styles={colorStyle}
    //                     isSearchable={true}
    //                     className="basic-single"
    //                     classNamePrefix="select"
    //                     defaultValue={this.state.peopleInCompany[0]}
    //                     isDisabled={false}
    //                     isLoading={false}
    //                     isClearable={true}
    //                     isRtl={false}
    //                     onChange={(event) => this._recognized = event}
    //                     isSearchable={true}
    //                     name="people"
    //                     options={this.state.peopleInCompany}
    //                 />
    //             </div>

    //             <div className='line'></div>


    //             <div className="recognitionFor" style={{ marginTop: "10px" }}>
    //                 <Select
    //                     isMulti
    //                     placeholder="Core Values"
    //                     name="Core Values"
    //                     isSearchable={console.log(this.state.corevals)}
    //                     components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null, ClearIndicator: () => null, select__clearindicator: () => null }}
    //                     onChange={(event) => this._values = event}
    //                     options={this.state.corevals}
    //                     className="basic-multi-select"
    //                     classNamePrefix="select"
    //                     styles={colorStyle}
    //                 />
    //             </div>

    //             <div className='line'></div>

    //             <textarea className="box" ref={(a) => this._recognition = a}
    //                 placeholder="recognition">
    //             </textarea>

    //             <button type="submit" className="squre" onClick={() => this.hideCVB("showCoreValue")}>
    //                 <PaperAirplaneIcon size={25} />
    //             </button>

    //             <div className={this.state.showCoreValue ? "visible" : "hidden"} >
    //                 <CoreValuesButton />
    //             </div>
    //         </form>
    //     </div>
    // }

    render() {
        return (
            <>
                {/* <div className='todoListMain'> */}
                <RecognitionForm />
                {/* {this.postArea()} */}
                {/* <form onSubmit={this.updateFeedSearch.bind(this)}> */}
                {/* <div className="search">
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

                </div> */}
                {/* </form> */}

                {/* {this.filterButton()} */}
                <Feed
                    company={this.state.company}
                />
                {/* </div> */}
            </>

        )
    }
}