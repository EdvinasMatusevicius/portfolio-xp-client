import { CSSProperties, useEffect, useState } from 'react';
import { TileData } from '../../../types/minesweeper.interface';
import { buildGridGraph,
  getGridGraphOnIndexShow, 
  populateEmptyWithMines, 
  populateGraphWithNumbers,
  getGridGraphOnHiddenTileRightClick
} from './Minesweeper/helperFunctions';
import { SmileyFace } from './Minesweeper/SmileyFace';
import { Tile } from './Minesweeper/Tile';
import styles from './Minesweeper/Minesweeper.module.css'

export function MineSweeper(): JSX.Element {
  const [tilesGraph, setTileGraph] = useState<{[index: string]: TileData}>({});
  const [hasWon, setHasWon] = useState<boolean>(false);
  const [roundFinished, setRoundFinished] = useState<boolean>(false);
  const [leftButtonIsPressed, setLeftButtonIsPressed] = useState<boolean>(false);
  const [rightButtonIsPressed, setRightButtonIsPressed] = useState<boolean>(false);
  const [tilesMarkedAsMined, setTilesMarkedAsMined] = useState<number>(0);
  const [gridTileCount, setGridTileCount] = useState<number>(25);
  const [minesCount, setGridMinesCount] = useState<number>(2);
  useEffect(()=>{
    resetBoard();
  }, []);
  useEffect(()=> {
    let allEmptyTilesAreVisible = true; 
    let minesMarked = 0;
    for (const tileIndex in tilesGraph) {
      const tileData = tilesGraph[tileIndex];
      if (tileData.mineExploded) {
        setRoundFinished(true);
        return;
      }
      if (!tileData.mined && tileData.hidden) allEmptyTilesAreVisible = false;
      if (tileData.marked === 'mined') minesMarked += 1;
    }
    if (allEmptyTilesAreVisible && minesMarked === minesCount) {
      setHasWon(true);
      setRoundFinished(true);
    }
    setTilesMarkedAsMined(minesMarked);
  }, [tilesGraph]);

  function buildFullGridGraph(tilesCount: number, minesCunt: number) {
    const graph = buildGridGraph(tilesCount);
    populateEmptyWithMines(graph, minesCunt);
    populateGraphWithNumbers(graph);
    return graph;
  }
  function onTileClickRelease(event: React.MouseEvent<HTMLDivElement>, tileData: TileData, index: number) {
    if (roundFinished) return;
    if (event.button === 2) {
      setRightButtonIsPressed(false);
      if (tileData.hidden) return markTile(index);
    }
    if (event.button === 0) {
      setLeftButtonIsPressed(false)
      if (tileData.hidden) return showTile(index);
    }
  }
  function onTileClickPress(event: React.MouseEvent<HTMLDivElement>, tileData: TileData, index: number) {
    if (roundFinished) return;
    if (tileData.hidden && event.button === 2) return setRightButtonIsPressed(true);
    if (tileData.hidden && event.button === 0) return setLeftButtonIsPressed(true);
  }
  function onTileLeave() {
    if (leftButtonIsPressed) setLeftButtonIsPressed(false);
    if (rightButtonIsPressed) setRightButtonIsPressed(false);
  }
  function showTile(tileIndex: number) {
    if (!tilesGraph[tileIndex]?.hidden) return;
    const newGraph = getGridGraphOnIndexShow(tilesGraph, tileIndex);
    setTileGraph(newGraph);
  }
  function markTile(tileIndex: number) {
    if (!tilesGraph[tileIndex]?.hidden) return;
    const newGraph = getGridGraphOnHiddenTileRightClick(tilesGraph, tileIndex);
    setTileGraph(newGraph);
  }

  function resetBoard() {
    setHasWon(false);
    setRoundFinished(false);
    const builtGridGraph = buildFullGridGraph(gridTileCount, minesCount);
    setTileGraph(builtGridGraph);
  }

  const shortcutsWrapperStyles = {
    display: 'grid',
    gridTemplateColumns: `repeat(${Math.sqrt(Object.keys(tilesGraph).length)}, 5rem)`,
    gridTemplateRows: `repeat(${Math.sqrt(Object.keys(tilesGraph).length)}, 5rem)`,
  } as CSSProperties;

  return <div style={{userSelect: 'none'}}>
    {/* smiley */}
    <SmileyFace 
      onSmileyClick={resetBoard}
      roundFinished={roundFinished}
      hasWon={hasWon}
      leftBtnIsPressed={leftButtonIsPressed}
    />

    <div>has WON:{JSON.stringify(hasWon && roundFinished)}</div>
    <div>has LOST:{JSON.stringify(!hasWon && roundFinished)}</div>
    <div>FLAGS LEFT:{minesCount - tilesMarkedAsMined}</div>
    <div>LEFT BTN IS PRESSED: {JSON.stringify(leftButtonIsPressed)}</div>
    <div>RIGHT BTN IS PRESSED: {JSON.stringify(rightButtonIsPressed)}</div>

    {/* tile grid */}
    <div style={{...shortcutsWrapperStyles}}>
      {Object.entries(tilesGraph).map(([key, tileData])=>{
        return <Tile 
          tileData={tileData} 
          key={key}
          index={parseInt(key)}
          onTitleClickRelease={onTileClickRelease}
          onTitleClickPress={onTileClickPress}
          onTileLeave={onTileLeave}
        />
      })};
    </div>
  </div>
}