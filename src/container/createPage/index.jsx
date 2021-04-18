import React, { useState } from "react";
import Card from "../../component/card";
import {useHistory} from "react-router-dom"
import UserService from "../../services/user.service";
import useFullPageLoader from "../../hooks/useFullPageLoader";

const CreatePage = () => {
  const history = useHistory()
  const [fail, setFail] = useState(false);
  const [message, setMessage] = useState("");

  const [loader, showLoader, hideLoader] = useFullPageLoader();

  const setState = (message, status) => {
    setFail(status);
    setMessage(message);
  }

  async function onSubmit(task,time) {
    var data = {
      task: task,
      time: time
    }
    await UserService.createTasks(data)
      .then(
        response => {
          showLoader();
          history.push("/")
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setState(resMessage, true);
        }
      );
  }

  return (
    <div className="CreatePage">
      <h1 style={{ fontSize: "48px", margin: "0.5rem 0", color: "white" }}>Create</h1>
      <hr /> <br /> <br /> 
      <div>
        <Card onSubmit={onSubmit} mode={"create"}/>
      </div>
      {loader}
    </div>
  );
};

export default CreatePage;