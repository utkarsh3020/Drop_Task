import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Nav from "../../components/Nav/Nav";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./SubList.css";
import axios from "axios";

function SubList() {
  const params = useParams();

  const [todo, setTodo] = useState([]);

  const getData = (id, todoId) => {
    axios
      .get(`http://localhost:4000/todo/${id}/${todoId}`)
      .then((res) => {
        console.log(res.data);
        setTodo(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const id = localStorage.getItem("id");
    getData(id, params._id);
  }, []);

  return (
    <div>
      <Nav />
      <Sidebar />
      <div className="main-container">
        <Link className="back-btn" to="/todo">
          <i class="fa-solid fa-xmark"></i>
        </Link>
        <div id="container">
          <div id="title1">
            <h2>{todo.title}</h2>
          </div>
          <div id="description">{todo.desc}</div>
        </div>
      </div>
    </div>
  );
}
export default SubList;
