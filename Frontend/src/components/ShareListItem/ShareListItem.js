import React from "react";
import "./ShareListItem.css";
import axios from "axios";

const ShareListItem = (props) => {
  const data = props.data;
  const deleteItem = () => {
    const userId = localStorage.getItem("id");
    axios
      .delete(`http://localhost:4000/todo/${userId}/${data.todoId}`)
      .then((res) => console.log(res.data))
      .catch((e) => console.log(e));
  };
  return (
    <div className="shared-item" onClick={() => props.handleClick(data)}>
      <div className="shared-item-title">{data.title}</div>
      <div className="shared-users">
        <div className="ic">
          <i className="fa-solid fa-user-group"></i>
        </div>
        {data.from}
      </div>
      <div id="icons" className="shared-operations">
        <div className="ic">
          <i className="fa-solid fa-pen-to-square" />
        </div>
        {/* <div className="ic" onClick={deleteItem}> */}
        <div className="ic" onClick={deleteItem}>
          <i className="fa-solid fa-trash-can" />
        </div>
      </div>
    </div>
  );
};

export default ShareListItem;
