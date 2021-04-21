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
  const [allTask, setAllTask] = useState([]);
  const [expire, setExpire] = useState("");
  const [count, setCount] = useState(0);
  
  const [loader, showLoader, hideLoader] = useFullPageLoader();

  const fetchData = async () => {
    showLoader();
    const res = await UserService.getAllTasks();
    setTasks(res.data);
    setAllTask(res.data);
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
    showLoader();
    try {
      await UserService.updateTasks(id, {
        isFinished: true
      });

      const newTasks = tasks.filter(ele => ele._id !== id);
      setTasks(newTasks);

      const newAllTask = allTask.filter(ele => ele._id !== id);
      setAllTask(newAllTask);

      setCount(newAllTask.length);
    } catch (err) {
      console.log(err);
    }
    hideLoader();
  }

  const onDelete = async (id) => {
    showLoader();
    try {
      await UserService.deleteTasks(id);

      const newTasks = tasks.filter(ele => ele._id !== id);
      setTasks(newTasks);

      const newAllTask = allTask.filter(ele => ele._id !== id);
      setAllTask(newAllTask);
      
      setCount(newAllTask.length);
    } catch (err) {
      console.log(err);
    }
    hideLoader();
  }
  
  async function searchTask(task) {
    const newTasks = allTask.filter(ele => ele.task.toLowerCase().includes(task.toLowerCase()));
    setTasks(newTasks);
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
      <div className="card-container">
        {tasks.length !== 0 ? tasks.map((ele, i, root) => (
          <>
            { i === 0 || new Date(ele.time).toLocaleString([], {dateStyle: "long"}) !== new Date(root[i-1].time).toLocaleString([], {dateStyle: "long"}) ?
              <DateBar 
                date={new Date(ele.time).toLocaleString([], {dateStyle: "long"})}
              />
              : null
            }
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
      {loader}
    </div>
  );
};

export default TodoPage;
