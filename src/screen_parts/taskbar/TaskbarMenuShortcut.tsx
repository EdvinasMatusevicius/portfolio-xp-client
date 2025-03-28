import { useEffect, useState } from "react";
import styles from './Taskbar.module.css';
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../state/store";
import { openWindow } from "../../state/screen/screenSlice";



export function TaskbarMenuShortcut({windowName, text}: {windowName: string, text: string}): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  function onClickHandler() {
    dispatch(openWindow(windowName))
  }

  useEffect(()=>{
    getImg(windowName)
  }, [windowName]);

  const [image, setImage] = useState<string | undefined>()
  const getImg = async (shortcutName: string | null)=>{
    if (shortcutName === null) return;
    const response = await import(`../../assets/images/icons/${shortcutName}.png`)
    setImage(response.default)
  }
  return <div 
    onClick={onClickHandler}
    className={styles.taskbar_menu_shortcut}
  >
    <img src={image} alt="" style={{maxWidth: '2rem', marginRight: '1rem'}}/>
    <span>{text}</span>
  </div>
}