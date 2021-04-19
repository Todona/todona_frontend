import React, { useState, useEffect } from 'react';

const DateBar = ({newDate, date, onSetDate, }) => {

    function fetchData() {
        onSetDate(newDate);
    }
    useEffect(() => {
        fetchData();
        console.log("!" + newDate, "2" + date)
    }, [])

    return (
        <>
            { true &&
                <>
                    <h1>
                        {newDate}
                    </h1>
                    <br />
                </>
            }
        </>
    )
  }

export default DateBar;