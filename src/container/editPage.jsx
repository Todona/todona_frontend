import React, { useState, useEffect } from "react";
import Card from "../component/card";
import { useHistory, useParams } from "react-router-dom";

import UserService from "../services/user.service";

const EditPage = () => {
  const history = useHistory();
  const { id } = useParams();
  const [task, setTask] = useState(null);

  async function onSubmit(task, time) {
    var data = {
      task: task,
      time: time,
    }
    await UserService.updateTasks(id, data);
    history.push("/");
  }

  const fetchData = async () => {
    const res = await UserService.getTasks(id);
    setTask(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="EditPage">
      <h1 style={{ fontSize: "48px", margin: "0.5rem 0" }}>Edit</h1>
      <div className="card-container">
        <Card onSubmit={onSubmit} mode={"edit"} detail={task} />
      </div>
    </div>
  );
};

export default EditPage;
