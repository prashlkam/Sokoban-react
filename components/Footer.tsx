
import React from 'react';

interface FooterProps {
    level: number;
    steps: number;
    pushes: number;
}

const StatDisplay: React.FC<{ label: string; value: string }> = ({ label, value }) => (
    <div className="text-right">
        <span className="text-red-500">{label}:</span>
        <span className="ml-2 text-yellow-400 font-bold w-12 inline-block">{value}</span>
    </div>
);


const Footer: React.FC<FooterProps> = ({ level, steps, pushes }) => {
    return (
        <footer className="w-full p-2 bg-black flex justify-end items-center">
            <div className="flex space-x-4 text-base">
                <StatDisplay label="Level" value={String(level).padStart(5, '0')} />
                <StatDisplay label="Steps" value={String(steps).padStart(5, '0')} />
                <StatDisplay label="Pushes" value={String(pushes).padStart(5, '0')} />
            </div>
        </footer>
    );
};

export default Footer;
