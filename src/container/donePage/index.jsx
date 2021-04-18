import React, { useState, useEffect } from "react";
import Card from "../../component/card";

import UserService from "../../services/user.service";
import useFullPageLoader from "../../hooks/useFullPageLoader";

const DonePage = () => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [tasks, setTasks] = useState([]);

  const [loader, showLoader, hideLoader] = useFullPageLoader();

  const fetchData = async () => {
    showLoader();
    const res = await UserService.getDoneTasks();
    setTasks(res.data);
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
    } catch (err) {
      console.log(err);
    }
    hideLoader();
  };

  return (
    <div className="TodoPage">
      <h1 style={{ fontSize: "48px", margin: "0.5rem 0", color: "white" }}>Done</h1>
      <hr /> <br /> <br /> 
      <div className="card-container">
        {tasks.length !== 0 ? tasks.map((ele, i) => (
          <Card
            mode={"done"}
            onUnDone={() => onUnDone(ele._id)}
            onDelete={() => onDelete(ele._id)}
            detail={ele}
            selected={selectedCard === i}
            key={i}
            onClick={() => setSelectedCard(i)}
          />
        )) : <p style={{ textAlign: "center", color: "white" }}>You haven't done any task.</p>}
      </div>
      {loader}
    </div>
  );
};

export default DonePage;
