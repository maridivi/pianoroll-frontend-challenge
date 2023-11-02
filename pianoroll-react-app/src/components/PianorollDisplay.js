import React, { useEffect, useMemo, useState } from "react";
import PianoRoll from "./Pianoroll";
import "../styles.css";
import MainView from "./MainView";

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

    const notesSvg = [];

    for (let rollIndex = 0; rollIndex < 20; rollIndex++) {
      const start = rollIndex * 60;
      const end = start + 60;
      const notes = allNotes.slice(start, end);

      const pianoRollSvg = (
        <div key={rollIndex} className="piano-roll-card">
          <div className="description">
            {`This is a piano roll number ${rollIndex}`}
          </div>
          <PianoRoll
            notes={notes}
            onClick={() => selectPianorollIndex(rollIndex)}
          />
        </div>
      );
      notesSvg.push(pianoRollSvg);
    }

    return notesSvg;
  }, [allNotes]);

  const selectedPianoroll = pianoRolls
    ? pianoRolls[selectedPianorollIndex]
    : null;

  return (
    <>
      <div id="buttonContainer">
        <button id="loadCSV" onClick={loadPianoRollData}>
          "Load Piano Rolls!"
        </button>
      </div>
      {selectedPianoroll ? (
        <MainView
          selectedPianoroll={selectedPianoroll}
          pianorolls={pianoRolls.filter((roll) => {
            return roll !== selectedPianoroll;
          })}
        />
      ) : (
        <div id="section">
          <div id="pianoRollContainer">{pianoRolls}</div>
        </div>
      )}
    </>
  );
};

export default PianoRollDisplay;
