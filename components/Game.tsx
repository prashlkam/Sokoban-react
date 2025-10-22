
import React, { useState, useCallback } from 'react';
import { levels } from '../levels';
import { useSokobanLogic } from '../hooks/useSokobanLogic';
import GameBoard from './GameBoard';
import Header from './Header';
import Footer from './Footer';

const Game: React.FC = () => {
  const [levelIndex, setLevelIndex] = useState(0);
  const { gameState, isWon, undo, redo, resetLevel, canUndo, canRedo } = useSokobanLogic(levels[levelIndex]);

  const goToNextLevel = useCallback(() => {
    if (levelIndex < levels.length - 1) {
      setLevelIndex(levelIndex + 1);
    }
  }, [levelIndex]);

  return (
    <div className="flex flex-col items-center">
        <Header 
            onUndo={undo} 
            onRedo={redo} 
            onRestart={resetLevel} 
            canUndo={canUndo} 
            canRedo={canRedo} 
        />
        <div className="relative">
            <GameBoard grid={gameState.grid} isWon={isWon}/>
            {isWon && (
                <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center animate-fade-in">
                    <h2 className="text-5xl font-bold text-green-400 animate-pulse">Level Complete!</h2>
                    {levelIndex < levels.length - 1 ? (
                        <button onClick={goToNextLevel} className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded-md text-xl transition-colors">
                            Next Level
                        </button>
                    ) : (
                         <p className="mt-4 text-xl text-yellow-300">You've completed all levels!</p>
                    )}
                </div>
            )}
        </div>
        <Footer 
            level={levelIndex + 1}
            steps={gameState.steps}
            pushes={gameState.pushes}
        />
    </div>
  );
};

export default Game;
