import "./App.css";
import "./styles.css";
import PianoRollDisplay from "./components/PianorollDisplay";
import { createContext, useState } from "react";

export const AppContext = createContext({
  selectedPianorollIndex: undefined,
  setSelectedPianorollIndex: () => {},
});

function App() {
  const [selectedPianorollIndex, setSelectedPianorollIndex] = useState();

  return (
    <AppContext.Provider
      value={{ selectedPianorollIndex, setSelectedPianorollIndex }}
    >
      <div className="App">
        <nav className="navbar">
          <div className="logo-container">
            <img
              src="/white.svg"
              alt="Logo"
              onClick={() => setSelectedPianorollIndex(undefined)}
            />
          </div>
        </nav>

        <PianoRollDisplay />
      </div>
    </AppContext.Provider>
  );
}

export default App;
