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

  const onMouseUp = useCallback((e) => {
    isSelecting.current = false;
    currentSelectionStart.current = undefined;
    currentSelectionStartX.current = undefined;
  }, []);

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
