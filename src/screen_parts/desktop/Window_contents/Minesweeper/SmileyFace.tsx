import { useEffect, useState } from "react";
import smiley_happy_pressed from "../../../../assets/minesweeper/smileys/smiley_happy_pressed.svg";
import smiley_happy_unpressed from "../../../../assets/minesweeper/smileys/smiley_happy_unpressed.svg";
import smiley_sunglasses from "../../../../assets/minesweeper/smileys/smiley_sunglasses.svg";
import smiley_sad from "../../../../assets/minesweeper/smileys/smiley_sad.svg";
import smiley_scared from "../../../../assets/minesweeper/smileys/smiley_scared.svg";

interface SmileyFaceProps{
  roundFinished: boolean,
  hasWon: boolean,
  leftBtnIsPressed: boolean,
  onSmileyClick: ()=>void
}

export function SmileyFace({roundFinished, hasWon, leftBtnIsPressed, onSmileyClick}: SmileyFaceProps): JSX.Element {
  const [image, setImage] = useState<string>(smiley_happy_unpressed);
  const [smileyIsPressed, setSmileyIsPressed] = useState<boolean>(false);
  useEffect(()=>{
    if (roundFinished) {
      if (hasWon) setImage(smiley_sunglasses);
      if (!hasWon) setImage(smiley_sad);
      return;
    }
    if (leftBtnIsPressed) return setImage(smiley_scared);
    if (smileyIsPressed) return setImage(smiley_happy_pressed)
    setImage(smiley_happy_unpressed);
  },[roundFinished, hasWon, leftBtnIsPressed, smileyIsPressed]);
  return <div 
    className="flex justify-center"
    onClick={onSmileyClick}
    onMouseDown={()=>setSmileyIsPressed(true)}
    onMouseUp={()=>setSmileyIsPressed(false)}
    onMouseLeave={()=>setSmileyIsPressed(false)}
  >
    <img style={{pointerEvents: 'none'}} src={image} alt="" />
  </div>
}