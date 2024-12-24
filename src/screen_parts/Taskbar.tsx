import { useState } from 'react';
import styles from './taskbar/Taskbar.module.css';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state/store";
import { toggleStartMenu } from "../state/screen/screenSlice";
import icons from '../assets/images/icons/289(32x32).png'

export function Taskbar() {
  const startMenuIsOpen = useSelector((state: RootState) => state.screen.startMenuIsOpen)
  const dispatch = useDispatch<AppDispatch>();
  function onClick(){
    dispatch(toggleStartMenu())
  }
  return  <div className={styles.startBg}>
            {/* start btn with menu */}
            <div 
              className={styles.startBtn}
              onClick={onClick}
            ></div>
            {startMenuIsOpen ? <div className={styles.startMenu}>start menu</div> : null}
            {/* taskbar buttons */}
            <div className={styles.taskbar_buttons_tray}>
              <div className={`${styles.taskbar_button} ${styles.unfocused}`}>
                <img src={icons} style={{height: '50%'}}/>
                just some app
              </div>
              <div className={`${styles.taskbar_button} ${styles.unfocused}`}>2</div>
              <div className={`${styles.taskbar_button} ${styles.unfocused}`}>3</div>
              <div className={`${styles.taskbar_button} ${styles.unfocused}`}>4</div>
              <div className={`${styles.taskbar_button} ${styles.unfocused}`}>5</div>
              <div className={`${styles.taskbar_button} ${styles.focused}`}></div>
            </div>
          </div>
}