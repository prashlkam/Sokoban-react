
import React from 'react';

const TILE_SIZE_PX = 48; // Corresponds to lg:w-12/h-12 (3rem)

// --- Static Components ---

export const Wall: React.FC = () => (
    <div className="w-12 h-12">
        <svg viewBox="0 0 50 50" className="w-full h-full">
            <defs>
                <linearGradient id="wallGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{stopColor: '#f3f4f6', stopOpacity: 1}} />
                    <stop offset="100%" style={{stopColor: '#d1d5db', stopOpacity: 1}} />
                </linearGradient>
            </defs>
            <rect width="50" height="50" rx="5" fill="url(#wallGradient)" />
            <rect width="46" height="46" x="2" y="2" rx="3" fill="url(#wallGradient)" stroke="#e5e7eb" strokeWidth="1"/>
            <path d="M 5 5 L 45 5 L 45 45 L 5 45 Z" fill="none" stroke="#000" strokeOpacity="0.1" strokeWidth="1" />
        </svg>
    </div>
);

export const Floor: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <div className="bg-gray-600 relative w-12 h-12">{children}</div>
);

export const Goal: React.FC<{isComplete?: boolean}> = ({ isComplete }) => (
    <div className="absolute inset-0 flex items-center justify-center p-1">
        <svg viewBox="0 0 50 50" className="w-full h-full">
            <defs>
                <radialGradient id="goalMetal">
                    <stop offset="80%" stopColor="#6b7280" />
                    <stop offset="95%" stopColor="#4b5563" />
                    <stop offset="100%" stopColor="#374151" />
                </radialGradient>
                 <radialGradient id="goalLight">
                    <stop offset="0%" stopColor={isComplete ? "#a7f3d0" : "#10b981"} />
                    <stop offset="100%" stopColor={isComplete ? "#065f46" : "#047857"} />
                </radialGradient>
            </defs>
            <circle cx="25" cy="25" r="24" fill="url(#goalMetal)" />
            <circle cx="25" cy="25" r="18" fill="url(#goalLight)" stroke="#059669" strokeWidth="1.5" className={isComplete ? 'animate-pulse' : ''} />
        </svg>
    </div>
);

// --- Dynamic (Animated) Components ---

interface DynamicProps { row: number; col: number; }

export const Player: React.FC<DynamicProps> = ({ row, col }) => (
    <div 
        className="absolute w-12 h-12 transition-all duration-200 ease-in-out z-10 flex items-center justify-center"
        style={{ 
            transform: `translate(${col * TILE_SIZE_PX}px, ${row * TILE_SIZE_PX}px)`
        }}
    >
         <svg viewBox="0 0 40 40" className="w-10 h-10 drop-shadow-lg">
            {/* Head */}
            <circle cx="20" cy="10" r="7" fill="#fde4c8" stroke="#a16207" strokeWidth="1"/>
            {/* Body */}
            <path d="M 12,17 L 28,17 L 25,30 L 15,30 Z" fill="white" stroke="#9ca3af" strokeWidth="1" />
            {/* Pants */}
            <path d="M 15,30 L 25,30 L 25,38 L 15,38 Z" fill="#2563eb" stroke="#1e40af" strokeWidth="1" />
            {/* Arms Akimbo */}
            <path d="M 12,17 C 5,19 5,28 12,28" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" />
             <path d="M 12,17 C 5,19 5,28 12,28" fill="none" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M 28,17 C 35,19 35,28 28,28" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" />
            <path d="M 28,17 C 35,19 35,28 28,28" fill="none" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    </div>
);

export const Box: React.FC<DynamicProps> = ({ row, col }) => (
    <div 
        className="absolute w-12 h-12 transition-all duration-200 ease-in-out z-10 flex items-center justify-center p-1 drop-shadow-lg"
        style={{ 
            transform: `translate(${col * TILE_SIZE_PX}px, ${row * TILE_SIZE_PX}px)`
        }}
    >
        <svg viewBox="0 0 100 100" className="w-full h-full">
            <defs>
                <linearGradient id="gemFace1" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#f87171" />
                    <stop offset="100%" stopColor="#dc2626" />
                </linearGradient>
                <linearGradient id="gemFace2" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#ef4444" />
                    <stop offset="100%" stopColor="#b91c1c" />
                </linearGradient>
                 <linearGradient id="gemFace3" x1="0" y1="1" x2="1" y2="0">
                    <stop offset="0%" stopColor="#fca5a5" />
                    <stop offset="100%" stopColor="#ef4444" />
                </linearGradient>
            </defs>
            <path d="M50 0 L100 50 L50 100 L0 50 Z" fill="#991b1b" />
            <path d="M50 0 L100 50 L50 100" fill="url(#gemFace1)" />
            <path d="M50 0 L0 50 L50 100" fill="url(#gemFace2)" />
            <path d="M50 0 L75 25 L50 50 L25 25 Z" fill="url(#gemFace3)" />
            <path d="M50 0 L100 50 L50 100 L0 50 Z" stroke="#7f1d1d" strokeWidth="2" fill="none" />
        </svg>
    </div>
);
