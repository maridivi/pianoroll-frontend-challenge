import "./App.css";
import "./styles.css";
import PianoRollDisplay from "./components/PianorollDisplay";
import { createContext, useState } from "react";

// Create a context for the selected piano roll
export const SelectedPianorollContext = createContext({
  selectedPianorollIndex: undefined,
  setSelectedPianorollIndex: () => {},
});

function App() {
  // Create a state for the selected piano roll index
  const [selectedPianorollIndex, setSelectedPianorollIndex] = useState();

  return (
    <SelectedPianorollContext.Provider
      value={{ selectedPianorollIndex, setSelectedPianorollIndex }}
    >
      <div className="App">
        <nav className="navbar">
          <div className="logo-container">
            <img
              src="/white.svg"
              alt="Logo"
              // Reset the selected piano roll index when the logo is clicked
              onClick={() => setSelectedPianorollIndex(undefined)}
            />
          </div>
        </nav>

        <PianoRollDisplay />
      </div>
    </SelectedPianorollContext.Provider>
  );
}

export default App;
