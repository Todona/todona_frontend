import React, { useState, useEffect } from "react";
import Card from "../../component/card";
import DateBar from "../../component/date";
import SearchBar from "../../component/searchbar";
import { useHistory } from "react-router-dom";

import UserService from "../../services/user.service";
import useFullPageLoader from "../../hooks/useFullPageLoader";
import './todoPage.css';

const TodoPage = () => {
  const history = useHistory();
  const [selectedCard, setSelectedCard] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [date, setDate] = useState("2020");
  const [count, setCount] = useState(0);
  
  const [loader, showLoader, hideLoader] = useFullPageLoader();

  const fetchData = async () => {
    showLoader();
    const res = await UserService.getAllTasks();
    setTasks(res.data);
    setCount(res.data.length);
    hideLoader();
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onEdit = (id) => {
    history.push(`/edit/${id}`);
  };

  const onDone = async (id) => {
    try {
      await UserService.updateTasks(id, {
        isFinished: true
      });

      const newTasks = tasks.filter(ele => ele._id !== id);
      setTasks(newTasks);
      setCount(newTasks.length);
    } catch (err) {
      console.log(err);
    }
  }

  const onDelete = async (id) => {
    try {
      await UserService.deleteTasks(id);

      const newTasks = tasks.filter(ele => ele._id !== id);
      setTasks(newTasks);
      setCount(newTasks.length);
    } catch (err) {
      console.log(err);
    }
  }

  async function onSetDate(newDate) {
    try {
      console.log("date" + date, "new date" + newDate, date != newDate);
      await setDate(newDate);
    } catch (err) {
      console.log(err);
    }
  }

  async function searchTask(task) {
    console.log("Search")
    await UserService.findByTask(task, true)
      .then(response => {
        setTasks(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  return (
    <div className="TodoPage">
      <div className="parent">
        <div className="column">
        <h1 style={{ fontSize: "48px", margin: "0.5rem 0", color: "white" }}>
            Todo <h3 style={{ "fontSize": "20px" }}>{count} {count < 2 ? "task" : "tasks"}</h3>
          </h1>
        </div>
        <div className="column">
          <SearchBar searchTask={searchTask} />
        </div>
      </div>
      <hr /> <br /> <br />  
      {loader}
      <div className="card-container">
        {tasks.length !== 0 ? tasks.map((ele, i) => (
          <>
            <DateBar 
              newDate={new Date(ele.time).toLocaleString([], {dateStyle: "long"})} 
              date={date} 
              onSetDate={onSetDate} 
            />
            <Card
              mode={"default"}
              onDone={() => onDone(ele._id)}
              onEdit={() => onEdit(ele._id)}
              onDelete={() => onDelete(ele._id)}
              detail={ele}
              selected={selectedCard === i}
              key={i}
              onClick={() => setSelectedCard(i)}
            />
          </>
        )) : <p style={{ textAlign: "center", color: "white" }}>Hooray! You have no more task todo.</p>}
      </div>
    </div>
  );
};

export default TodoPage;
