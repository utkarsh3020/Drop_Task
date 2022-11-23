import React from "react";
import "./ViewTodo.css";

const ViewTodo = (data) => {
  const render_data = data.data;
  console.log(render_data);
  return (
    <>
      <div id="viewContainer">
        <div className="shared-users-1">{render_data.from}</div>
        <div className="title-section">{render_data.title}</div>
        <div className="data-section">{render_data.desc}</div>
      </div>
    </>
  );
};

export default ViewTodo;
