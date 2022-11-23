import Nav from "../../components/Nav/Nav";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./CreateTodo.css";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function CreateTodo() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  function onChangeTitleHandler(event) {
    event.preventDefault();
    setTitle(event.target.value);
  }

  function onChangeDescriptionHandler(event) {
    event.preventDefault();
    setDescription(event.target.value);
  }

  function resetHandler(event) {
    event.preventDefault();
    setDescription(" ");
    setTitle(" ");
  }

  function makePostRequest(path, queryObj) {
    axios.post(path, queryObj).then(
      (response) => {
        var result = response.data;
        console.log(result);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  function createHandler(event) {
    event.preventDefault();

    var createNewTodo = {
      id: localStorage.getItem("id"),
      title: title,
      desc: description,
    };
    makePostRequest("http://localhost:4000/todo", createNewTodo);
    setDescription(" ");
    setTitle(" ");
    console.log(createNewTodo.title + " hi");
  }

  return (
    <>
      <Nav />
      <Sidebar />
      <div id="notes">
        <Link className="back-btn-create" to="/todo">
          <i class="fa-solid fa-xmark"></i>
        </Link>
        <h1 className="head-create">New ToDo</h1>
        <div id="mainDiv">
          <form id="mainForm">
            <div class="create-form-group">
              <label className="create-label" for="usr">Name</label>
              <input
                type="text"
                value={title}
                class="create-form-control"
                id="usr"
                onChange={onChangeTitleHandler}
                required
              />
            </div>
            <div className="create-form-group" onChange={onChangeDescriptionHandler}>
              <label className="create-label" for="bio">Description</label>
              <textarea
                className="create-form-control text-area"
                id="Textarea1"
                rows="8"
                value={description}
                required
              ></textarea>
            </div>
            <div className="btns">
              <button
                type="submit"
                className="btn-reset"
                onClick={resetHandler}
              >
                Reset
              </button>

              <button type="submit" className="btn" onClick={createHandler}>
                <Link to="/Todo" className="fullsize">
                  Create
                </Link>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
export default CreateTodo;
