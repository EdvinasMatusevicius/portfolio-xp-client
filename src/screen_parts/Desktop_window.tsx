import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { TestXPCounter } from './Test_XP_counter';
import { bringExistingToFront } from '../state/screen/screenSlice';
import { AppDispatch, RootState } from "../state/store";

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
    dispatch(bringExistingToFront(windowName));
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

  return <div
    ref={windowNode} 
    style={{
      backgroundColor: windowName,
      position: 'absolute',
      width: '300px',
      height: '300px',
      top: `${windowPosition.y}px`,
      left: `${windowPosition.x}px`,
      zIndex: zIndexVal + 1
    }}
    onMouseDown={handleMouseDown}
  >
        <div
      style={{
        height: "100%",
        width: "100%"
      }}
    > {`z-index: ${zIndexVal+1}, name: ${windowName}`}
      <TestXPCounter 
        name={windowName}
      />
    </div>
  </div>
}