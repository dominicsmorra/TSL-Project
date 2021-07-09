import { Component } from "react";
class Logout extends Component {
  componentDidMount() {
    window.location.href = "/";
    console.log("Logging out!!");
  }

  render() {
    return null;
  }
}

export default Logout;
