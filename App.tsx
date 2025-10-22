
import React from 'react';
import Game from './components/Game';

const App: React.FC = () => {
  return (
    <main 
      className="text-white min-h-screen flex flex-col items-center justify-center p-2 sm:p-4 font-mono"
      style={{
        backgroundColor: '#0c0a18',
        backgroundImage: `
          radial-gradient(ellipse at 20% 80%, rgba(132, 0, 255, 0.3) 0%, transparent 50%),
          radial-gradient(ellipse at 80% 20%, rgba(255, 0, 140, 0.3) 0%, transparent 50%),
          radial-gradient(ellipse at 50% 50%, rgba(0, 195, 255, 0.2) 0%, transparent 60%),
          url('https://www.transparenttextures.com/patterns/stardust.png')
        `,
      }}
    >
      <Game />
    </main>
  );
};

export default App;
