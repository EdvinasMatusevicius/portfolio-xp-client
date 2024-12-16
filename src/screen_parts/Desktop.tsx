import { useEffect, useState } from "react";
import { DesktopShortcut } from "./Desktop_shortcut";
import { DesktopWindow } from "./Desktop_window";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state/store";

export function Desktop() {
  const backgroundSquarePx = 100;

  const [shortcuts, setShortcuts] = useState<(string | null)[]>(['brown', 'yellow', 'red', 'grey', 'black']);
  const [draggedItemId, setDraggedItemId] = useState<number>(0);
  const openWindows = useSelector((state: RootState) => state.screen.windowsLayeringOrder)
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const result = calculateGridTracks();
    const totalAvailableSquares = result.columns * result.rows;
    const extendedArray = [...shortcuts, ...Array(totalAvailableSquares - shortcuts.length).fill(null)];
    setShortcuts(extendedArray);
  }, []);

  function allowDrop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
  }

  function drag(event: React.DragEvent<HTMLDivElement>) {
    const draggedElId = Number(event.currentTarget.id)
    setDraggedItemId(draggedElId); // Store the ID of the dragged element
  }

  function drop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    const draggedElId = (event.target as HTMLDivElement).id;
    if (!draggedElId) return; 
    const dropTargetIndex = Number(draggedElId);
    if (shortcuts[dropTargetIndex]) return; // some other item already at this index
    console.log(dropTargetIndex)
    moveShortcutToSquare(dropTargetIndex)
  }

  function moveShortcutToSquare(moveToSquareIndex: number) {
    const newShortcutArr: (string | null)[] = [...shortcuts];
    const shortcutToMove = shortcuts[draggedItemId];
    newShortcutArr[draggedItemId] = null;
    newShortcutArr[moveToSquareIndex] = shortcutToMove;
    setShortcuts(newShortcutArr);
  }

  function calculateGridTracks() {
    const container = document.querySelector('#desktop-grid-container');
    if (!container) {
      console.warn('Container element with ID "desktop-grid-container" not found.');
      return { columns: 0, rows: 0 };
    }
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;

    const columns = Math.floor(containerWidth / backgroundSquarePx);
    const rows = Math.floor(containerHeight / backgroundSquarePx);

    return { columns, rows };
  }

  const gridStyle = {
    display: 'grid',
    width: '100%',
    height: '100%',
    gridTemplateColumns: `repeat(auto-fill, minmax(${backgroundSquarePx}px, 1fr))`,
    gridTemplateRows: `repeat(auto-fill, minmax(${backgroundSquarePx}px, 1fr))`,
    gridAutoFlow: 'column',
  }
  return <div id='desktop-grid-container' style={{
    position: 'relative',
    ...gridStyle
  }}>
    {shortcuts.map((shortcut, index) => {
      return <DesktopShortcut 
        allowDrop={allowDrop}
        drag={drag}
        drop={drop}
        shortcutName={shortcut}
        elementId={index}
        key={index}
      />
    })}
    {openWindows.map((windowName, index) => {
      return <DesktopWindow 
        windowName={windowName}
        key={index}
      />
    })}
  </div>
}