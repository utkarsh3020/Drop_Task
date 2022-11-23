import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Todo from "../screens/Todo/Todo";
import SubList from "../screens/SubList/SubList";
import Shared from "../screens/Shared/Shared";
import LogIn from "../screens/Login/LogIn";
import Register from "../screens/Register/Register";
import CreateTodo from "../screens/CreateTodo/CreateTodo";
import ShareWith from "../screens/ShareWith/ShareWith";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<LogIn />} />
        <Route path="/register" exact element={<Register />} />
        <Route path="/todo" element={<Todo />}></Route>
        <Route path="/sublist/:_id" element={<SubList />}></Route>
        <Route path="/sharingtodo/:id" element={<ShareWith />} />
        <Route path="/shared" element={<Shared />}></Route>
        <Route path="/createtodo" element={<CreateTodo />}></Route>
      </Routes>
    </Router>
  );
}
export default App;
