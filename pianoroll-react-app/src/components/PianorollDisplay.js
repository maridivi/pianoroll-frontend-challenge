import React, { useMemo, useState } from "react";
import "../styles.css";
import PianoRoll from "./Pianoroll";

const PianoRollDisplay = () => {
  const [allNotes, setData] = useState(null);
  const [selectedPianorollIndex, setSelectedPianorollIndex] = useState(null);

  function selectPianorollIndex(index) {
    setSelectedPianorollIndex(index);
  }

  const loadPianoRollData = async () => {
    try {
      const response = await fetch("https://pianoroll.ai/random_notes");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  const pianoRolls = useMemo(() => {
    if (!allNotes) return;
    const notes = [];
    for (let rollIndex = 0; rollIndex < 20; rollIndex++) {
      notes.push(allNotes.slice(rollIndex * 60, rollIndex * 60 + 60));
    }
    return notes;
  }, [allNotes]);

  return (
    <>
      <div id="buttonContainer">
        <button id="loadCSV" onClick={loadPianoRollData}>
          "Load Piano Rolls!"
        </button>
      </div>
      {typeof selectedPianorollIndex !== "undefined" ? (
        <div className="main-view">
          <div className="selected-pianoroll">
            <PianoRoll
              notes={pianoRolls[selectedPianorollIndex]}
              onClick={() => selectPianorollIndex(selectedPianorollIndex)}
              isSelected
            />
          </div>
          <div className="pianorolls">
            {pianoRolls
              ?.filter((_, i) => {
                return i !== selectPianorollIndex;
              })
              ?.map((notes, i) => (
                <PianoRoll
                  key={i}
                  notes={notes}
                  onClick={() => selectPianorollIndex(i)}
                />
              ))}
          </div>
        </div>
      ) : (
        <div id="section">
          <div id="pianoRollContainer">
            {pianoRolls?.map((notes, i) => (
              <PianoRoll
                key={i}
                notes={notes}
                onClick={() => selectPianorollIndex(i)}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default PianoRollDisplay;
