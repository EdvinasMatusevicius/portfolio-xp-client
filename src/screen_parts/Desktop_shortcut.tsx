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
  if (shortcutName)
    return <div
      id={`${elementId}`}
      draggable="true"
      onDragStart={drag}
      onDragOver={allowDrop}
      onDrop={drop}
      style={{ backgroundColor: shortcutName }}
    ></div>
  return <div onDragOver={allowDrop} onDrop={drop} id={`${elementId}`}></div>
}