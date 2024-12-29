import styles from './Taskbar.module.css';
import { useDispatch } from "react-redux";
import { bringWindowToFront } from '../../state/screen/screenSlice';
import { AppDispatch } from "../../state/store";
import icons from '../../assets/images/icons/289(32x32).png'

interface BtnProps {
  name: string,
  isFocused: boolean
}

export function TaskbarBtn({name, isFocused}: BtnProps){
  const dispatch = useDispatch<AppDispatch>();
  return (
    <div 
      className={`${styles.taskbar_button} ${isFocused ? styles.focused : styles.unfocused}`}
      onClick={()=>dispatch(bringWindowToFront(name))}
    >
      <img src={icons} style={{height: '50%'}}/>
      {name}
    </div>
  )
}