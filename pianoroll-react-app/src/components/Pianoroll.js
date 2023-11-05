import React, { useEffect, useRef, useState } from "react";
import "../styles.css";
import useRenderPianoRoll from "../utils/useRenderPianoRoll";
import useSelectNotesRange from "../utils/useSelectNotesRange";

const PianoRoll = ({ notes, onClick, isSelected, rollId }) => {
  const svgRef = useRef(null);

  useRenderPianoRoll(svgRef, notes);

  const { selection } = useSelectNotesRange(svgRef, {
    isActive: isSelected,
  });

  return (
    <div id="pianoroll-card">
      <div className="piano-roll-card">
        <div style={{ position: "relative", lineHeight: 0 }}>
          <svg
            ref={svgRef}
            className="piano-roll-svg"
            viewBox="0 0 1 1"
            preserveAspectRatio="none"
            onClick={onClick}
          >
            <div className="cursor"></div>
          </svg>
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
      </div>
      <h2>Piano roll number {rollId}</h2>
    </div>
  );
};

export default PianoRoll;
