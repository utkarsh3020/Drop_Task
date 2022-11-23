import Nav from "../../components/Nav/Nav";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./Home.css";

function Home() {
  return (
    <>
      <Nav />
      <div id="mainContainer">
        <Sidebar />
        <div id="styling">In HOME</div>
      </div>
    </>
  );
}
export default Home;
