import { useDispatch } from "react-redux";
import { AppDispatch } from "../../state/store";
import { openWindow } from "../../state/screen/screenSlice";
import { useEffect, useState } from "react";

interface DesktopShortcutProps{
  allowDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  drag: (e: React.DragEvent<HTMLDivElement>) => void;
  drop: (e: React.DragEvent<HTMLDivElement>) => void;
  shortcutName: string | null;
  shortcutText: string | null,
  elementId: number;
}
export function DesktopShortcut(
  {allowDrop, drag, drop, shortcutName, shortcutText, elementId}: DesktopShortcutProps
): JSX.Element{
  const dispatch = useDispatch<AppDispatch>();
  function onDoubleClickHandler(e: React.MouseEvent<HTMLElement>) {
    if (e.detail !== 2) return;
    if (shortcutName === null) return;
    dispatch(openWindow(shortcutName))
  }

  useEffect(()=>{
    getImg(shortcutName)
  }, [shortcutName]);

  const [image, setImage] = useState<string | undefined>()
  const getImg = async (shortcutName: string | null)=>{
    if (shortcutName === null) return;
    const response = await import(`../../assets/images/icons/${shortcutName}.png`)
    setImage(response.default)
  }

  function onTouchStart() {
    console.log('SHORTCUT HAVE BEEN PRESSED')
  }

  if (shortcutName)
    return <div
      id={`${elementId}`}
      draggable="true"
      onDragStart={drag}
      onDragOver={allowDrop}
      onDrop={drop}
      onDoubleClick={onDoubleClickHandler}
      onTouchStart={()=>onTouchStart()}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: 'center',
        flexDirection: 'column',
        color: 'white',
        textShadow: '1px 1px 2px black'
      }}
    >
      <img 
        src={image} 
        alt=""
        style={{
          width: '40%',
          height: '40%',
          objectFit: 'contain'
        }}
        />
        <div>{shortcutText}</div>
    </div>
  return <div onDragOver={allowDrop} onDrop={drop} id={`${elementId}`}></div>
}