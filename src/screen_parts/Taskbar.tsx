import styles from './taskbar/Taskbar.module.css';
import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import { TaskbarBtn } from "./taskbar/TaskbarBtn";
import { TaskbarMenu } from "./taskbar/TaskbarMenu";
import { Clippy } from "./taskbar/Clippy";
import { useEffect, useState } from 'react';

import soundImg from '../assets/images/icons/soundSmall.png'
import greenShield from '../assets/images/icons/green_shield.png'

export function Taskbar() {
  const taskbarBtnsArr = useSelector((state: RootState) => state.screen.activeTaskbarButtons);
  const [time, setTime] = useState<Date>((new Date()));
  useEffect(()=>{
    const timeCheckInterval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timeCheckInterval);
  }, []);
  return  <div className={styles.startBg}>
            {/* start btn with menu */}
            <TaskbarMenu />
            {/* taskbar buttons */}
            <div className={styles.taskbar_buttons_tray}>
              {taskbarBtnsArr.map((btnData, index)=>{
                return <TaskbarBtn
                  name={btnData.name}
                  isFocused={btnData.isFocused}
                  key={index}
                />
              })}
            </div>
            <div className={styles.taskbar_right}>
              <img className="footer__icon" src={soundImg} alt="" />
              <img className="footer__icon" src={greenShield} alt="" />
              <div className={styles.taskbar_time}>
                {time.toLocaleTimeString('lt', { hour: '2-digit', minute: '2-digit' })}
              </div>
              <Clippy />
            </div>
          </div>
}