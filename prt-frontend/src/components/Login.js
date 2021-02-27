
import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Login.css";

export default class Login extends Component{
  contructor(props){
      this.state = {
          username: "",
          password: ""
      }
  }
    handleSubmit(event) {
        /*event.preventDefault();*/
  }

    render(){
        return (
            <div className="Login">
                <h1>Login</h1>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group size="lg" controlId="username">
                    <Form.Control
                        type="Username"
                        placeholder = "Username"
                        value={this.username}
                        onChange={(user) => this.setState({username: user})}
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

