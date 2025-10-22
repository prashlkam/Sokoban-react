
export enum Tile {
  Wall = '#',
  Player = '@',
  PlayerOnGoal = '+',
  Box = '$',
  BoxOnGoal = '*',
  Goal = '.',
  Floor = ' ',
}

export type GameState = {
  grid: string[][];
  steps: number;
  pushes: number;
};
