import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { bringWindowToFront, closeWindow, minimizeWindow } from '../../state/screen/screenSlice';
import { AppDispatch } from "../../state/store";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { DesktopDimensionsData, WindowDimensions } from "../../types/index";
import { WindowHeader } from "./Window_header";
import { WindowContent } from "./Window_content";
import "xp.css/dist/XP.css";



interface DesktopWindowProps {
  windowName: string,
  zIndexVal: number,
  isMinimized?: boolean,
  desktopDimensions: DesktopDimensionsData,
  hideHeader: boolean | undefined
}


export function DesktopWindow({windowName, zIndexVal, isMinimized, desktopDimensions, hideHeader}: DesktopWindowProps): JSX.Element {
  const dispatch = useDispatch<AppDispatch>()
  const windowNode = useRef(null);
  const windowsData = useSelector((state: RootState) => state.screen.windowsData);
  const currentWindowData = useSelector((state: RootState) => state.screen.windowsLayeringOrder.filter(winData=>winData.name === windowName)[0]);
  const [windowIsMaximized, setWindowIsMaximized] = useState<boolean>(false);
  const [oldWindowPosAfterMaximize, setOldWinPosAfterMaximize] = useState({ x: 0, y: 0});
  const [windowPosition, setWindowPosition] = useState({ 
    x: 50 + (Math.random()*100),
    y: 50 + (Math.random()*50)
  });
  const [visitedWindowNestedRoutes, setNestedRoutes] = useState<string[]>([]);
  const [currentRoute, setCurrentRoute] = useState<string>('');
  const [windowDimensions, setWindowDimensions] = useState<null|WindowDimensions>(null);

  useEffect(()=>{
    const nestedRoutesHistory = currentWindowData.nestedRoutesHistory;
    const currentWinRoute = nestedRoutesHistory[nestedRoutesHistory.length - 1];
    setNestedRoutes(nestedRoutesHistory);
    setCurrentRoute(currentWinRoute);
    if (!windowIsMaximized) {
      const defaultWidth = windowsData[currentWinRoute]?.windowDimensions?.width ?? 0;
      const defaultHeight = windowsData[currentWinRoute]?.windowDimensions?.height ?? 0;
      const windowDimensions: DesktopDimensionsData = {
        width: Math.min(window.innerWidth, defaultWidth),
        height: Math.min(window.innerHeight, defaultHeight)
      }
      if (defaultWidth > window.innerWidth) setWindowPosition(prevPos=>({...prevPos, x: 0}));
      if (defaultHeight > window.innerHeight) setWindowPosition(prevPos=>({...prevPos, y: 0}));
      setWindowDimensions(windowDimensions)
    }
    if (windowIsMaximized) setWindowDimensions(desktopDimensions);
  }, [currentWindowData, desktopDimensions]);

  function useTouchDrag(event: React.TouchEvent<HTMLElement>) {
    if (!windowNode.current || windowIsMaximized) return;

    const rect = (windowNode.current as Element)?.getBoundingClientRect();
    if (!rect) return;

    const touch = event.touches[0];
    const offsetX = touch.clientX - rect.left;
    const offsetY = touch.clientY - rect.top;
    dispatch(bringWindowToFront(windowName));
    document.addEventListener('touchmove', handleTouchMove, { passive: false }); // Passive false is needed for preventDefault if you want to stop scrolling
    document.addEventListener('touchend', handleTouchEnd);
    document.addEventListener('touchcancel', handleTouchEnd);
  
  
  
    function handleTouchMove(event: TouchEvent) {
      const touch = event.touches[0];
      setWindowPosition({
        x: touch.clientX - offsetX,
        y: touch.clientY - offsetY,
      });
    }

    function handleTouchEnd() {
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
      document.removeEventListener('touchcancel', handleTouchEnd);
    }
  };


  function handleDragStart(event: React.MouseEvent) {
    if (!windowNode.current || windowIsMaximized) return;
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
    event.stopPropagation();
  }
  function handleMinimizeWindow(event: React.MouseEvent<HTMLButtonElement>){
    if (event.button !== 0) return;
    dispatch(minimizeWindow(windowName));
    event.stopPropagation();
  }
  function toggleMaximizeWindow(){
    dispatch(bringWindowToFront(windowName));
    if (!windowIsMaximized) {
      setOldWinPosAfterMaximize(windowPosition);
      setWindowPosition({ x: 0, y: 0 });
      setWindowDimensions({ width: desktopDimensions.width, height: desktopDimensions.height});
    }
    if (windowIsMaximized) {
      const defaultWindowDimensions = windowsData[currentRoute]?.windowDimensions;
      if (defaultWindowDimensions)
        setWindowDimensions({width: defaultWindowDimensions.width, height: defaultWindowDimensions.height});
      setWindowPosition(oldWindowPosAfterMaximize);
    }
    setWindowIsMaximized(!windowIsMaximized);
  }

  return <div
    ref={windowNode} 
    className="window"
    style={{
      position: 'absolute',
      top: `${windowPosition.y}px`,
      left: `${windowPosition.x}px`,
      zIndex: zIndexVal + 1,
      backgroundColor: "#edead7",
      display: "grid",
      gridAutoRows: 'auto auto 1fr',
      ...(windowsData[currentRoute]?.usesScrollbar ? {overflow: 'hidden',} : {}),
      ...(windowDimensions ? {width: `${windowDimensions.width}px`,} : {}),
      ...(windowDimensions ? {height: `${windowDimensions.height}px`} : {}),
      ...(isMinimized ? {display: 'none'} : {})
    }}
  >
      <div 
        style={{ height: '1.6rem', userSelect: 'none' }}
        className="title-bar"
        onMouseDown={handleDragStart}
        onTouchStart={useTouchDrag}
      >
        <div 
          className="text-white ml-1"
        >{windowsData[currentRoute]?.text}</div>
        <div className="title-bar-controls">
          <button onMouseDown={handleMinimizeWindow} aria-label="Minimize" />
          {
            !windowsData[currentRoute]?.disableFullScreen && (
              <button onMouseDown={toggleMaximizeWindow} aria-label={`${windowIsMaximized ? 'Restore' : 'Maximize'}`} />
            )
          }
          <button onMouseDown={handleCloseWindow} aria-label="Close" />
        </div>
      </div>
      {hideHeader ? <div></div> : <WindowHeader windowName={windowName} visitedRoutes={visitedWindowNestedRoutes} />}
      <WindowContent  
        windowName={windowName} 
        currentRoute={currentRoute}
        windowIsMaximized={windowIsMaximized}
        windowDimensions={windowDimensions}
      />
  </div>
}