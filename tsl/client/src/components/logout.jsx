import { Component } from "react";
import axiosInstance from '../api/axiosAPI'

class Logout extends Component {
 async componentDidMount() {
    console.log("Logging out!!");
    try {
        const response = await axiosInstance.post('/blacklist/', {
            "refresh_token": localStorage.getItem("refresh_token")
        });
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.setItem('username', 'guest')
        axiosInstance.defaults.headers['Authorization'] = null;
        this.setState({ logout: true})
    }
    catch (e) {
        console.log(e);
    }
    window.location.href = "/login";

  }

  render() {
    return null;
  }
}

export default Logout;
