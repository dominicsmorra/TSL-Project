import React, { Component } from 'react';
import axios from 'axios'
import Footer from './footer'
import { Form, TextArea } from 'semantic-ui-react'
import axiosInstance from '../api/axiosAPI'

import "bootstrap/dist/css/bootstrap.min.css";
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';


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

    }

    async componentDidMount() {
        let posts = await axios.get(
            `http://localhost:8000/api/post/list`
          );
        console.log('Posts' + posts.data)
        posts = posts.data
        this.setState({ posts: posts, user: localStorage.getItem('username') })
        
        
    }   

    // async componentDidUpdate() {
    //     let posts = await axios.get(
    //         `http://localhost:8000/api/post/list`
    //       );
    //     console.log('Posts' + posts.data)
    //     posts = posts.data
    //     this.setState({ posts: posts, user: localStorage.getItem('username') })
        
        
    // }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    async handleSubmit(event) {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/post/create/', {
               user: localStorage.getItem('username'),
               entry: this.state.entry
            });
            this.setState({ entry: '' })
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
        console.log(this.state.user)
        return ( <div>
            <nav className="navbar navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand">Welcome to The Wall!</a>
                <form className="d-flex">
                {this.state.user != 'guest' ? 
                (<Link to='/logout' >
                <button className="btn btn-outline-success">Logout</button>
                </Link>) :  (<Link to='/login' >
                <button className="btn btn-outline-success">Login</button>
                </Link>)}
                </form>
            </div>
            </nav>
            
            <div class="container">
            <div class="row">
            <div data-bs-spy class="col">
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
                <label htmlFor="exampleFormControlTextarea1" className="form-label">Write A Post (Logged In Users Only)</label>
                <textarea disabled={this.state.user === 'guest'} onChange={this.handleChange} name='entry' className="form-control" id="exampleFormControlTextarea1" rows="25" value={this.state.entry}></textarea>
                { this.state.errors.entry ? this.state.errors.entry : null}
                <button disabled={this.state.user === 'guest'}  className="btn btn-primary">Post</button>               
            </form>
            </div>
            </div>
            </div>
            
        </div> );
    }
}
 
export default Wall;