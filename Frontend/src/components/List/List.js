import React from "react";
import "./List.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const List = (props) => {
  const navigate = useNavigate();
  const { product } = props;
  const deleteItem = () => {
    const userId = localStorage.getItem("id");
    axios
      .delete(`http://localhost:4000/todo/${userId}/${product.todoId}`)
      .then((res) => {
        console.log(res.data);
        navigate("../todo", { replace: true });
      })
      .catch((e) => console.log(e));
  };

  if (product != null) {
    return (
      <Link to={`/sublist/${product.todoId}`} id="title" product={product}>
        <div id="listss">
          <div className="function function1">
            <li>
              <div className="link-list link1">
                {<div className="ic">{product.title}</div>}
                <div id="icons">
                  <Link to={`/sharingtodo/${product.todoId}`}>
                    <div className="ic">
                      <i className="fa-solid fa-user-group"></i>
                    </div>
                  </Link>
                  <div className="ic">
                    <i className="fa-solid fa-pen-to-square"></i>
                  </div>
                  <div className="ic" onClick={deleteItem}>
                    <i className="fa-solid fa-trash-can"></i>
                  </div>
                </div>
              </div>
            </li>
          </div>
        </div>
      </Link>
    );
    // });
  }
};

export default List;
