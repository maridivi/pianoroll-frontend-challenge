import React, { useEffect, useRef } from "react";
import "../styles.css";
import useRenderPianoRoll from "../utils/useRenderPianoRoll";

const PianoRoll = ({ notes, onClick }) => {
  const svgRef = useRef(null);

  useRenderPianoRoll(svgRef, notes);

  return (
    <svg
      ref={svgRef}
      className="piano-roll-svg"
      viewBox="0 0 1 1"
      preserveAspectRatio="none"
      onClick={onClick}
    />
  );
};

export default PianoRoll;
