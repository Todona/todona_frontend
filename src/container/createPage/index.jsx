import React from "react";
import Card from "../../component/card";
import {useHistory} from "react-router-dom"
import UserService from "../../services/user.service";

const CreatePage = () => {
  const history = useHistory()

  async function onSubmit(task,time) {
    var data = {
      task: task,
      time: time
    }
    await UserService.createTasks(data);
    history.push("/")
  }

  return (
    <div className="CreatePage">
      <h1 style={{ fontSize: "48px", margin: "0.5rem 0" }}>Create</h1>
      <div className="card-container">
        <Card onSubmit={onSubmit} mode={"create"}/>
      </div>
    </div>
  );
};

export default CreatePage;