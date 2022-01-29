import logo from "./logo.svg";
import "./App.css";
import { Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Kvist</p>
        <Link to={"/join"}>
          Delta i Kvist!
        </Link>
      </header>
    </div>
  );
}

export default App;
