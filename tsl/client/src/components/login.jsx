import React, { Component } from "react";
import axiosInstance from "../api/axiosAPI";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, Redirect } from 'react-router-dom';
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
            <div>
            <nav className="navbar navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand">The Wall Awaits...</a>
                <form className="d-flex">
                <Link to="/signup">
                <button className="btn btn-outline-success">Create Account</button>   
                </Link>
                <Link to="/wall">
                <button className="btn btn-outline-success">Continue As Guest</button>   
                </Link>                </form>
            </div>
            </nav>
            <h1 class="display-1">The Wall App</h1>

            <form onSubmit={this.handleSubmit} style={{'marginLeft': '25%', 'marginRight': '25%', 'marginTop': '17%'}}>
                <p style={{'marginLeft': '5%', 'marginTop': '6%'}} className="h1">Login</p>
                <div class="input-group mb-3">
                <input type="text" onChange={this.handleChange} name='username' class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1"/>
               
                </div>

                <div class="input-group mb-3">
                
                <input type="text" onChange={this.handleChange} type='password' name='password'  class="form-control" placeholder="Password" aria-label="Password" aria-describedby="basic-addon1"/>
                </div>
                <button type="submit" class="btn btn-primary">Login</button>
                </form>
                
            </div>
        )}
        else {
            return(<Redirect to='/wall' />)
        }
    }
}
export default Login;