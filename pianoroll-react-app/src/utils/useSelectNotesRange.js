import { useCallback, useEffect, useRef, useState } from "react";

export default function useSelectNotesRange(svgRef, options) {
  const { isActive } = options ?? {};

  const isSelecting = useRef(false);

  const [selection, setSelection] = useState();

  const currentSelectionStart = useRef(); // 0 to 1
  const currentSelectionStartX = useRef(); // px

  const onMouseDown = useCallback(
    (e) => {
      if (isSelecting.current) return;

      const cursorX = e.clientX;
      const svgRect = svgRef.current.getBoundingClientRect();
      const start = (cursorX - svgRect.left) / svgRect.width;
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

      const cursorX = e.clientX;
      const svgRect = svgRef.current.getBoundingClientRect();

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

  const getNotesNumber = useCallback(() => {
    if (!svgRef.current || !selection) return;

    const notesEls = Array.from(
      svgRef.current.querySelectorAll(".note-rectangle")
    );
    const filteredEls = notesEls.filter((el) => {
      const x = parseFloat(el.getAttribute("x"));
      const width = parseFloat(el.getAttribute("width"));
      const end = x + width;

      if (x >= selection.start && x <= selection.end) {
        return true;
      } else if (end >= selection.start && end <= selection.end) {
        return true;
      }

      return false;
    });
    console.log(filteredEls.length);
  }, [selection, svgRef]);

  const onMouseUp = useCallback(
    (e) => {
      console.log(selection);
      getNotesNumber();
      isSelecting.current = false;
      currentSelectionStart.current = undefined;
      currentSelectionStartX.current = undefined;
    },
    [getNotesNumber, selection]
  );

  useEffect(() => {
    if (!isActive) return;

    const svg = svgRef.current;
    if (svg) {
      svg.addEventListener("mousedown", onMouseDown);
      svg.addEventListener("mousemove", onMouseMove);
      svg.addEventListener("mouseup", onMouseUp);

      return () => {
        svg.removeEventListener("mousedown", onMouseDown);
        svg.removeEventListener("mousemove", onMouseMove);
        svg.removeEventListener("mouseup", onMouseUp);
      };
    }
  }, [svgRef, onMouseDown, onMouseMove, onMouseUp, isActive]);

  return { selection };
}
