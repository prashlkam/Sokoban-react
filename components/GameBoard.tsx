
import React, { useMemo } from 'react';
import { Tile } from '../types';
import { Wall, Floor, Player, Box, Goal } from './Cell';

interface GameBoardProps {
    grid: string[][];
    isWon: boolean;
}

const TILE_SIZE_PX = 48; // Corresponds to lg:w-12/h-12 in Tailwind config (3rem = 48px)

const GameBoard: React.FC<GameBoardProps> = ({ grid, isWon }) => {
    const maxCols = useMemo(() => Math.max(0, ...grid.map(row => row.length)), [grid]);

    const playerPos = useMemo(() => {
        for (let r = 0; r < grid.length; r++) {
            for (let c = 0; c < grid[r].length; c++) {
                if (grid[r][c] === Tile.Player || grid[r][c] === Tile.PlayerOnGoal) {
                    return { r, c };
                }
            }
        }
        return null;
    }, [grid]);

    const boxesPos = useMemo(() => {
        const positions: { r: number; c: number; id: string }[] = [];
        grid.forEach((row, r) => {
            row.forEach((cell, c) => {
                if (cell === Tile.Box || cell === Tile.BoxOnGoal) {
                    positions.push({ r, c, id: `${r}-${c}` });
                }
            });
        });
        return positions;
    }, [grid]);

    return (
        <div 
          className="relative inline-block"
          style={{
            width: maxCols * TILE_SIZE_PX,
            height: grid.length * TILE_SIZE_PX,
          }}
        >
            {/* Render static background grid */}
            {grid.map((row, r) => (
                row.map((cell, c) => {
                    const key = `${r}-${c}`;
                    let backgroundTile: React.ReactNode;
                    
                    switch(cell) {
                        case Tile.Wall: 
                            backgroundTile = <Wall />; 
                            break;
                        case Tile.Goal:
                        case Tile.PlayerOnGoal:
                        case Tile.BoxOnGoal: 
                            backgroundTile = <Floor><Goal isComplete={cell === Tile.BoxOnGoal || (isWon && cell === Tile.PlayerOnGoal)} /></Floor>; 
                            break;
                        case Tile.Floor:
                        case Tile.Player:
                        case Tile.Box:
                             backgroundTile = <Floor />;
                             break;
                        default:
                            backgroundTile = null; // For empty spaces in ragged levels
                    }
                    
                    return (
                        <div key={key} className="absolute w-12 h-12" style={{ top: r * TILE_SIZE_PX, left: c * TILE_SIZE_PX }}>
                            {backgroundTile}
                        </div>
                    );
                })
            ))}

            {/* Render dynamic, animated elements */}
            {playerPos && <Player row={playerPos.r} col={playerPos.c} />}
            {boxesPos.map(pos => <Box key={pos.id} row={pos.r} col={pos.c} />)}
        </div>
    );
};

export default GameBoard;
