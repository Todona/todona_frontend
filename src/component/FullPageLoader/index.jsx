import React from "react";
import Spinner from "../../assets/images/spinner_8.gif";
import './FullPageLoader.css';

const FullPageLoader = () => {
    return (
        <div className="fp-container">
            <div className="fp-loader">
                <h1>TODONA</h1>
                <img src={Spinner} alt="loading" />
            </div>
        </div>
    );
};

export default FullPageLoader;