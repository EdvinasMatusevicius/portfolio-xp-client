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
import { NumberLEDBoard } from './Minesweeper/NumberLEDBoard';

export function MineSweeper(): JSX.Element {

  const [tilesGraph, setTileGraph] = useState<{[index: string]: TileData}>({});
  const [hasWon, setHasWon] = useState<boolean>(false);
  const [roundFinished, setRoundFinished] = useState<boolean>(false);
  const [leftButtonIsPressed, setLeftButtonIsPressed] = useState<boolean>(false);
  const [rightButtonIsPressed, setRightButtonIsPressed] = useState<boolean>(false);
  const [tilesMarkedAsMined, setTilesMarkedAsMined] = useState<number>(0);
  const [mouseHoverOnTileIndex, setMouseHoverOnTileIndex] = useState<number|null>(null);
  const [gridDimensions, setGridDimensions] = useState<{width: number, height: number}>({width: 5, height: 10});
  const [minesCount, setGridMinesCount] = useState<number>(25);
  const [timeOnFirstTileClick, setTimeOnFirstTileClick] = useState<number|null>(null);
  const [currentTime, setCurrentTime] = useState<number|null>(null);
  const [timerInterval, setTimerInterval] = useState<number>(0);
  
  useEffect(()=>{
    resetBoard();
    document.addEventListener('mouseup', globalMouseClickRelease);
    return () => document.removeEventListener('mouseup', globalMouseClickRelease);
  }, []);
  useEffect(()=> {
    let allEmptyTilesAreVisible = true; 
    let minesMarked = 0;
    for (const tileIndex in tilesGraph) {
      const tileData = tilesGraph[tileIndex];
      if (tileData.mineExploded) {
        clearInterval(timerInterval);
        setRoundFinished(true);
        return;
      }
      if (!tileData.mined && tileData.hidden) allEmptyTilesAreVisible = false;
      if (tileData.marked === 'mined') minesMarked += 1;
    }
    if (allEmptyTilesAreVisible && minesMarked === minesCount) {
      setHasWon(true);
      clearInterval(timerInterval);
      setRoundFinished(true);
    }
    setTilesMarkedAsMined(minesMarked);
  }, [tilesGraph]);

  function buildFullGridGraph() {
    const graph = buildGridGraph(gridDimensions.width, gridDimensions.height);
    populateEmptyWithMines(graph, minesCount);
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
      if (!timeOnFirstTileClick) startTimer();
      setLeftButtonIsPressed(false)
      if (tileData.hidden) return showTile(index);
    }
  }
  function onTileClickPress(event: React.MouseEvent<HTMLDivElement>, tileData: TileData, index: number) {
    if (roundFinished) return;
    if (tileData.hidden && event.button === 2) return setRightButtonIsPressed(true);
    if (tileData.hidden && event.button === 0) {
      setMouseHoverOnTileIndex(index);
      return setLeftButtonIsPressed(true);
    }
  }
  //handles when mouse is released out of game bounds
  function globalMouseClickRelease() {
    setMouseHoverOnTileIndex(null);
    setLeftButtonIsPressed(false);
    setRightButtonIsPressed(false);
  }
  function onTileLeave() {
    setMouseHoverOnTileIndex(null);
  }
  function onTileEnter(index: number) {
    setMouseHoverOnTileIndex(index);
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
    endTimer();
    setHasWon(false);
    setRoundFinished(false);
    const builtGridGraph = buildFullGridGraph();
    setTileGraph(builtGridGraph);
  }

  function startTimer() {
    if (timerInterval) endTimer();
    setCurrentTime(new Date().getTime());
    setTimeOnFirstTileClick(new Date().getTime());
    const interval = setInterval(() => {
      setCurrentTime(new Date().getTime());
    }, 1000);
    setTimerInterval(interval);
  }
  function endTimer() {
    if (timerInterval) clearInterval(timerInterval);
    setTimeOnFirstTileClick(null);
    setCurrentTime(null);
  }

  const shortcutsWrapperStyles = {
    display: 'grid',
    gridTemplateColumns: `repeat(${gridDimensions.width}, 1.5rem)`,
    gridTemplateRows: `repeat(${gridDimensions.height}, 1.5rem)`,
    margin: '0.5rem',
    border: '3px inset',
  } as CSSProperties;

  return <div style={{
    userSelect: 'none',
    border: '3px outset',
    padding: '5px',
    backgroundColor: '#c0c0c0'
  }}>
    {/* smiley */}
    <div 
      className='flex justify-around'
      style={{
        border: '3px inset',
        backgroundColor: '#c0c0c0',
        margin: '0.5rem',
        padding: '0.3rem'
      }}
    >
      <NumberLEDBoard number={minesCount - tilesMarkedAsMined}/>
      <SmileyFace 
        onSmileyClick={resetBoard}
        roundFinished={roundFinished}
        hasWon={hasWon}
        leftBtnIsPressed={leftButtonIsPressed}
      />
      <NumberLEDBoard number={
        timeOnFirstTileClick ?
          Math.round((currentTime - timeOnFirstTileClick) / 1000) :
          0
        }/>
    </div>

    {/* tile grid */}
    <div style={{...shortcutsWrapperStyles}}>
      {Object.entries(tilesGraph).map(([key, tileData])=>{
        return <Tile 
          tileData={tileData} 
          key={key}
          index={parseInt(key)}
          roundFinished={roundFinished}
          onTitleClickRelease={onTileClickRelease}
          onTitleClickPress={onTileClickPress}
          onTileEnter={onTileEnter}
          onTileLeave={onTileLeave}
          isPressed={leftButtonIsPressed && mouseHoverOnTileIndex === parseInt(key)}
        />
      })}
    </div>
  </div>
}