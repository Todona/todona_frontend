import React from "react";
import Navbar from "./component/navbar";
import "./App.css"
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import container from "./container";
import AuthService from './services/auth.service'

const authentication={
  getLogInStatus() {
    return AuthService.getCurrentUser();
  }
}

function SecureRoute(props) {
  return(
    <Route path={props.path} 
      render = {
        data => authentication.getLogInStatus(data) ? (
          <props.component {...data}></props.component> ) : (
          <Redirect to={{pathname: '/login'}}></Redirect>
        )
      }>
    </Route>
    )
}

export default function App()  {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/login" component={container.LoginPage} />
          <Route exact path="/register" component={container.RegisterPage} />
          <SecureRoute exact path={"/"} component={container.TodoPage} />
          <SecureRoute exact path={"/done"} component={container.DonePage} />
          <SecureRoute exact path={"/contact"} component={container.ContactPage} />
          <SecureRoute exact path={"/create"} component={container.CreatePage} />
          <SecureRoute exact path={"/edit/:id"} component={container.EditPage} />
          <Route path="*" component={()=> "404 NOT FOUND"} />
        </Switch>
      </Router>
    </div>
  );
}