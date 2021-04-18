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

function ProtectedRoute(props) {
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

function ProtectedLogin(props) {
  return(
    <Route path={props.path} 
      render = {
        data => !authentication.getLogInStatus(data) ? (
          <props.component {...data}></props.component> ) : (
          <Redirect to={{pathname: '/'}}></Redirect>
        )
      }>
    </Route>
    )
}

export default function App()  {
  return (
    <div className="App">
      <Router>
        <Switch>
          <ProtectedLogin exact path="/login" component={container.LoginPage} />
          <ProtectedLogin exact path="/register" component={container.RegisterPage} />
          <ProtectedLogin exact path="/verify-email" component={container.VerifyEmailPage} />
          <ProtectedRoute exact path={"/"} component={container.TodoPage} />
          <ProtectedRoute exact path={"/done"} component={container.DonePage} />
          <ProtectedRoute exact path={"/contact"} component={container.ContactPage} />
          <ProtectedRoute exact path={"/create"} component={container.CreatePage} />
          <ProtectedRoute exact path={"/edit/:id"} component={container.EditPage} />
          <Redirect to="/" />
          {/* <Route path="*" component={()=> "404 NOT FOUND"} /> */}
        </Switch>
        <Navbar />
      </Router>
    </div>
  );
}