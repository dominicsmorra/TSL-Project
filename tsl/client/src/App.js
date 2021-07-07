import React, { Component} from "react";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from "./components/login";
import Signup from "./components/signup";
import Wall from "./components/wall";

class App extends Component {
    render() {
        return (
            <div className="site">
              <BrowserRouter>
                  <Switch>
                      <Route exact path={"/login"} component={Login}/>
                      <Route exact path={"/signup/"} component={Signup}/>
                      <Route exact path={"/wall/"} component={Wall}/>
                      <Route path={"/"} render={() => <div>Home again</div>}/>
                  </Switch>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;