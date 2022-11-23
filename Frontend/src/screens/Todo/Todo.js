import ListItem from "../../components/ListItem/ListItem";
import Nav from "../../components/Nav/Nav";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./Todo.css";

function Todo() {
  return (
    <>
      <Nav />
      <div id="mainContainer">
        <Sidebar />
        <ListItem />
      </div>
    </>
  );
}
export default Todo;
