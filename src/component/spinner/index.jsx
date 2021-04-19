import React from 'react';
import spinner from "../../assets/images/spinner_9.gif";
import './spinner.css'

const Spinner = () => {
    return (
        <div className="spinner">
            <img style={{sizes: "small"}} src={spinner} alt="loading" />
        </div>
    )
}

export default Spinner;