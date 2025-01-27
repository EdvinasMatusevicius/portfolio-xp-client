import { CSSProperties, useEffect, useState } from 'react';
import { TileData } from '../../../types/minesweeper.interface';
import { buildGridGraph, getGridGraphOnIndexShow, populateEmptyWithMines, populateGraphWithNumbers } from './Minesweeper/helperFunctions';
import { SmileyFace } from './Minesweeper/SmileyFace';
import { Tile } from './Minesweeper/Tile';
import styles from './Minesweeper/Minesweeper.module.css'

export function MineSweeper(): JSX.Element {
  const [tilesGraph, setTileGraph] = useState<{[index: string]: TileData}>({});
  const [gridTileCount, setGridTileCount] = useState<number>(25);
  const [minesCount, setGridMinesCount] = useState<number>(2);
  useEffect(()=>{
    // 
    resetBoard();
    // 
  }, []);
  function buildFullGridGraph(tilesCount: number, minesCunt: number) {
    const graph = buildGridGraph(tilesCount);
    populateEmptyWithMines(graph, minesCunt);
    populateGraphWithNumbers(graph);
    return graph;
  }
  function onTileClick(event: React.MouseEvent<HTMLDivElement>, tileData: TileData, index: number) {
    if (tileData.hidden) showTile(index);
  }

  function showTile(tileIndex: number) {
    if (!tilesGraph[tileIndex]?.hidden) return;
    const newGraph = getGridGraphOnIndexShow(tilesGraph, tileIndex);
    setTileGraph(newGraph);
  }

  function resetBoard() {
    const builtGridGraph = buildFullGridGraph(gridTileCount, minesCount);
    setTileGraph(builtGridGraph);
  }

  const shortcutsWrapperStyles = {
    display: 'grid',
    gridTemplateColumns: `repeat(${Math.sqrt(Object.keys(tilesGraph).length)}, 5rem)`,
    gridTemplateRows: `repeat(${Math.sqrt(Object.keys(tilesGraph).length)}, 5rem)`,
  } as CSSProperties;

  return <div>
    {/* smiley */}
    <SmileyFace 
      onSmileyClick={resetBoard}
    />
    {/* tile grid */}
    <div style={{...shortcutsWrapperStyles}}>
      {Object.entries(tilesGraph).map(([key, tileData])=>{
        return <Tile 
          tileData={tileData} 
          key={key}
          index={parseInt(key)}
          onTitleClick={onTileClick}
        />
      })};
    </div>
  </div>
}