import Nav from "./Nav";
import Sidebar from "../Sidebar/Sidebar";
import "./Notes.css";
import "./Home.css";

function Notes() {
  return (
    <div>
      <Nav />
      <div id="mainContainer">
        <Sidebar />
        <div className="styling">Notes</div>
      </div>
    </div>
  );
}
export default Notes;
