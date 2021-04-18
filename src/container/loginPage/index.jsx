import React, { useEffect, useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from  "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import "./login.css";

import Spinner from "../../component/spinner";
import AuthService from "../../services/auth.service";
import useFullPageLoader from "../../hooks/useFullPageLoader";

const required = value => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        )
    }
};

const Login= () => {
    const history = useHistory();
    const [form, setForm] = useState("");
    const [checkBtn, setCheckBtn] = useState("");
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const [loader, showLoader, hideLoader] = useFullPageLoader();

    const onChangeUsername = (e) => {
        setMessage("");
        setLoading(false);
        setUserName(e.target.value);
    }

    const onChangePassword = (e) => {
        setMessage("");
        setLoading(false);
        setPassword(e.target.value);
    }

    const handleLogin = (e) => {
        e.preventDefault();

        setMessage("");
        form.validateAll();

        if (checkBtn.context._errors.length === 0) {
          setLoading(true);  
          AuthService.login(username, password)
                .then(() => {
                    showLoader();
                    history.push("/");
                    window.location.reload();
                }, 
                error => {
                    const resMessage = 
                        (error.response &&
                            error.response.data && 
                            error.response.data.message) ||
                        error.message ||
                        error.toString();
                    
                    setLoading(false);
                    setMessage(resMessage);
                }
            ).then(() => {
              hideLoader();
            });
        } else {
            setLoading(false);
            hideLoader();
        }
    }

      return (
        <div className="body">
          <div className="login-header">
          <i className="far fa-calendar-check" style={{fontSize: "80px"}}></i>&nbsp;&nbsp;TODONA
          <br /><hr />
          </div>
          <Form class="login"
            onSubmit={handleLogin}
            ref={c => {
              setForm(c);
            }}
          >
            <h1>Login</h1>
            <br />
            <hr />
            <br />
            <div className="form-group">
              <Input
                type="text"
                name="username"
                placeholder="Username"
                value={username}
                onChange={onChangeUsername}
                validations={[required]}
              />
            </div>

            <div className="form-group">
              <Input
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={onChangePassword}
                validations={[required]}
              />
            </div>

              {message && (
                <div className="form-group">
                  <div className="alert alert-danger" role="alert">
                    {message}
                  </div>
                </div>
              )}

            { loading ? (
              <Spinner />
            ) : (
              <div className="form-group">
                <button
                  disabled={loading}
                >
                  {loading && (
                    <span className="spinner-border spinner-border-sm"></span>
                  )}
                  <span>Login</span>
                </button>
              </div>
            )}

            <CheckButton
              style={{ display: "none" }}
              ref={c => {
                setCheckBtn(c);
              }}
            />
            <div className="link-page">
              Don't have an account ? 
              <Link to="/register" className="brand">Sign up</Link>
            </div>
          </Form>
          {loader}
        </div>
      );
}

export default Login;