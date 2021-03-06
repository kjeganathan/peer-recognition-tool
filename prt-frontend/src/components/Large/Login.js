
import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from 'axios';
import "./Login.css";

export default class Login extends Component{
    state = this.state
    contructor(props){
      this.state = {
          username: "",
          password: ""
      }
    }
    state = this.state
    handleSubmit(event){
        event.preventDefault();
        console.log(this.state)
        axios.post('http://localhost:3001/home', this.state)
            .then(res => this.changeStuff(res));
    }

    changeStuff(res){
        var text = document.getElementsByTagName("p1")
        console.log(res)
        text[0].innerHTML = res.data.username
    }

    render(){
        return (
            <div className="Login">
                <h1>Login</h1>
                <p1></p1>
                <Form onSubmit={this.handleSubmit.bind(this)}>
                    <Form.Group size="lg" controlId="username">
                    <Form.Control
                        type="Username"
                        placeholder = "Username"
                        value={this.username}
                        onChange={ event => this.setState({username: event.target.value})}
                    />
                    </Form.Group>
                    <Form.Group size="lg" controlId="password">
                    <Form.Control
                        type="Password"
                        placeholder = "Password"
                        value={this.password}
                        onChange={(pass) => this.setState({password: pass})}
                    />
                    </Form.Group>
                    <Button block size="lg" type="submit"  bsClass='custom-button'>
                    Login
                    </Button>
                </Form>
            </div>
      );
    }

}

