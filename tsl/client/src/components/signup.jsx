import React, { Component } from "react";
import axiosInstance from "../api/axiosAPI";
import emailjs from 'emailjs-com';
import { Redirect, Link } from 'react-router-dom'



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
                <nav className="navbar navbar-light bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand">The Wall Awaits...</a>
                    <form className="d-flex">
                    
                     <Link to='/login' >
                    <button className="btn btn-outline-success">Login</button>
                    </Link>
                    </form>
                </div>
                </nav>
                <form onSubmit={this.handleSubmit} style={{'marginLeft': '25%', 'marginRight': '25%', 'marginTop': '17%'}}>
                <p style={{'marginLeft': '5%', 'marginTop': '6%'}} className="h1">Create A User</p>
                <div class="input-group mb-3">
                <input type="text" onChange={this.handleChange} name='username' class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1"/>
                { this.state.errors.username ? this.state.errors.username : null}
                </div>

                <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1">@</span>
                <input type="text" onChange={this.handleChange} name='email' type='email' class="form-control" placeholder="Email" aria-label="Email" aria-describedby="basic-addon1"/>
                { this.state.errors.email ? this.state.errors.email : null}
                </div>


                <div class="input-group mb-3">
                
                <input type="text" onChange={this.handleChange} type='password' name='password'  class="form-control" placeholder="Password" aria-label="Password" aria-describedby="basic-addon1"/>
                { this.state.errors.password ? this.state.errors.password : null}
                </div>
                <button type="submit" class="btn btn-primary">Create Account</button>
                </form>
                </div>
            )

        } else {
           return ( <Redirect to='/login' /> )
        }
    }
}

export default Signup;
