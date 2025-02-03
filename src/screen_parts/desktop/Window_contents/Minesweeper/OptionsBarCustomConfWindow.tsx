import { useState } from "react"
import { DifficultyPreset } from "../../../../types/minesweeper.interface";

interface OptionsBarCustomConfWindowProps{
  setIsWindowOpen: (isOpen: boolean) => void
  setDifficulty: (difficultyName: string, customArgs?: DifficultyPreset) => void
}

export function OptionsBarCustomConfWindow({
  setIsWindowOpen,
  setDifficulty
}: OptionsBarCustomConfWindowProps) : JSX.Element {
  const [height, setHeight] = useState<string>('9');
  const [width, setWidth] = useState<string>('9');
  const [mines, setMines] = useState<string>('10');
  function onNumbInputChange( inputName: string, value: string ) {
    if (inputName === 'height') setHeight(value);
    if (inputName === 'width') setWidth(value);
    if (inputName === 'mines') setMines(value);
  }
  function confirmSelection(){
    if (
      !isStringNaturalNumber(height) ||
      !isStringNaturalNumber(width) ||
      !isStringNaturalNumber(mines)
    ) return;
    setDifficulty('custom', {
      width: Number(width),
      height: Number(height),
      mines: Number(mines),
    });
    setIsWindowOpen(false);
  }
  function isStringNaturalNumber(value: string): boolean{
    // Check if the string is not empty and consists only of digits
    if (/^\d+$/.test(value)) {
      const number = Number(value);
      return Number.isInteger(number) && number >= 1;
    }
    return false;
  }
  return <div 
    className="absolute left-[5%] top-[200%]"
    style={{ width: '16rem' }}
  >
    <div 
      className="window"
    >
      <div style={{ height: '1.6rem', userSelect: 'none' }} className="title-bar">
        <div 
          className="text-white ml-1"
        >Custom</div>
        <div className="title-bar-controls">
          <button onClick={()=>setIsWindowOpen(false)} aria-label="Close" />
        </div>
      </div>
      <div style={{
        padding: '2rem 1rem',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around'
      }}>
        <div>
          <div className="flex justify-between mb-1">
            <span className="mr-2">Height:</span> 
            <input style={{width: '3rem'}} value={height} onChange={(e)=>onNumbInputChange('height', e.target.value)} type="text"  />
          </div>
          <div className="flex justify-between mb-1">
            <span className="mr-2">Width:</span> 
            <input style={{width: '3rem'}} value={width} onChange={(e)=>onNumbInputChange('width', e.target.value)} type="text"  />
          </div>
          <div className="flex justify-between ite">
            <span className="mr-2">Mines:</span> 
            <input style={{width: '3rem'}} value={mines} onChange={(e)=>onNumbInputChange('mines', e.target.value)} type="text"  />
          </div>
        </div>
        <div className="flex flex-col justify-between">
          <button className="button focused bg-[#f7f6ee]" onClick={confirmSelection}>OK</button>
          <button className="button bg-[#f7f6ee]" onClick={()=>setIsWindowOpen(false)}>Cancel</button>
        </div>
      </div>
    </div>
  </div>
}