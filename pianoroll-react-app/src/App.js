import logo from "./logo.svg";
import "./App.css";
import "./styles.css";
import PianoRollDisplay from "./components/PianorollDisplay";

function App() {
  return (
    <div className="App">
      <nav className="navbar">
        <div className="logo-container">
          <img src="/white.svg" alt="Logo" />
        </div>
      </nav>

      {/* <h1> Welcome to PianoRoll frontend coding challenge!</h1> */}

      <PianoRollDisplay />
    </div>
  );
}

export default App;
