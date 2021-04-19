import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import "./register.css";

import Spinner from "../../component/spinner";
import AuthService from "../../services/auth.service";

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-waning" role="alert">
        This field is required!
      </div>
    );
  }
};

const vemail = value => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-waning" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vusername = value => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-waning" role="alert">
        The username must be between<br />3 and 20 characters.
      </div>
    );
  }
};

const vpassword = value => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-waning" role="alert">
        The password must be between<br />6 and 40 characters.
      </div>
    );
  }
};

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this);
    this.onConfirmPassword = this.onConfirmPassword.bind(this);

    this.state = {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      successful: false,
      message: "",
      loading: false
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  onChangeConfirmPassword(e) {
    this.setState({
      confirmPassword: e.target.value
    });
  }

  onConfirmPassword() {
    if (this.state.password !== this.state.confirmPassword) {
      return (
        <div className="alert alert-waning" role="alert">
          The password doesn't match.
        </div>
      );
    }
  }

  handleRegister(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.register(
        this.state.username,
        this.state.email,
        this.state.password
      ).then(
        response => {
          this.setState({
            message: response.data.message,
            successful: true,
            loading: true
          });

          this.props.history.push("/login");
          window.location.reload();
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            successful: false,
            message: resMessage
          });
        }
      );
    }
  }

  render() {
    return (
      <div>
        <div className="header">
          <i className="far fa-calendar-check" style={{fontSize: "80px"}}></i>&nbsp;&nbsp;TODONA
          <br /><hr />
        </div>
        <Form className="box"
          onSubmit={this.handleRegister}
          ref={c => {
            this.form = c;
          }}
        >
          {!this.state.successful && (
            <div>
              <h1>Register</h1>
              <br /><hr /><br /><br />
              <div className="form-group">
                <label>Username</label>
                <label type="required">*</label>
                <Input
                  type="text"
                  placeholder="Username"
                  name="username"
                  value={this.state.username}
                  onChange={this.onChangeUsername}
                  validations={[required, vusername]}
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <label type="required">*</label>
                <Input
                  type="text"
                  placeholder="Email"
                  name="email"
                  value={this.state.email}
                  onChange={this.onChangeEmail}
                  validations={[required, vemail]}
                />
              </div>

              <div className="form-group">
                <label>Password</label>
                <label type="required">*</label>
                <Input
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={this.state.password}
                  onChange={this.onChangePassword}
                  validations={[required, vpassword]}
                />
              </div>

              <div className="form-group">
                <label>Confirm Password</label>
                <label type="required">*</label>
                <Input
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={this.state.confirmPassword}
                  onChange={this.onChangeConfirmPassword}
                  validations={[required, this.onConfirmPassword]}
                />
              </div>

              <br />
              {this.state.message && (
                <div className="form-group">
                  <div
                    className={
                      this.state.successful
                        ? "alert alert-success"
                        : "alert alert-danger"
                    }
                    role="alert"
                  >
                    {this.state.message}
                  </div>
                </div>
              )}

              { this.state.loading ? (
                <Spinner />
              ) : (
                <div className="form-group">
                    <div className="form-group">
                      <button className="btn btn-primary btn-block">Sign Up</button>
                    </div>
                </div>
              )}

              <div className="link-page">
                Have an account ? 
                <Link to="/login" className="brand">Sign in</Link>
              </div>
            </div>
          )}

          <CheckButton
            style={{ display: "none" }}
            ref={c => {
              this.checkBtn = c;
            }}
          />
        </Form>
      </div>
    );
  }
}