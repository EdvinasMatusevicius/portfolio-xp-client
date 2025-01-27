import { TileData, TilesGraph } from "../../../../types";


export function buildGridGraph(numbOfTiles: number) {
  
  const gridSize = Math.ceil(Math.sqrt(numbOfTiles));
  const graph: TilesGraph = {};
  const getIndex = (row: number, col: number) => row * gridSize + col;

  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      const currentIndex = getIndex(row, col);

      graph[currentIndex] = {
        hidden: true,
        neighbors:[],
        mined: false,
        minedNeighborCount: 0,
        marked: null,
        mineExploded: false
      };

      const neighborOffsets = [
        [-1, 0], // Top
        [1, 0],  // Bottom
        [0, -1], // Left
        [0, 1],  // Right
        [-1, -1], // Top-Left
        [-1, 1],  // Top-Right
        [1, -1],  // Bottom-Left
        [1, 1],  // Bottom-Right
      ];

      // Iterate through possible neighbor offsets
      for (const [rowOffset, colOffset] of neighborOffsets) {
        const neighborRow = row + rowOffset;
        const neighborCol = col + colOffset;

        // Check if the neighbor is within the grid bounds
        if (
          neighborRow >= 0 &&
          neighborRow < gridSize &&
          neighborCol >= 0 &&
          neighborCol < gridSize
        ) {
          const neighborIndex = getIndex(neighborRow, neighborCol);
          graph[currentIndex].neighbors.push(neighborIndex);
        }
      }
    }
  }
  return graph;
}
export function getGridGraphWithAllHidden(graph: {[index: string]: TileData}) {
  const clonedGrid: TilesGraph = JSON.parse(JSON.stringify(graph));
  for (const index in clonedGrid) {
    clonedGrid[index].hidden = true;
  }
  return clonedGrid;
}
export function getGridGraphOnIndexShow(graph: TilesGraph, indexToShow: number) {
  console.log('paspaudimas')
  console.log('start',graph)
  const clonedGrid: TilesGraph = JSON.parse(JSON.stringify(graph));
  const tileToShow = clonedGrid[indexToShow];
  if (!tileToShow.hidden || tileToShow.marked === 'mined') return clonedGrid;
  if (tileToShow.mined) return _explodeMine(clonedGrid, indexToShow); //
  if (tileToShow.minedNeighborCount > 0) {
    tileToShow.hidden = false;
    return clonedGrid;
  }
  if (tileToShow.minedNeighborCount === 0) return _showGridGraphAreaOnEmptyTilePress(clonedGrid, indexToShow);//
  return clonedGrid;
}
function _showGridGraphAreaOnEmptyTilePress(graph: TilesGraph, index: number) {
  const queue = [index];
  const visitedTileIndexes = new Set();
  visitedTileIndexes.add(index);
  while (queue.length > 0) {
    const currentIndex = queue.shift();
    if (typeof currentIndex != 'number') break;
    const tileData = graph[currentIndex];
    if (tileData.minedNeighborCount) tileData.hidden = false;
    if (tileData.minedNeighborCount === 0) {
      tileData.hidden = false;
      for (const neighborIndex of tileData.neighbors) {
        if (visitedTileIndexes.has(neighborIndex)) {
          continue;
        }
        visitedTileIndexes.add(neighborIndex);
        queue.push(neighborIndex);
      }
    }
  }
  return graph;
}
function _explodeMine(graph: TilesGraph, tileIndex: number) {
  const explodedMineTile = graph[tileIndex];
  explodedMineTile.mineExploded = true;
  for (const tileIndex in graph) {
    const tileData = graph[tileIndex];
    if (tileData.mined) tileData.hidden = false;
  }
  return graph;
}

export function populateEmptyWithMines(graph: TilesGraph, numbOfMines: number) {
  const emptyTilesArr = Object.keys(graph);
  const graphNodeCount = emptyTilesArr.length;
  if (numbOfMines >= graphNodeCount) return;
  for (let i = 1; i <= numbOfMines; i++) {
    if (emptyTilesArr.length === 0) break;
    const randomIndexInEmptyTilesArr = Math.floor(Math.random() * emptyTilesArr.length);
    const indexToMine = emptyTilesArr[randomIndexInEmptyTilesArr];
    graph[indexToMine].mined = true;
    emptyTilesArr.splice(randomIndexInEmptyTilesArr, 1);
  }
  return graph;
}
export function populateGraphWithNumbers(graph: TilesGraph) {
  for (const index in graph) {
    const node = graph[index];
    const neighborsArr = node.neighbors;
    let minedNeighborCount = 0;
    for (const neighborIndex of neighborsArr) {
      const neighborNode = graph[neighborIndex];
      if (neighborNode.mined) minedNeighborCount += 1;
    }
    node.minedNeighborCount = minedNeighborCount;
  }
  return graph;
}