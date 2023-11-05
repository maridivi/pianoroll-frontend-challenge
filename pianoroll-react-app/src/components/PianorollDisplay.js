import React, { useContext, useEffect, useMemo, useState } from "react";
import "../styles.css";
import PianoRoll from "./Pianoroll";
import { AppContext } from "../App";

const PianoRollDisplay = ({ displayState }) => {
  const [allNotes, setData] = useState(null);

  const { selectedPianorollIndex, setSelectedPianorollIndex } =
    useContext(AppContext);

  function selectPianorollIndex(index) {
    setSelectedPianorollIndex(index);
  }

  useEffect(() => {
    loadPianoRollData();
  }, []);

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
      notes.push({
        notes: allNotes.slice(rollIndex * 60, rollIndex * 60 + 60),
        id: rollIndex,
      });
    }
    return notes;
  }, [allNotes]);

  return (
    <div id="section">
      {typeof selectedPianorollIndex !== "undefined" ? (
        <div className="main-view">
          <div className="selected-pianoroll">
            <PianoRoll
              key={pianoRolls[selectedPianorollIndex].id}
              notes={pianoRolls[selectedPianorollIndex].notes}
              onClick={() => selectPianorollIndex(selectedPianorollIndex)}
              isSelected
              rollId={pianoRolls[selectedPianorollIndex].id}
            />
          </div>
          <div className="pianorolls">
            {pianoRolls
              ?.filter(({ id }) => {
                return id !== selectedPianorollIndex;
              })
              ?.map(({ notes, id }) => (
                <PianoRoll
                  key={id}
                  notes={notes}
                  onClick={() => selectPianorollIndex(id)}
                  rollId={id}
                />
              ))}
          </div>
        </div>
      ) : (
        <div id="pianoRollContainer">
          {pianoRolls?.map(({ notes, id }) => (
            <PianoRoll
              key={id}
              notes={notes}
              onClick={() => selectPianorollIndex(id)}
              rollId={id}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PianoRollDisplay;
