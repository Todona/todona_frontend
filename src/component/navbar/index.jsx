import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

import AuthService from "../../services/auth.service";
import useFullPageLoader from "../../hooks/useFullPageLoader";

const Navbar = () => {
  const [mode, setMode] = useState(0);
  const [currentUser, setCurrentUser] = useState();

  const [loader, showLoader, hideLoader] = useFullPageLoader();

  const fetchData = async () => {
    setMode(window.location.pathname);
    showLoader();
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    } else {
      setCurrentUser();
    }
    hideLoader();
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
        {currentUser ? (
        <div className="navbar">
          <div className="content">
            <div className="link-page">
              <Link to="/" onClick={() => setMode(0)} className="brand"><i className="far fa-calendar-check" style={{fontSize: "22px"}}></i>&nbsp;&nbsp;TODONA</Link>
              <Link to="/todo" onClick={() => setMode(1)} style={mode === "/todo" ? { color: "#009BFF" } : null}>Todo</Link>
              <Link to="/done" onClick={() => setMode(2)} style={mode === "/done" ? { color: "#009BFF" } : null}>Done</Link>
            </div>
            <div className="link-page">
              <Link to="/" onClick={() => setMode(3)} className="brand"><i className="far fa-user" style={{fontSize: "22px"}}></i>&nbsp;&nbsp;{currentUser.username}</Link>
            </div>
            <div className="link-page">
               <Link to="/create" onClick={() => setMode(4)}><button className="create-button">New Task</button></Link>
               <Link to="/contact" onClick={() => setMode(5)} style={mode === "/contact" ? { color: "#009BFF" } : null}>Contact</Link>
               <Link to="/login" onClick={() => logOut()}>Log out</Link>
            </div>
          </div>
        </div>
        ) : (
          loader
        )}
    </div>
  );
};

export default Navbar;
