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
import { OptionsBar } from './Minesweeper/OptionsBar';
import { DifficultyPreset } from '../../../types/minesweeper.interface';
const difficultyPresets: {[presetName: string]: DifficultyPreset} = {
  'Beginner': {width: 10, height: 10, mines:10},
  'Intermediate': {width: 15, height: 15, mines:20},
  'Expert': {width: 20, height: 20, mines:30}
}

export function MineSweeper(): JSX.Element {

  const [tilesGraph, setTileGraph] = useState<{[index: string]: TileData}>({});
  const [currentDifficulty, setCurrentDifficulty] = useState<string>(Object.keys(difficultyPresets)[0]);
  const [hasWon, setHasWon] = useState<boolean>(false);
  const [roundFinished, setRoundFinished] = useState<boolean>(false);
  const [leftButtonIsPressed, setLeftButtonIsPressed] = useState<boolean>(false);
  // const [rightButtonIsPressed, setRightButtonIsPressed] = useState<boolean>(false); //TO D IF NOT NEEDED DELETE COMMENTED OUT INES
  const [tilesMarkedAsMined, setTilesMarkedAsMined] = useState<number>(0);
  const [mouseHoverOnTileIndex, setMouseHoverOnTileIndex] = useState<number|null>(null);
  const [gridDimensions, setGridDimensions] = useState<{width: number, height: number}>({width: 0, height: 0});
  const [minesCount, setGridMinesCount] = useState<number>(1);
  const [timeOnFirstTileClick, setTimeOnFirstTileClick] = useState<number|null>(null);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout>();
  
  useEffect(()=>{
    selectGameDifficulty(currentDifficulty);
    document.addEventListener('mouseup', globalMouseClickRelease);
    return () => document.removeEventListener('mouseup', globalMouseClickRelease);
  }, []);
  useEffect(()=>{
    resetBoard();
  }, [currentDifficulty, gridDimensions, minesCount]);
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
      // setRightButtonIsPressed(false);
      if (tileData.hidden) return markTile(index);
    }
    if (event.button === 0) {
      if (!timeOnFirstTileClick) startTimer();
      setLeftButtonIsPressed(false)
      if (tileData.hidden) return showTile(index);
    }
  }
  function onLongTouchEvent(tileData: TileData , index: number) {
    if (roundFinished) return;
    if (tileData.hidden) return markTile(index);
  }
  function onTileClickPress(event: React.MouseEvent<HTMLDivElement>, tileData: TileData, index: number) {
    if (roundFinished) return;
    // if (tileData.hidden && event.button === 2) return setRightButtonIsPressed(true);
    if (tileData.hidden && event.button === 0) {
      setMouseHoverOnTileIndex(index);
      return setLeftButtonIsPressed(true);
    }
  }
  //handles when mouse is released out of game bounds
  function globalMouseClickRelease() {
    setMouseHoverOnTileIndex(null);
    setLeftButtonIsPressed(false);
    // setRightButtonIsPressed(false);
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
    setCurrentTime(0);
  }
  function selectGameDifficulty(difficultyName: string, customArgs?: DifficultyPreset) {
    const difficultyArgs: DifficultyPreset | undefined = difficultyName === 'custom' ? customArgs : difficultyPresets[difficultyName];
    if (!difficultyArgs) return console.log('invalid difficulty name'); 
    const maxEdgeLength = 80;
    const width = difficultyArgs.width > maxEdgeLength ? maxEdgeLength : difficultyArgs.width;
    const height = difficultyArgs.height > maxEdgeLength ? maxEdgeLength : difficultyArgs.height;
    const totalTiles = width * height;
    const mines = difficultyArgs.mines >= totalTiles ? totalTiles - 1 : difficultyArgs.mines;
    setCurrentDifficulty(difficultyName);
    setGridDimensions({width, height});
    setGridMinesCount(mines);
  }

  const shortcutsWrapperStyles = {
    display: 'grid',
    gridTemplateColumns: `repeat(${gridDimensions.width}, 1.5rem)`,
    gridTemplateRows: `repeat(${gridDimensions.height}, 1.5rem)`,
    margin: '0.5rem',
    border: '3px inset white'
  } as CSSProperties;

  return <div>
    <OptionsBar 
      currentDifficulty={currentDifficulty}
      resetBoard={resetBoard}
      setDifficulty={selectGameDifficulty}
    />
    <div style={{
      userSelect: 'none',
      border: '3px inset white',
      padding: '5px',
      backgroundColor: '#c0c0c0'
    }}>
      {/* smiley */}
      <div 
        className='flex justify-around'
        style={{
          border: '3px inset white',
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
      <div className='flex justify-center'>
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
              onLongTouchEvent={onLongTouchEvent}
              isPressed={leftButtonIsPressed && mouseHoverOnTileIndex === parseInt(key)}
              pressEventActTime={1000}
            />
          })}
        </div>
      </div>
    </div>
  </div>
}