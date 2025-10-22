
import { useState, useEffect, useCallback, useMemo } from 'react';
import { GameState, Tile } from '../types';

function parseLevel(levelString: string): GameState {
  const grid = levelString
    .trim()
    .split('\n')
    .map(row => row.split(''));

  return { grid, steps: 0, pushes: 0 };
}

export const useSokobanLogic = (levelString: string) => {
  const [history, setHistory] = useState<GameState[]>([parseLevel(levelString)]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const gameState = useMemo(() => history[historyIndex], [history, historyIndex]);

  const isWon = useMemo(() => {
    return !gameState.grid.flat().some(char => char === Tile.Goal || char === Tile.PlayerOnGoal);
  }, [gameState.grid]);

  const resetLevel = useCallback(() => {
    setHistory([parseLevel(levelString)]);
    setHistoryIndex(0);
  }, [levelString]);

  useEffect(() => {
    resetLevel();
  }, [levelString, resetLevel]);

  const move = useCallback((dr: number, dc: number) => {
    if (isWon) return;

    const { grid, steps, pushes } = gameState;
    const newGrid = grid.map(r => [...r]);

    let playerRow = -1;
    let playerCol = -1;

    for (let r = 0; r < newGrid.length; r++) {
      const c = newGrid[r].findIndex(tile => tile === Tile.Player || tile === Tile.PlayerOnGoal);
      if (c !== -1) {
        playerRow = r;
        playerCol = c;
        break;
      }
    }
    
    if (playerRow === -1) return;

    const newPlayerRow = playerRow + dr;
    const newPlayerCol = playerCol + dc;

    if (newPlayerRow < 0 || newPlayerRow >= newGrid.length || newPlayerCol < 0 || newPlayerCol >= newGrid[newPlayerRow].length) return;
    
    const targetTile = newGrid[newPlayerRow][newPlayerCol];

    if (targetTile === Tile.Wall) return;

    let newPushes = pushes;
    let moved = false;

    if (targetTile === Tile.Box || targetTile === Tile.BoxOnGoal) {
      const boxTargetRow = newPlayerRow + dr;
      const boxTargetCol = newPlayerCol + dc;

      if (boxTargetRow < 0 || boxTargetRow >= newGrid.length || boxTargetCol < 0 || boxTargetCol >= newGrid[boxTargetRow].length) return;

      const boxTargetTile = newGrid[boxTargetRow][boxTargetCol];
      if (boxTargetTile === Tile.Floor || boxTargetTile === Tile.Goal) {
        newGrid[boxTargetRow][boxTargetCol] = boxTargetTile === Tile.Goal ? Tile.BoxOnGoal : Tile.Box;
        newGrid[newPlayerRow][newPlayerCol] = targetTile === Tile.BoxOnGoal ? Tile.PlayerOnGoal : Tile.Player;
        newPushes++;
        moved = true;
      }
    } else {
      newGrid[newPlayerRow][newPlayerCol] = targetTile === Tile.Goal ? Tile.PlayerOnGoal : Tile.Player;
      moved = true;
    }

    if (moved) {
      newGrid[playerRow][playerCol] = grid[playerRow][playerCol] === Tile.PlayerOnGoal ? Tile.Goal : Tile.Floor;
      
      const nextState: GameState = { grid: newGrid, steps: steps + 1, pushes: newPushes };
      const newHistory = history.slice(0, historyIndex + 1);
      newHistory.push(nextState);
      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
    }
  }, [gameState, history, historyIndex, isWon]);

  const undo = useCallback(() => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
    }
  }, [historyIndex]);

  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
    }
  }, [historyIndex, history.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.startsWith('Arrow') || ['u', 'r', 'w', 'a', 's', 'd', 'h', 'j', 'k', 'l'].includes(e.key)) {
        e.preventDefault();
      }

      switch (e.key.toLowerCase()) {
        case 'arrowup':
        case 'k':
        case 'w':
          move(-1, 0); break;
        case 'arrowdown':
        case 'j':
        case 's':
          move(1, 0); break;
        case 'arrowleft':
        case 'h':
        case 'a':
          move(0, -1); break;
        case 'arrowright':
        case 'l':
        case 'd':
          move(0, 1); break;
        case 'u': 
          undo(); 
          break;
        case 'r':
          redo(); 
          break;
        case 'z':
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            e.shiftKey ? redo() : undo();
          }
          break;
        case 'y':
           if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            redo();
          }
          break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [move, undo, redo]);

  return { gameState, isWon, undo, redo, resetLevel, canUndo: historyIndex > 0, canRedo: historyIndex < history.length - 1 };
};
