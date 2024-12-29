import styles from './taskbar/Taskbar.module.css';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state/store";
import { toggleStartMenu } from "../state/screen/screenSlice";
import { TaskbarBtn } from "./taskbar/TaskbarBtn";

export function Taskbar() {
  const startMenuIsOpen = useSelector((state: RootState) => state.screen.startMenuIsOpen)
  const taskbarBtnsArr = useSelector((state: RootState) => state.screen.activeTaskbarButtons)
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
              {taskbarBtnsArr.map((btnData, index)=>{
                return <TaskbarBtn
                  name={btnData.name}
                  isFocused={btnData.isFocused}
                  key={index}
                />
              })}
            </div>
          </div>
}