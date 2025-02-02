import { useState } from 'react';
import { DifficultyPreset } from '../../../../types/minesweeper.interface';
import styles from './Minesweeper.module.css';


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
        <div></div>
        <div className='h-full flex items-center'>New</div>
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
    </div>
  </div>
}