import { useState } from 'react';
import styles from './taskbar/Taskbar.module.css';

export function Taskbar() {
  const [startMenuIsOpen, setStartMenuIsOpen] = useState<boolean>(false);
  function toggleStartMenu(){
    setStartMenuIsOpen(!startMenuIsOpen);
  }
  return  <div className={styles.startBg}>
            <div 
              className={styles.startBtn}
              onClick={toggleStartMenu}
            ></div>
            {startMenuIsOpen ? <div className={styles.startMenu}>start menu</div> : null}
          </div>
}