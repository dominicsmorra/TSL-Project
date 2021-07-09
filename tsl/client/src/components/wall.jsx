import React, { Component } from 'react';
import axios from 'axios'
import Footer from './footer'
import { Form, TextArea } from 'semantic-ui-react'
import { getUser } from '../api/userInfo'
import axiosInstance from '../api/axiosAPI'

import "bootstrap/dist/css/bootstrap.min.css";
import { Redirect } from 'react-router';


class Wall extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            posts: [],
            user: null,
            errors: {},
            entry: '',
            logout:false
         }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleLogout = this.handleLogout.bind(this);

    }

    async componentDidMount() {
        let posts = await axios.get(
            `http://localhost:8000/api/post/list`
          );
        console.log('Posts' + posts.data)
        posts = posts.data
        this.setState({ posts })
    }   

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    async handleLogout() {
        try {
            const response = await axiosInstance.post('/blacklist/', {
                "refresh_token": localStorage.getItem("refresh_token")
            });
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            localStorage.setItem('username', 'guest')
            axiosInstance.defaults.headers['Authorization'] = null;
            this.setState({ logout: true})
            return response;
        }
        catch (e) {
            console.log(e);
        }
    };

    async handleSubmit(event) {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/post/create/', {
               user: localStorage.getItem('username'),
               entry: this.state.entry
            });
        } catch (error) {
            console.log(error.stack);
            this.setState({
                errors:error.response.data
            });
        }
    }


    render() { 
        const posts = [...this.state.posts]
        console.log(localStorage)
        if(this.state.logout){
            return (
                <Redirect to='/logout'/>
            )
        } else {
        return ( <div>
            <nav className="navbar navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand">Welcome to The Wall!</a>
                <form className="d-flex">
                <button onClick={this.handleLogout} className="btn btn-outline-success">Logout</button>
                </form>
            </div>
            </nav>
            
            <div class="container">
            <div class="row">
            <div class="col">
            {posts.map( post => {
                return (
                    <div className="card border-primary mb-3" style={{ 'maxWidth': '50rem'}}>
                        <div className="card-header">{post.user}</div>
                        <div className="card-body text-primary">
                            <p className="card-text">{post.entry}</p>
                        </div>
                    </div>
                )
            })}
            </div>
            <div class="col">
            <form onSubmit={this.handleSubmit} className="mb-3">
                <label htmlFor="exampleFormControlTextarea1" className="form-label">Write A Post</label>
                <textarea onChange={this.handleChange} name='entry' className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                { this.state.errors.entry ? this.state.errors.entry : null}
                <button className="btn btn-primary">Post</button>               
            </form>
            </div>
            </div>
            </div>
            
        </div> ); }
    }
}
 
export default Wall;