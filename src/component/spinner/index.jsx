import React from 'react';
import spinner from "../../assets/images/spinner_9.gif";

const Spinner = () => {
    return (
        <div>
            <img style={{sizes: "small"}} src={spinner} alt="loading" />
        </div>
    )
}

export default Spinner;