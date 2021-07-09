import React, { Component } from "react";
import axiosInstance from "../api/axiosAPI";
import background from "../Images/NYC.jpg";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../Images/silver-logic.png";
import { Link, Redirect } from 'react-router-dom';
import { setUser, getUser } from '../api/userInfo'
import "../CSS/login.css";


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {username: "", password: "", authed: false};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSubmitWThen = this.handleSubmitWThen.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    componentDidMount(){
        this.setState({
            authed: false
        })
    }

    handleSubmitWThen(event){
        event.preventDefault();
        axiosInstance.post('/token/obtain/', {
                username: this.state.username,
                password: this.state.password
            }).then(
                result => {
                    axiosInstance.defaults.headers['Authorization'] = "JWT " + result.data.access;
                    localStorage.setItem('access_token', result.data.access);
                    localStorage.setItem('refresh_token', result.data.refresh);
                }
            ).catch (error => {
                throw error;
            })
    }

    async handleSubmit(event) {
        event.preventDefault();
        try {
            const response = await axiosInstance.post('/token/obtain/', {
                username: this.state.username,
                password: this.state.password
            });
            axiosInstance.defaults.headers['Authorization'] = "JWT " + response.data.access;
            console.log(response.data.access)
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);
            localStorage.setItem('username', this.state.username)
            this.setState({authed: true})
            return response;
        } catch (error) {
            throw error;
        }
    }

    render() {
        if(!this.state.authed){
        return (
            <form className="" onSubmit={this.handleSubmit}>

            <h3 className="row justify-content-md-center">Log in</h3>

            <div className="form-group">
                <label>Username</label>
                <input onChange={this.handleChange} type="username" name="username" className="form-control" placeholder="Enter username" />
            </div>

            <div className="form-group">
                <label>Password</label>
                <input onChange={this.handleChange} type="password" name="password" className="form-control" placeholder="Enter password" />
            </div>

            <div className="form-group">
             <button type="submit" className="btn btn-primary">Sign in</button>   
            </div>
            <div className="form-group">
            <Link to="/signup">
            <button className="btn btn-primary">Create Account</button>   
            </Link>
            <Link to="/wall">
            <button className="btn btn-primary">Continue As Guest</button>   
            </Link>
            </div>
        </form>
        )}
        else {
            return(<Redirect to='/wall' />)
        }
    }
}
export default Login;