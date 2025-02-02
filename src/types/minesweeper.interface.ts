export interface TileData {
  hidden: boolean;
  neighbors: number[];
  mined: boolean;
  mineExploded: boolean;
  minedNeighborCount: number;
  marked: 'mined' | 'questionMark' | null;
}
export interface TilesGraph {
  [index: string]: TileData
}
export interface DifficultyPreset{
  width: number,
  height: number,
  mines: number
}