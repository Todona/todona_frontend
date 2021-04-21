import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import './dashboard.css';

import UserService from "../../services/user.service";
import useFullPageLoader from "../../hooks/useFullPageLoader";

const TodoPage = () => {
  const history = useHistory();
  const [todoCount, setTodoCount] = useState(0);
  const [doneCount, setDoneCount] = useState(0);
  const [allCount, setAllCount] = useState(0);
  const [percents, setPercents] = useState(0);
  
  const [loader, showLoader, hideLoader] = useFullPageLoader();

  const fetchData = async () => {
    showLoader();
    const todo = await UserService.getAllTasks();
    setTodoCount(todo.data.length);
    const done = await UserService.getDoneTasks();
    setDoneCount(done.data.length);

    const p = Math.round(done.data.length/(todo.data.length + done.data.length) * 10000) / 100;

    setPercents(p);
    setAllCount(done.data.length + todo.data.length);
    hideLoader();
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onDone = async () => {
    history.push(`/done`);
  }

  const onTodo = async () => {
    history.push(`/todo`);
  }

  return (
    <div className="DashboardPage">
        <br />
        <h1 style={{ fontSize: "48px", margin: "0.5rem 0", color: "white" }}>
        Dashboard
        </h1>
        <hr /> <br /> <br />  
        {loader}

        <div className="progress-board">
            <br />
            <div className="progress">
                <h2>YOUR PROGRESS : </h2> 
                <h1>{percents} %</h1> 
                <h3>FROM {allCount} TASKS</h3>
            </div>
            <br /> <br />
            <div className="parent">
                <div className="column">
                    <div className="card" onClick={onTodo}>
                        <h2>
                            Todo Tasks :
                        </h2>
                        <h1>{todoCount}</h1>
                    </div>
                    <div className="detail">
                        <h3>VIEW TODO TASKS</h3>
                    </div>
                </div>
                
                <div className="column">
                    <div className="card" onClick={onDone}>
                        <h2>
                            Done Tasks :
                        </h2>
                        <h1>{doneCount}</h1>
                    </div>
                    <div className="detail">
                        <h3>VIEW DONE TASKS</h3>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default TodoPage;
