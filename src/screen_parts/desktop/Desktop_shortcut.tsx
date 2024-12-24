import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../state/store";
import { openWindow } from "../../state/screen/screenSlice";

interface DesktopShortcutProps{
  allowDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  drag: (e: React.DragEvent<HTMLDivElement>) => void;
  drop: (e: React.DragEvent<HTMLDivElement>) => void;
  shortcutName: string | null;
  elementId: number;
}
export function DesktopShortcut(
  {allowDrop, drag, drop, shortcutName, elementId}: DesktopShortcutProps
): JSX.Element{
  const dispatch = useDispatch<AppDispatch>();

  function onDoubleClickHandler(e: React.MouseEvent<HTMLElement>) {
    if (e.detail !== 2) return;
    if (shortcutName === null) return;
    dispatch(openWindow(shortcutName))
  }
  if (shortcutName)
    return <div
      id={`${elementId}`}
      draggable="true"
      onDragStart={drag}
      onDragOver={allowDrop}
      onDrop={drop}
      onDoubleClick={onDoubleClickHandler}
      style={{ backgroundColor: shortcutName }}
    ></div>
  return <div onDragOver={allowDrop} onDrop={drop} id={`${elementId}`}></div>
}