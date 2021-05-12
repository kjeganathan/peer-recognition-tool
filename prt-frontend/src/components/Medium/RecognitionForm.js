import React, { Component } from "react";
import Helpers from "../../helpers.js";
import routeNames from "../../routeNames.js";
import Container from "react-bootstrap/Container";
import Select from "react-select";
import SearchBox from "../Medium/SearchBox"

export default class RecognitionForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            company: props.company,
            // employees: [
            //     {
            //         value: "blue",
            //         label: "Blue"
            //     }, {
            //         value: "green",
            //         label: "Green"
            //     }, {
            //         value: "red",
            //         label: "Red"
            //     }
            // ]
            user: props.user,
            employees: []
        }
    }

    async componentDidMount() {
        var employees = await Helpers.getWithParameters(
            routeNames.employees,
            { companyID: this.state.company._id },
            true
        );

        employees = employees.map(employee => {
            return(
                {
                    value: employee,
                    label: Helpers.fullName(employee)
                }
            );
        });

        this.setState(
            {
                employees: employees
            }
        );
    }

    render() {
        return (
            <Container className="recognition recognition-form">
                {/* <SearchBox
                    placeholder="Recipient"
                /> */}
                <Select
                    placeholder="Recipient"
                    className="basic-single"
                    classNamePrefix="select"
                    isSearchable={true}
                    defaultValue={this.state.employees[0]}
                    isDisabled={false}
                    isLoading={false}
                    isClearable={true}
                    isRtl={false}
                    options={this.state.employees}
                />
                <textarea
                    rows="4"
                />
            </Container>
        );
    }
}