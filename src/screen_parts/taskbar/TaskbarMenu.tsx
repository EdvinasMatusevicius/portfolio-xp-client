import { useEffect, useRef } from 'react';
import styles from './Taskbar.module.css';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../state/store";
import { setStartMenuState, toggleStartMenu } from "../../state/screen/screenSlice";
import userImg from '../../assets/images/icons/user.png';
import logOff from '../../assets/images/icons/logOff.png';
import turnOff from '../../assets/images/icons/turnOff.png';
import { TaskbarMenuShortcut } from './TaskbarMenuShortcut';

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
      // wrapper because border radius bugged with pos absolute
      <div style={{
        position: 'absolute',
        width: '350px',
        bottom: '100%'
      }}>
        {/* make grid here */}
        <div className={styles.startMenu}> 
          <div  className={styles.startMenuTop}>
            <img className={styles.startMenuTopImg} src={userImg} alt="avatar" />
            <span className={styles.startMenuTopText}>User</span>
          </div>
          <div className={styles.startMenuMiddle}>
            <TaskbarMenuShortcut windowName='about' text='About' />
            <TaskbarMenuShortcut windowName='personal_projects' text='Personal projects' />
            <TaskbarMenuShortcut windowName='minesweeper' text='Minesweeper' />
            <TaskbarMenuShortcut windowName='media_player' text='Media player' />
            <TaskbarMenuShortcut windowName='email' text='Email' />
          </div>
          <div className={styles.startMenuBottom}>
            <div className='flex items-center justify-center m-2 font-xp'>
              <img src={logOff} alt="logOff" className='grayscale'/>
              <span className='mx-1'>Log Off</span>
            </div>
            <div className='flex items-center justify-center font-xp'>
              <img src={turnOff} alt="logOff" className='grayscale'/>
              <span className='mx-1'>Turn Off Computer</span>
            </div>
          </div>
        </div>
      </div>
      : null
    } 
  </div>
}