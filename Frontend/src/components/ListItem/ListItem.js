import React, { useEffect, useState } from "react";
import "./ListItem.css";
import List from "../../components/List/List.js";
import { Link } from "react-router-dom";
import "../../screens/Home/Home.css";
import axios from "axios";

function ListItem() {
  const [data, setData] = useState([]);

  const getData = (id) => {
    axios
      .get(`http://localhost:4000/todo/${id}`)
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const id = localStorage.getItem("id");
    getData(id);
  }, []);

  return (
    <div id="main-container">
      <div id="list">
        <h1>Todo's</h1>
      </div>
      <div id="list-container">
        <Link to={"/subList"} id="title">
          {data.length > 0 &&
            data.map((product, id) => <List key={id} product={product} />)}
        </Link>

        <Link to="/createtodo" className=" Link fs">
          <span>
            <i className="fa-solid fa-circle-plus createBtn"></i>
          </span>
        </Link>
      </div>
    </div>
  );
}
export default ListItem;
