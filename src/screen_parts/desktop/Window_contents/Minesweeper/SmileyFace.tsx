import smiley_happy_pressed from "../../../../assets/minesweeper/smileys/smiley_happy_pressed.svg";
import smiley_happy_unpressed from "../../../../assets/minesweeper/smileys/smiley_happy_unpressed.svg";

interface SmileyFaceProps{
  onSmileyClick: ()=>void
}

export function SmileyFace({onSmileyClick}: SmileyFaceProps): JSX.Element {
  return <div className="w-full h-full flex justify-center" onClick={onSmileyClick}>
    <img src={smiley_happy_unpressed} alt="" />
  </div>
}