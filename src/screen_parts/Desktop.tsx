import { CSSProperties, useEffect, useState } from "react";
import { DesktopShortcut } from "./desktop/Desktop_shortcut";
import { DesktopWindow } from "./desktop/Desktop_window";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import { DesktopDimensionsData } from '../types/index';

export function Desktop() {
  const backgroundSquarePx = 100;
  const [shortcuts, setShortcuts] = useState<(string | null)[]>(['about', 'my_documents', 'recycle_bin']); //personal project, work stuff and cv can go to docs
  const [draggedItemId, setDraggedItemId] = useState<number>(0);
  const [desktopDimensions, setDesktopDimensions] = useState<DesktopDimensionsData>({width: 0, height: 0});
  const openWindows = useSelector((state: RootState) => state.screen.windowsLayeringOrder);
  const windowsData = useSelector((state: RootState) => state.screen.windowsData);

  useEffect(() => {
    const desktopDimensions = getDesktopDimensions();
    const result = calculateGridTracks(desktopDimensions);
    const totalAvailableSquares = result.columns * result.rows;
    const extendedArray = [...shortcuts, ...Array(totalAvailableSquares - shortcuts.length).fill(null)];
    setDesktopDimensions(desktopDimensions);
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
    moveShortcutToSquare(dropTargetIndex)
  }

  function moveShortcutToSquare(moveToSquareIndex: number) {
    const newShortcutArr: (string | null)[] = [...shortcuts];
    const shortcutToMove = shortcuts[draggedItemId];
    newShortcutArr[draggedItemId] = null;
    newShortcutArr[moveToSquareIndex] = shortcutToMove;
    setShortcuts(newShortcutArr);
  }

  function getDesktopDimensions(): DesktopDimensionsData {
    const container = document.querySelector('#desktop-grid-container');
    if (!container) {
      console.warn('Container element with ID "desktop-grid-container" not found.');
      return {width: 0, height: 0}
    }
    return {width: container.clientWidth, height: container.clientHeight};
  }

  function calculateGridTracks(dimensions: DesktopDimensionsData) {
    if (!dimensions.height || !dimensions.width) return { columns: 0, rows: 0 }
    const columns = Math.floor(dimensions.width / backgroundSquarePx);
    const rows = Math.floor(dimensions.height / backgroundSquarePx);
    return { columns, rows };
  }

  const gridStyle = {
    display: 'grid',
    width: '100%',
    height: '100%',
    gridTemplateColumns: `repeat(auto-fill, minmax(${backgroundSquarePx}px, 1fr))`,
    gridTemplateRows: `repeat(auto-fill, minmax(${backgroundSquarePx}px, 1fr))`,
    gridAutoFlow: 'column',
    position: 'relative',
  } as CSSProperties
  return <div id='desktop-grid-container' style={{...gridStyle}}>
    {shortcuts.map((shortcut, index) => {
      return <DesktopShortcut 
        allowDrop={allowDrop}
        drag={drag}
        drop={drop}
        shortcutName={shortcut ? windowsData[shortcut].name : null}
        shortcutText={shortcut ? windowsData[shortcut].text : null}
        elementId={index}
        key={index}
      />
    })}
    {openWindows.map((windowData, index) => {
      return <DesktopWindow
        windowName={windowData.name}
        key={windowData.id}
        isMinimized={windowData.isMinimized}
        zIndexVal={index}
        desktopDimensions={desktopDimensions}
      />
    })}
  </div>
}