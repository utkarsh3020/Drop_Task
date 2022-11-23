import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import "./ShareWith.css";
import axios from "axios";
import Nav from "../../components/Nav/Nav";
import Sidebar from "../../components/Sidebar/Sidebar";

const ShareWith = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [options, setOptions] = useState([]);
  const [label, setLabel] = useState("");

  useEffect(() => {
    axios.get("http://localhost:4000/auth/userlist").then((res) => {
      console.log(res.data);
      setOptions(res.data);
    });
  }, []);

  const handleChange = (selectedOption) => {
    setLabel(selectedOption);
    console.log(`Option selected:`, selectedOption);
  };
  const onSubmit = () => {
    let users = [];
    label.forEach((x) => users.push(x.value));
    const obj = {
      receiver: users,
      senderId: localStorage.getItem("id"),
      todoId: params.id,
    };

    axios
      .post("http://localhost:4000/sharedrecords", obj)
      .then((res) => {
        console.log(res.data);
        navigate("../todo", { replace: true });
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <>
      <Nav />
      <Sidebar />
      <div className="share-container">
        <div className="sub-container">
        <Link className="back-btn-create" to="/todo">
          <i class="fa-solid fa-xmark"></i>
        </Link>
          <h1>Selcet User</h1>
          <Select
            className="drop-down"
            options={options}
            isMulti={true}
            value={label}
            onChange={handleChange}
          />
          <button className="btn-share-submit" onClick={onSubmit}>Submit</button>
        </div>
      </div>
    </>
  );
};

export default ShareWith;
