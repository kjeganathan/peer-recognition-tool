import React, { Component } from "react";
import Helpers from "../../helpers.js";
import routeNames from "../../routeNames.js";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from 'axios';
import ReactDOM from 'react-dom';
import "./Login.css";

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        axios.post('http://localhost:3001/login', this.state, { withCredentials: true }) //post login request to /login
            .then((res) => this.successfulLogin(res))
            .catch((err) => this.failedLogin(err));
    }

    async successfulLogin(res) {
        var debug = "successfulLogin()";

        const user = res.data.user;
        debug += "\n\nuser: " + JSON.stringify(user, null, 4);

        const company = await Helpers.getWithParameters(
            routeNames.companies,
            { companyID: localStorage.getItem("cid") },
            true
        );

        const props = {
            user: user,
            company: company
        }


        var pathName = '';
        // console.log(res.data.user.isManager);
        // if (res.data.user.isManager) {
        //     pathName = 'homemanager';
        //     console.log("HOME MANAGER");
        // } else {
        pathName = 'home';
        // console.log("HOME");
        // }
        // this.props.history.push({
        // pathname: pathName,
        // state: {
        //     fullName: localStorage.getItem('fullName'),
        //     position: localStorage.getItem('position'),
        //     email: localStorage.getItem('email'),
        //     company: localStorage.getItem('company'),
        //     startData: localStorage.getItem('startData')
        // }
        // })
        this.props.history.push(
            {
                pathname: pathName,
                state: props
            }
        );
    }

    failedLogin(res) {
        var text = document.getElementsByTagName("p1");
        text[0].innerHTML = "Incorrect username or password";
        ReactDOM.findDOMNode(this.loginForm).reset();
    }

    render() {
        return (
            <div className="Login">
                <h1>Login</h1>
                <p1></p1>
                <Form id='login'
                    ref={login => this.loginForm = login}
                    onSubmit={this.handleSubmit.bind(this)}>
                    <Form.Group size="lg" controlId="username">
                        <Form.Control
                            type="Username"
                            placeholder="Username"
                            value={this.username}
                            onChange={(user) => this.setState({ username: user.target.value })}
                        />
                    </Form.Group>
                    <Form.Group size="lg" controlId="password">
                        <Form.Control
                            type="Password"
                            placeholder="Password"
                            value={this.password}
                            onChange={(pass) => this.setState({ password: pass.target.value })}
                        />
                    </Form.Group>
                    <Button block size="lg" type="submit" bsClass='custom-button'>
                        Login
                    </Button>
                </Form>
            </div>
        );
    }
}