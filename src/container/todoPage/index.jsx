import React, { useState, useEffect } from "react";
import Card from "../../component/card";
import { useHistory } from "react-router-dom";

import UserService from "../../services/user.service";
import useFullPageLoader from "../../hooks/useFullPageLoader";

const TodoPage = () => {
  const history = useHistory();
  const [selectedCard, setSelectedCard] = useState(null);
  const [tasks, setTasks] = useState([]);
  
  const [loader, showLoader, hideLoader] = useFullPageLoader();

  const fetchData = async () => {
    showLoader();
    const res = await UserService.getAllTasks();
    setTasks(res.data);
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
    } catch (err) {
      console.log(err);
    }
  }

  const onDelete = async (id) => {
    try {
      await UserService.deleteTasks(id);

      const newTasks = tasks.filter(ele => ele._id !== id);
      setTasks(newTasks);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="TodoPage">
      <h1 style={{ fontSize: "48px", margin: "0.5rem 0", color: "white" }}>Todo</h1>
      <hr /> <br /> <br />  
      {loader}
      <div className="card-container">
        {tasks.length !== 0 ? tasks.map((ele, i) => (
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
        )) : <p style={{ textAlign: "center", color: "white" }}>Hooray! You have no more task todo.</p>}
      </div>
    </div>
  );
};

export default TodoPage;
