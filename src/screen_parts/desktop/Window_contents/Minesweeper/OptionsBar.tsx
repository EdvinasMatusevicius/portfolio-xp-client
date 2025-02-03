import { useState } from 'react';
import { DifficultyPreset } from '../../../../types/minesweeper.interface';
import styles from './Minesweeper.module.css';
import { OptionsBarCustomConfWindow } from './OptionsBarCustomConfWindow';


interface OptionsBarProps{
  currentDifficulty: string,
  resetBoard: () => void,
  setDifficulty: (difficultyName: string, customArgs?: DifficultyPreset) => void
}

export function OptionsBar({
  currentDifficulty,
  resetBoard,
  setDifficulty
}: OptionsBarProps): JSX.Element {
  
  const predefinedDifficulties = ['Beginner','Intermediate','Expert'];
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [customConfWindowOpen, setCustomConfWindowOpen] = useState<boolean>(false);
  function setCustomConfWindowState(isOpen: boolean) {
    if (isOpen) setDropdownOpen(false);
    setCustomConfWindowOpen(isOpen);
  }
  return <div style={{
    width: '100%',
    backgroundColor: '#ece9d8',
    position: 'relative'
  }}>
    <div 
      onClick={()=> setDropdownOpen(!dropdownOpen)}
      className={styles.options_bar_tab}
    >
      Game
    </div>
      {/* dropdown */}
    <div 
      style={{display: dropdownOpen ? 'block' : 'none'}}
      className={styles.options_bar_dropdown_wrapper}
    >
  
      <div 
        className={styles.options_bar_dropdown_btn}
        onClick={resetBoard}
      >
        <div className='border-b border-grey-500'></div>
        <div className='h-full flex items-center border-b border-grey-500'>
          New
        </div>
      </div>
      {
        predefinedDifficulties.map((difficulty, i)=>{
          return <div 
            className={styles.options_bar_dropdown_btn}
            onClick={()=>setDifficulty(difficulty)}
            key={i}
          >
            {
              currentDifficulty === difficulty ?
                <div className='h-full flex items-center justify-center'>✓</div> :
                <div></div>
            } 
            <div className='h-full flex items-center'>
              {difficulty}
            </div>
          </div>
        })
      }
      <div 
        className={styles.options_bar_dropdown_btn}
        onClick={()=>setCustomConfWindowState(true)}
      >
        <div className='border-t border-grey-500'></div>
        <div className='h-full flex items-center border-t border-grey-500'>
          Custom
        </div>
      </div>
    </div>
    {customConfWindowOpen && (
      <OptionsBarCustomConfWindow 
        setIsWindowOpen={setCustomConfWindowState}
        setDifficulty={setDifficulty}
      />
    )}
  </div>
}