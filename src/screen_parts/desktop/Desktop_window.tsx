import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { TestXPCounter } from '../taskbar/Test_XP_counter';
import { bringWindowToFront, closeWindow } from '../../state/screen/screenSlice';
import { AppDispatch, RootState } from "../../state/store";
import "xp.css/dist/XP.css";


interface DesktopWindowProps {
  windowName: string,
  zIndexVal: number
}


export function DesktopWindow({windowName, zIndexVal}: DesktopWindowProps): JSX.Element {
  const [windowPosition, setWindowPosition] = useState({ x: 200, y: 400 });
  const dispatch = useDispatch<AppDispatch>()
  const windowNode = useRef(null);

  const handleMouseDown = (event: React.MouseEvent) => {
    if (!windowNode.current) return;
    const rect = (windowNode.current as Element)?.getBoundingClientRect(); 
    if (!rect) return;
    const offsetX = event.clientX - rect.left;
    const offsetY = event.clientY - rect.top;
    dispatch(bringWindowToFront(windowName));
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    function handleMouseMove(event: MouseEvent) {
      setWindowPosition({
        x: event.clientX - offsetX,
        y: event.clientY - offsetY,
      });
    }
    function handleMouseUp() {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }
  };
  function handleCloseWindow(event: React.MouseEvent<HTMLButtonElement>){
    if (event.button !== 0) return;
    dispatch(closeWindow(windowName));
  }

  return <div
    ref={windowNode} 
    className="window"
    style={{
      position: 'absolute',
      width: '300px',
      height: '300px',
      top: `${windowPosition.y}px`,
      left: `${windowPosition.x}px`,
      zIndex: zIndexVal + 1,
      backgroundColor: windowName
    }}
    onMouseDown={handleMouseDown}
  >
      <div className="title-bar">
        <div className="title-bar-text">{windowName}</div>
        <div className="title-bar-controls">
          <button aria-label="Minimize" />
          <button aria-label="Maximize" />
          <button onClick={handleCloseWindow} aria-label="Close" />
        </div>
      </div>
  </div>
}