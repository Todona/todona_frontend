import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

import AuthService from "../../services/auth.service";

const Navbar = () => {
  const [mode, setMode] = useState(0);
  const [currentUser, setCurrentUser] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const fetchData = async () => {
    setMode(window.location.pathname)

    const user = await AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
      setIsLoggedIn(true);
    } else {
      setCurrentUser();
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [mode])

  const logOut = async () => {
    console.log('Log out');
    try {
      await AuthService.logout();
      setMode(6);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
        {isLoggedIn && (
        <div className="navbar">
          <div className="content">
            <div className="link-page">
              <Link to="/" className="brand"><i className="far fa-calendar-check" style={{fontSize: "22px"}}></i>&nbsp;&nbsp;TODONA</Link>
              
              {isLoggedIn && (
                <Link to="/" onClick={() => setMode(0)} style={mode === "/" ? { color: "#009BFF" } : null}>Todo</Link>
              )}

              {isLoggedIn && (
                <Link to="/done" onClick={() => setMode(1)} style={mode === "/done" ? { color: "#009BFF" } : null}>Done</Link>
              )}
            
          </div>

          { !currentUser ? (
              <div className="link-page">
                <Link to="/login" onClick={() => setMode(3)} style={mode === "/login" ? { color: "#009BFF" } : null}>Sign in</Link>
                <Link to="/register" onClick={() => setMode(4)}><button className="create-button">Sign up</button></Link>
              </div>
          ) : (
              <div className="link-page">
                <Link to="/create" onClick={() => setMode(5)}><button className="create-button">New Task</button></Link>
                <Link to="/contact" onClick={() => setMode(2)} style={mode === "/contact" ? { color: "#009BFF" } : null}>Contact</Link>
                <Link to="/login" onClick={() => logOut()}>Log out</Link>
              </div>
          )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
