import React, { useEffect, useRef, useState } from "react";
import "../styles.css";
import useRenderPianoRoll from "../utils/useRenderPianoRoll";
import useSelectNotesRange from "../utils/useSelectNotesRange";

const PianoRoll = ({ notes, onClick, isSelected }) => {
  const svgRef = useRef(null);

  useRenderPianoRoll(svgRef, notes);

  const { selection } = useSelectNotesRange(svgRef, {
    isActive: isSelected,
  });

  return (
    <div className="piano-roll-card" style={{ position: "relative" }}>
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
            position: "absolute",
            left: selection.start * 100 + "%",
            right: (1 - selection.end) * 100 + "%",
            top: 0,
            bottom: "1%",
            border: "1px solid red",
            pointerEvents: "none",
          }}
        />
      )}
    </div>
  );
};

export default PianoRoll;
