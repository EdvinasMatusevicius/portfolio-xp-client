import { useEffect, useRef } from 'react';
import styles from './Taskbar.module.css';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../state/store";
import { setStartMenuState, toggleStartMenu } from "../../state/screen/screenSlice";
export function TaskbarMenu(){
  const menuRef = useRef(null);
  const dispatch = useDispatch<AppDispatch>();
  const startMenuIsOpen = useSelector((state: RootState) => state.screen.startMenuIsOpen);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  function handleClickOutside (event: MouseEvent) {
    if (menuRef.current && (menuRef.current as HTMLElement).contains(event.target as Node))
      return;
    else
      dispatch(setStartMenuState(false));
  };
  function onClickStartBtn(){
    dispatch(toggleStartMenu())
  }
  return <div ref={menuRef}>
    <div 
      className={styles.startBtn}
      onClick={onClickStartBtn}
    ></div>
    {startMenuIsOpen ? 
      <div
        className={styles.startMenu}
      >start menu</div> 
      : null
    } 
  </div>
}