import React, { useState, useEffect } from 'react';
import { Link, useHistory } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import "./register.css";
import useFullPageLoader from "../../hooks/useFullPageLoader";

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

const Register= () => {
  const [form, setForm] = useState();
  const [checkBtn, setCheckBtn] = useState();
  const history = useHistory();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [successful, setSuccess] = useState(false);
  const [message, setMessage] = useState("");

  const [loader, showLoader, hideLoader] = useFullPageLoader();

  const setState = (message) => {
    setSuccess(false);
    setMessage(message);
  }

  const onChangeUsername = (e) => {
    setUserName(e.target.value);
    setState("");
  }

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
    setState("");
  }

  const onChangePassword = async (e) => {
    await setPassword(e.target.value);
    setState("");
  }

  const onChangeConfirmPassword = async (e) => {
    await setConfirmPassword(e.target.value);
    setState("");
  }

  const onConfirmPassword = (e) => {
    if (password !== confirmPassword) {
      return (
        <div className="alert alert-waning" role="alert">
          The password doesn't match.
        </div>
      );
    }
  }

  const handleRegister = async (e) => {
    e.preventDefault();

    setState("");
    await form.validateAll();
    showLoader();

    if (checkBtn.context._errors.length === 0) {
      AuthService.register(
        username,
        email,
        password
      ).then(
        response => {
          setMessage(response.data.message);
          setSuccess(true);

          history.push("/login");
          window.location.reload();
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setState(resMessage);
        }
      ).then(() => {
        hideLoader();
      });
    } else {
      hideLoader();
    }
  }
  
  return (
    <>
      <div className="header">
        <i className="far fa-calendar-check" style={{fontSize: "80px"}}></i>&nbsp;&nbsp;TODONA
        <br /><hr />
      </div>
      <Form className="box"
        onSubmit={handleRegister}
        ref={c => {
          setForm(c);
        }}
      >
        {!successful && (
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
                value={username}
                onChange={onChangeUsername}
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
                value={email}
                onChange={onChangeEmail}
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
                value={password}
                onChange={onChangePassword}
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
                value={confirmPassword}
                onChange={onChangeConfirmPassword}
                validations={[required, onConfirmPassword]}
              />
            </div>

            <br />
            {message && (
              <div className="form-group">
                <div
                  className={
                    successful
                      ? "alert alert-success"
                      : "alert alert-danger"
                  }
                  role="alert"
                >
                  {message}
                </div>
              </div>
            )}

            <div className="form-group">
              <br />
              <button className="btn btn-primary btn-block">Sign Up</button>
            </div>

            <div className="link-page">
              Have an account ? 
              <Link to="/login" className="brand">Sign in</Link>
            </div>
          </div>
        )}

        <CheckButton
          style={{ display: "none" }}
          ref={c => {
            setCheckBtn(c);
          }}
        />
      </Form>
      {loader}
    </>
  );
}

export default Register;