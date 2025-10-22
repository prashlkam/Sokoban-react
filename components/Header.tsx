
import React from 'react';
import { UndoIcon, RedoIcon, RestartIcon } from './icons/Icons';

interface HeaderProps {
    onUndo: () => void;
    onRedo: () => void;
    onRestart: () => void;
    canUndo: boolean;
    canRedo: boolean;
}

const ToolbarButton: React.FC<{ onClick: () => void; disabled?: boolean; children: React.ReactNode; label: string; }> = ({ onClick, disabled, children, label }) => (
    <button onClick={onClick} disabled={disabled} className="flex flex-col items-center px-2 py-1 hover:bg-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
        {children}
        <span className="text-xs mt-1">{label}</span>
    </button>
);


const Header: React.FC<HeaderProps> = ({ onUndo, onRedo, onRestart, canUndo, canRedo }) => {
    return (
        <div className="bg-gray-200 text-black shadow-md w-full font-sans">
            <div className="text-center py-1 border-b border-gray-300 text-sm font-bold">
                Skladnik
            </div>
            {/* The menu bar is just for show, as in the screenshot */}
            <div className="px-3 py-1 bg-gray-200 text-black text-sm flex space-x-4 border-b border-gray-300">
                <span className="cursor-default"><u>G</u>ame</span>
                <span className="cursor-default"><u>A</u>nimation</span>
                <span className="cursor-default"><u>B</u>ookmarks</span>
                <span className="cursor-default"><u>S</u>ettings</span>
                <span className="cursor-default"><u>H</u>elp</span>
            </div>
            <header className="w-full p-1 bg-gray-200 flex items-center">
                <div className="flex space-x-1">
                    <ToolbarButton onClick={onUndo} disabled={!canUndo} label="Undo">
                        <UndoIcon />
                    </ToolbarButton>
                    <ToolbarButton onClick={onRedo} disabled={!canRedo} label="Redo">
                        <RedoIcon />
                    </ToolbarButton>
                    <ToolbarButton onClick={onRestart} label="Restart Level">
                        <RestartIcon />
                    </ToolbarButton>
                </div>
            </header>
        </div>
    );
};

export default Header;
