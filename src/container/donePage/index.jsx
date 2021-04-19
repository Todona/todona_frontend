import React, { useState, useEffect } from "react";
import Card from "../../component/card";
import DateBar from "../../component/date";
import SearchBar from "../../component/searchbar";

import UserService from "../../services/user.service";
import useFullPageLoader from "../../hooks/useFullPageLoader";

const DonePage = () => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [date, setDate] = useState("2020");
  const [count, setCount] = useState(0);

  const [loader, showLoader, hideLoader] = useFullPageLoader();

  const fetchData = async () => {
    showLoader();
    const res = await UserService.getDoneTasks();
    setTasks(res.data);
    setCount(res.data.length);
    hideLoader();
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onUnDone = async (id) => {
    showLoader();
    try {
      await UserService.updateTasks(id, {
        isFinished: false
      });

      const newTasks = tasks.filter(ele => ele._id !== id);
      setTasks(newTasks);
      setCount(newTasks.length);
    } catch (err) {
      console.log(err);
    }
    hideLoader();
  };

  const onDelete = async (id) => {
    showLoader();
    try {
      await UserService.deleteTasks(id);

      const newTasks = tasks.filter(ele => ele._id !== id);
      setTasks(newTasks);
      setCount(newTasks.length);
    } catch (err) {
      console.log(err);
    }
    hideLoader();
  };

  async function onSetDate(newDate) {
    try {
      console.log("date" + date, "new date" + newDate, date != newDate);
      await setDate(newDate);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="TodoPage">
      <div className="parent">
        <div className="column">
          <h1 style={{ fontSize: "48px", margin: "0.5rem 0", color: "white" }}>
            Done <h3 style={{ "fontSize": "20px" }}>{count} {count < 2 ? "task" : "tasks"}</h3>
          </h1>
        </div>
        <div className="column">
          <SearchBar />
        </div>
      </div>
      <hr /> <br /> <br /> 
      <div className="card-container">
        {tasks.length !== 0 ? tasks.map((ele, i) => (
          <>
            <DateBar 
              newDate={new Date(ele.time).toLocaleString([], {dateStyle: "long"})} 
              date={date} 
              onSetDate={onSetDate} 
            />
            <Card
              mode={"done"}
              onUnDone={() => onUnDone(ele._id)}
              onDelete={() => onDelete(ele._id)}
              detail={ele}
              selected={selectedCard === i}
              key={i}
              onClick={() => setSelectedCard(i)}
            />
          </>
        )) : <p style={{ textAlign: "center", color: "white" }}>You haven't done any task.</p>}
      </div>
      {loader}
    </div>
  );
};

export default DonePage;
