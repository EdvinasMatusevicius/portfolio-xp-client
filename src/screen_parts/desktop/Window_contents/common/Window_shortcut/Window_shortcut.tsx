import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../../state/store";
import { openNewRouteInWindow } from "../../../../../state/screen/screenSlice";
import { useEffect, useState } from "react";

interface WindowShortcutProps{
  routeName: string,
  windowName: string,
  text: string
}
export function WindowShortcut({windowName, routeName, text}: WindowShortcutProps): JSX.Element{
  const dispatch = useDispatch<AppDispatch>();

  function onDoubleClickHandler(e: React.MouseEvent<HTMLElement>) {
    if (e.detail !== 2) return;
    dispatch(openNewRouteInWindow({routeName, windowName}));
  }

  useEffect(()=>{
    getImg(routeName)
  }, [routeName]);

  const [image, setImage] = useState<string | undefined>()
  const getImg = async (shortcutName: string | null)=>{
    if (shortcutName === null) return;
    const response = await import(`../../../../../assets/images/icons/${shortcutName}.png`)
    setImage(response.default)
  }

    return <div
      onDoubleClick={onDoubleClickHandler}
      style={{
        display: "flex",
        justifyContent: "start",
        alignItems: 'center',
        flexDirection: 'row',
        color: 'black',
        userSelect: 'none'
      }}
    >
      <img 
        src={image} 
        alt=""
        style={{
          width: '3rem',
          height: '3rem'
        }}
        />
        <div>{text}</div>
        {/* <div>{shortcutText}</div>   TODO CREATE TS FILE WITH WINDOW SHORTCUT DATA and uncouple route name from img name   */}
    </div>
}