import { useRef, useState } from "react";

interface DesktopWindowProps {
  windowName: string
}

export function DesktopWindow({windowName}: DesktopWindowProps): JSX.Element {
  const [windowPosition, setWindowPosition] = useState({ x: 200, y: 400 });
  const windowNode = useRef(null);

  const handleMouseDown = (event: React.MouseEvent) => {
    if (!windowNode.current) return;
    const rect = (windowNode.current as Element)?.getBoundingClientRect(); 
    if (!rect) return;
    const offsetX = event.clientX - rect.left;
    const offsetY = event.clientY - rect.top;

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
      backgroundColor: 'orange',
      position: 'absolute',
      width: '300px',
      height: '300px',
      top: `${windowPosition.y}px`,
      left: `${windowPosition.x}px`,
    }}
    onMouseDown={handleMouseDown}
  >{windowName}</div>
}