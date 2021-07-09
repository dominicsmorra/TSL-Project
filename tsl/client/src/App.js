import React, { Component} from "react";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from "./components/login";
import Signup from "./components/signup";
import Wall from "./components/wall";
import Logout from "./components/logout";

import axiosInstance from './api/axiosAPI'

class App extends Component {

    render() {
        return (
            <div className="site">
              <BrowserRouter>
                  <Switch>
                      <Route exact path={"/login"} component={Login}/>
                      <Route exact path={"/signup"} component={Signup}/>
                      <Route exact path={"/wall"} component={Wall}/>
                      <Route exact path={"/logout"} component={Logout}/>
                      <Route path={"/"} render={() => <div>Wrong URL</div>}/>

                  </Switch>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;