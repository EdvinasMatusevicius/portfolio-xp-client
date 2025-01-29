import { TileData } from "../../../../types/minesweeper.interface"

import hidden_normal from "../../../../assets/minesweeper/tiles/hidden_normal.svg";
import hidden_marked_mined from "../../../../assets/minesweeper/tiles/hidden_marked_mined.svg";
import hidden_marked_question_mark from "../../../../assets/minesweeper/tiles/hidden_marked_question_mark.svg";
import showing_empty from "../../../../assets/minesweeper/tiles/showing_empty.svg";
import showing_mined_normal from "../../../../assets/minesweeper/tiles/showing_mined_normal.svg";
import showing_mined_exploded from "../../../../assets/minesweeper/tiles/showing_mined_exploded.svg";
import tile_1 from "../../../../assets/minesweeper/tiles/01.svg";
import tile_2 from "../../../../assets/minesweeper/tiles/02.svg";
import tile_3 from "../../../../assets/minesweeper/tiles/03.svg";
import tile_4 from "../../../../assets/minesweeper/tiles/04.svg";
import tile_5 from "../../../../assets/minesweeper/tiles/05.svg";
import tile_6 from "../../../../assets/minesweeper/tiles/06.svg";
import tile_7 from "../../../../assets/minesweeper/tiles/07.svg";
import tile_8 from "../../../../assets/minesweeper/tiles/08.svg";
import { useEffect, useState } from "react";

const tileNumbsImgs: {[index: string]: string} = {
  1: tile_1,
  2: tile_2,
  3: tile_3,
  4: tile_4,
  5: tile_5,
  6: tile_6,
  7: tile_7,
  8: tile_8,
}

interface TileProps{
  tileData: TileData,
  index: number,
  onTitleClickRelease: (event: React.MouseEvent<HTMLDivElement> , tileData: TileData, index: number) => void
  onTitleClickPress: (event: React.MouseEvent<HTMLDivElement> , tileData: TileData, index: number) => void
  onTileLeave: () => void
}

export function Tile({
  tileData,
  index,
  onTitleClickRelease,
  onTitleClickPress,
  onTileLeave
}: TileProps): JSX.Element {
  const [tileImg, setTileImg] = useState<string>();
  useEffect(()=>{
    let tileImg;
    if (tileData.hidden) {
      if (!tileData.marked) tileImg = hidden_normal;
      if (tileData.marked === 'mined') tileImg = hidden_marked_mined;
      if (tileData.marked === 'questionMark') tileImg = hidden_marked_question_mark;
    } else if (!tileData.hidden) {
      if (tileData.mined) tileImg = showing_mined_normal;
      if (tileData.mined && tileData.mineExploded) tileImg = showing_mined_exploded;
      if (!tileData.mined && !tileData.minedNeighborCount) tileImg = showing_empty;
      if (!tileData.mined && tileData.minedNeighborCount) tileImg = tileNumbsImgs[tileData.minedNeighborCount];
    }
    setTileImg(tileImg)
  }, [tileData]);
  
  return <div 
    style={{userSelect: 'none'}}
    className="w-full h-full"
    onMouseDown={(e)=>onTitleClickPress(e, tileData, index)}
    onMouseUp={(e)=>onTitleClickRelease(e, tileData, index)}
    onMouseLeave={()=>onTileLeave()}
    onContextMenu={(e)=>e.preventDefault()} //prevents right click menu from opening 
  >
    <img style={{pointerEvents: 'none'}} className="w-full h-full" src={tileImg} alt="My Logo" />
  </div>

}