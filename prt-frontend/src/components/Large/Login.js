import React, { Component} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from 'axios';
import "./Login.css";
import ReactDOM from 'react-dom';

export default class Login extends Component{
    constructor(props){ {/* assign initial state */}
        super(props);
        this.state = {
          username: "",
          password: "",
      }
    }

    handleSubmit(event){
        event.preventDefault();
        axios.post('http://localhost:3001/login', this.state, {withCredentials: true}) //post login request to /login
            .then((res) => this.successfulLogin(res))
            .catch((err) => this.failedLogin(err)); 
        
    }

    successfulLogin(res){
        // localStorage.setItem('username', this.state.username)
        this.props.history.push({
            pathname: 'home',
            state: {
                username: res.data.user.firstName+" "+res.data.user.lastName
            }
        })
        this.props.history.push('/home')
    }
    
    failedLogin(res){
        var text = document.getElementsByTagName("p1");
        text[0].innerHTML = "Incorrect username or password";
        ReactDOM.findDOMNode(this.loginForm).reset();
    }

    render(){
        return (
            <div className="Login">
                <h1>Login</h1>
                <p1></p1>
                <Form id='login'
                    ref={ login => this.loginForm = login }
                    onSubmit={this.handleSubmit.bind(this)}
                    action = "UserPostLayOut.js">       
                    <Form.Group size="lg" controlId="username">
                    <Form.Control
                        type="Username"
                        placeholder = "Username"
                        value = {this.username}
                        onChange={(user) => this.setState({username: user.target.value})}
                    />
                    </Form.Group>
                    <Form.Group size="lg" controlId="password">
                    <Form.Control
                        type="Password"
                        placeholder = "Password"
                        value={this.password}
                        onChange={(pass) => this.setState({password: pass.target.value})}
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

