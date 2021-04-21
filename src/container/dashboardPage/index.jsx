import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import UserService from "../../services/user.service";
import useFullPageLoader from "../../hooks/useFullPageLoader";

const TodoPage = () => {
  const history = useHistory();
  const [todoCount, setTodoCount] = useState(0);
  const [doneCount, setDoneCount] = useState(0);
  
  const [loader, showLoader, hideLoader] = useFullPageLoader();

  const fetchData = async () => {
    showLoader();
    const todo = await UserService.getAllTasks();
    setTodoCount(todo.data.length);
    const done = await UserService.getDoneTasks();
    setDoneCount(done.data.length);
    hideLoader();
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onDone = async (id) => {
    history.push(`/done`);
  }

  const onTodo = async (id) => {
    history.push(`/todo`);
  }

  return (
    <div className="DashboardPage">
        <h1 style={{ fontSize: "48px", margin: "0.5rem 0", color: "white" }}>
        Dashboard
        </h1>
      <hr /> <br /> <br />  
      {loader}
    </div>
  );
};

export default TodoPage;
