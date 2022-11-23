import React, { useState, useEffect } from "react";
import Nav from "../../components/Nav/Nav";
import Sidebar from "../../components/Sidebar/Sidebar";
import "../../components/Notes/Notes.css";
import "../Home/Home.css";
import "../../components/List/List.css";
import "../Shared/Shared.css";
import ShareListItem from "../../components/ShareListItem/ShareListItem";
import ViewTodo from "../../components/ViewTodo/ViewTodo";
import axios from "axios";

const Shared = () => {
  const [serverData, setServerData] = useState([]);
  const [showList, setShowList] = useState(true);
  const [todoEntity, setTodoEntity] = useState("");

  const getSharedListfromBackend = (id) => {
    axios
      .get(`http://localhost:4000/sharedrecords/${id}`)
      .then((res) => {
        setServerData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    const id = localStorage.getItem("id");
    getSharedListfromBackend(id);
  }, []);

  return (
    <div>
      <Nav />
      <div id="mainContainer">
        <Sidebar />
        <div id="SharedDiv">
          <div className="SharedUser">
            <div id="list">
              <h1>Shared Todo's</h1>
            </div>
            {!showList && (
              <span
                className="close-mark"
                onClick={() => {
                  setShowList(true);
                }}
              >
                <i class="fa-solid fa-xmark"></i>
              </span>
            )}

            <div className={showList ? "display-container" : "view-container"}>
              {showList ? (
                <>
                  <div className="display-labels">
                    <div className="label-1">
                      <span className="label-text">Todo Title</span>
                    </div>
                    <div className="label-2">
                      <span className="label-text">Shared By</span>
                    </div>
                    <div className="label-3">
                      <span className="label-text">Operations</span>
                    </div>
                  </div>
                  {serverData.length > 0 &&
                    serverData.map((item, id) => (
                      <ShareListItem
                        key={id}
                        data={item}
                        handleClick={(val) => {
                          setShowList(false);
                          setTodoEntity(val);
                        }}
                      />
                    ))}
                </>
              ) : (
                <ViewTodo data={todoEntity} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shared;
