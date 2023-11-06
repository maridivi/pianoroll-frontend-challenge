import React, { useRef } from "react";
import "../styles.css";
import useRenderPianoRoll from "../utils/useRenderPianoRoll";
import useSelectNotesRange from "../utils/useSelectNotesRange";

const PianoRoll = ({ notes, onClick, isSelected, rollId }) => {
  const svgRef = useRef(null);

  // Use the custom hook to render the piano roll
  useRenderPianoRoll(svgRef, notes);

  // Use the custom hook to select a range of notes
  const { selection } = useSelectNotesRange(svgRef, {
    isActive: isSelected,
  });

  return (
    <div className="piano-roll-card" data-is-active={!!isSelected}>
      <div style={{ position: "relative", lineHeight: 0 }}>
        <svg
          ref={svgRef}
          className="piano-roll-svg"
          viewBox="0 0 1 1"
          preserveAspectRatio="none"
          onClick={onClick}
        />
        {/* Render the selected range*/}
        {selection && (
          <div
            style={{
              left: selection.start * 100 + "%",
              right: (1 - selection.end) * 100 + "%",
            }}
            className="selection"
          />
        )}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          paddingTop: 8,
          alignItems: "flex-start",
          gap: "5px",
        }}
      >
        <h2>Piano Roll #{rollId}</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </div>
    </div>
  );
};

export default PianoRoll;
