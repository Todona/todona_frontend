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
        data => authentication.getLogInStatus() ? (
          <props.component /> ) : (
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
          <SecureRoute path="/" component={container.TodoPage} />
          <SecureRoute path="/done" component={container.DonePage} />
          <SecureRoute path="/contact" component={container.ContactPage} />
          <SecureRoute path="/create" component={container.CreatePage} />
          <SecureRoute path="/edit/:id" component={container.EditPage} />
        </Switch>
      </Router>
    </div>
  );
}