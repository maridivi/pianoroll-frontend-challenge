import { useCallback, useEffect, useRef, useState } from "react";

export default function useSelectNotesRange(svgRef, options) {
  // Destructure the isActive property from options, defaulting to an empty object if options is not provided
  const { isActive } = options ?? {};

  // Create a ref to track if the user is currently selecting
  const isSelecting = useRef(false);

  // Create a state for the current selection
  const [selection, setSelection] = useState();

  // Create refs for the start of the current selection (in both relative and pixel coordinates)
  const currentSelectionStart = useRef(); // 0 to 1
  const currentSelectionStartX = useRef(); // px

  const onMouseDown = useCallback(
    (e) => {
      // If the user is already selecting, do nothing
      if (isSelecting.current) return;

      // Calculate the relative start of the selection
      const cursorX = e.clientX;
      const svgRect = svgRef.current.getBoundingClientRect();
      const start = (cursorX - svgRect.left) / svgRect.width;

      // Reset the selection and update the start refs
      setSelection();
      currentSelectionStart.current = start;
      currentSelectionStartX.current = start * svgRect.width;

      isSelecting.current = true;
    },
    [svgRef]
  );

  const onMouseMove = useCallback(
    (e) => {
      if (!isSelecting.current) return;

      // Calculate the relative end of the selection
      const cursorX = e.clientX;
      const svgRect = svgRef.current.getBoundingClientRect();

      // If the cursor is to the right of the start, update the end of the selection
      // Otherwise, update the start of the selection
      if (cursorX >= currentSelectionStartX.current) {
        const end = (cursorX - svgRect.left) / svgRect.width;
        setSelection(() => ({
          start: currentSelectionStart.current,
          end,
        }));
      } else {
        const start = (cursorX - svgRect.left) / svgRect.width;
        setSelection(() => ({
          end: currentSelectionStart.current,
          start,
        }));
      }
    },
    [isSelecting, svgRef]
  );

  // Define a callback to calculate the number of notes in the current selection
  const getNotesNumber = useCallback(() => {
    // If there is no SVG or selection, do nothing
    if (!svgRef.current || !selection) return;

    // Get all note elements in the SVG
    const notesEls = Array.from(
      svgRef.current.querySelectorAll(".note-rectangle")
    );

    // Filter the notes based on their x and width attributes
    const filteredEls = notesEls.filter((el) => {
      const x = parseFloat(el.getAttribute("x"));
      const width = parseFloat(el.getAttribute("width"));
      const end = x + width;

      // If the note starts or ends within the selection, include it
      if (x >= selection.start && x <= selection.end) {
        return true;
      } else if (end >= selection.start && end <= selection.end) {
        return true;
      }

      return false;
    });

    // Log the number of notes in the selection
    console.log(`There are ${filteredEls.length} notes in the selection`);
  }, [selection, svgRef]);

  const onMouseUp = useCallback(
    (e) => {
      // Log the selection and calculate the number of notes in it
      console.log(
        `User selected from ${selection.start.toFixed(
          2
        )} to ${selection.end.toFixed(2)}`
      );
      getNotesNumber();
      isSelecting.current = false;
      currentSelectionStart.current = undefined;
      currentSelectionStartX.current = undefined;
    },
    [getNotesNumber, selection]
  );

  // Add event listeners when isActive is true
  useEffect(() => {
    if (!isActive) return;

    const svg = svgRef.current;
    if (svg) {
      svg.addEventListener("mousedown", onMouseDown);
      svg.addEventListener("mousemove", onMouseMove);
      svg.addEventListener("mouseup", onMouseUp);

      // Clean up the event listeners when the component unmounts or isActive changes
      return () => {
        svg.removeEventListener("mousedown", onMouseDown);
        svg.removeEventListener("mousemove", onMouseMove);
        svg.removeEventListener("mouseup", onMouseUp);
      };
    }
  }, [svgRef, onMouseDown, onMouseMove, onMouseUp, isActive]);

  // Return the current selection
  return { selection };
}
