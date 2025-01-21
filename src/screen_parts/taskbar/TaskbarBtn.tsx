import styles from './Taskbar.module.css';
import { useDispatch, useSelector } from "react-redux";
import { bringWindowToFront, minimizeWindow } from '../../state/screen/screenSlice';
import { AppDispatch, RootState } from "../../state/store";
import icons from '../../assets/images/icons/289(32x32).png'
import { useEffect, useState } from 'react';

interface BtnProps {
  name: string,
  isFocused: boolean
}

export function TaskbarBtn({name, isFocused}: BtnProps){
  const windowsData = useSelector((state: RootState) => state.screen.windowsData);
  const activeWindowsArr = useSelector((state: RootState) => state.screen.windowsLayeringOrder);
  const [currentWindowRoute, setCurrentWindowRoute] = useState<string>('');
  const dispatch = useDispatch<AppDispatch>();
  useEffect(()=>{
    const btnWindowRoutesArr = activeWindowsArr.find((activeWin)=>activeWin.name === name)?.nestedRoutesHistory;
    if (!btnWindowRoutesArr) return;
    setCurrentWindowRoute(btnWindowRoutesArr[btnWindowRoutesArr?.length - 1])
  }, [activeWindowsArr, name])
  function onClickHandler() {
    if (isFocused) dispatch(minimizeWindow(name));
    else dispatch(bringWindowToFront(name));
  }
  return (
    <div 
      className={`${styles.taskbar_button} ${isFocused ? styles.focused : styles.unfocused}`}
      onClick={onClickHandler}
    >
      <img src={icons} style={{height: '50%'}}/>
      {windowsData[currentWindowRoute]?.text}
    </div>
  )
}