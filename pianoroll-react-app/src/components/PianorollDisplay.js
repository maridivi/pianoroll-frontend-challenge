import React, { useContext, useEffect, useMemo, useState } from "react";
import "../styles.css";
import PianoRoll from "./Pianoroll";
import { SelectedPianorollContext } from "../App";

const PianoRollDisplay = () => {
  const [allNotes, setData] = useState(null);

  // Get the selectedPianorollIndex and setSelectedPianorollIndex from the SelectedPianorollContext
  const { selectedPianorollIndex, setSelectedPianorollIndex } = useContext(
    SelectedPianorollContext
  );

  // Define a function to select a piano roll index
  function selectPianorollIndex(index) {
    setSelectedPianorollIndex(index);
  }

  // Load the piano roll data when the component mounts
  useEffect(() => {
    loadPianoRollData();
  }, []);

  // Fetch piano roll data
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

  // Create the piano rolls from allNotes
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
      {/* Render main view if the user selects a piano roll */}
      {typeof selectedPianorollIndex !== "undefined" ? (
        <div className="main-view">
          {/* Render selected piano roll */}
          <div className="selected-pianoroll">
            <PianoRoll
              key={pianoRolls[selectedPianorollIndex].id}
              notes={pianoRolls[selectedPianorollIndex].notes}
              onClick={() => selectPianorollIndex(selectedPianorollIndex)}
              isSelected
              rollId={pianoRolls[selectedPianorollIndex].id}
            />
          </div>
          {/* Render a list with the other piano rolls */}
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
        {
          /* Render grid view with all the piano rolls if the user does not select a piano roll */
        }(
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
        )
      )}
    </div>
  );
};

export default PianoRollDisplay;
