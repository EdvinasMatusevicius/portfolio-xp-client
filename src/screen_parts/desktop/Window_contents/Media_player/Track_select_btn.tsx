import { useEffect, useState } from 'react'
import styles from './Media_player.module.css'
interface TrackSelectBtnProps{
  name: string,
  trackIndex: number,
  highlightedIndex: number | null,
  selectedIndex: number,
  onClickHandler: (index: number) => void,
  onDoubleClickHandler: (index: number) => void
}
export function TrackSelectBtn({
  name,
  trackIndex,
  highlightedIndex,
  selectedIndex,
  onClickHandler,
  onDoubleClickHandler
}: TrackSelectBtnProps): JSX.Element {
  const [isHighlighted, setIsHighlighted] = useState<boolean>(false);
  const [isSelected, setIsSelected] = useState<boolean>(false);
  useEffect(()=>{
    setIsHighlighted(trackIndex === highlightedIndex);
    setIsSelected(trackIndex === selectedIndex);
  }, [selectedIndex, highlightedIndex]);
  return <div 
    className={
      `${styles.track_select_btn} ${isHighlighted ? styles.track_select_highlighted : ''} ${isSelected ? styles.track_select_selected : ''}`
    } 
    onClick={()=>onClickHandler(trackIndex)} 
    onDoubleClick={()=>onDoubleClickHandler(trackIndex)}
  >
    {name}
  </div>
}