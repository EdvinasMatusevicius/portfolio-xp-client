import styles from './taskbar/Taskbar.module.css';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state/store";
import { TaskbarBtn } from "./taskbar/TaskbarBtn";
import { TaskbarMenu } from "./taskbar/TaskbarMenu";

export function Taskbar() {
  const taskbarBtnsArr = useSelector((state: RootState) => state.screen.activeTaskbarButtons);
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
          </div>
}