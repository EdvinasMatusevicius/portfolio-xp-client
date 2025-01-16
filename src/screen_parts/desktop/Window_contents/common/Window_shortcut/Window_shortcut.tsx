import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../../state/store";
import { openNewRouteInWindow } from "../../../../../state/screen/screenSlice";
import { useEffect, useState } from "react";

interface DesktopShortcutProps{
  routeName: string,
  windowName: string
}
export function WindowShortcut({windowName, routeName}: DesktopShortcutProps): JSX.Element{
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
        justifyContent: "center",
        alignItems: 'center',
        flexDirection: 'column',
        color: 'black'
      }}
    >
      <img 
        src={image} 
        alt=""
        style={{
          width: '60%',
          height: '60%'
        }}
        />
        <div>{routeName}</div>
        {/* <div>{shortcutText}</div>   TODO CREATE TS FILE WITH WINDOW SHORTCUT DATA and uncouple route name from img name   */}
    </div>
}