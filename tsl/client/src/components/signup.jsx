import React, { Component } from "react";
import axiosInstance from "../api/axiosAPI";
import{ init } from 'emailjs-com';
import emailjs from 'emailjs-com';
import { Redirect } from 'react-router-dom'

init("user_hDVymPfuJzEjHaEjSGTt4");


class Signup extends Component{
    constructor(props){
        super(props);
        this.state = {
            username: "",
            password: "",
            email:"",
            errors:{},
            userCreated:false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    async handleSubmit(event) {
        event.preventDefault();
        try {
            const response = await axiosInstance.post('/user/create/', {
                username: this.state.username,
                email: this.state.email,
                password: this.state.password
            });
            emailjs.sendForm('service_qy5ajvh', 'template_80da36q', event.target, 'user_hDVymPfuJzEjHaEjSGTt4')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
            this.setState({userCreated:true})
            console.log(response)
            return response;
        } catch (error) {
            console.log(error.stack);
            this.setState({
                errors:error.response.data
            });
        }
    }

    render() {
        if(!this.state.userCreated){
            return (
                <div>
                    Signup
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            Username:
                            <input name="username" type="text" value={this.state.username} onChange={this.handleChange}/>
                            { this.state.errors.username ? this.state.errors.username : null}
                        </label>
                        <label>
                            Email:
                            <input name="email" type="email" value={this.state.email} onChange={this.handleChange}/>
                            { this.state.errors.email ? this.state.errors.email : null}
                        </label>
                        <label>
                            Password:
                            <input name="password" type="password" value={this.state.password} onChange={this.handleChange}/>
                            { this.state.errors.password ? this.state.errors.password : null}
                        </label>
                        <input type="submit" value="Submit"/>
                    </form>
                </div>
            )
        } else {
           return ( <Redirect to='/login' /> )
        }
    }
}

export default Signup;
