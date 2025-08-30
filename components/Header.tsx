
import React from 'react';
import { View } from '../types';
// Fix: Corrected import path for TrophyIcon.
import { LeafIcon } from './icons/LeafIcon';
import { TrophyIcon } from './icons/TrophyIcon';

interface HeaderProps {
  points: number;
  setView: (view: View) => void;
  currentView: View;
}

const NavItem: React.FC<{
  label: string;
  view: View;
  currentView: View;
  onClick: (view: View) => void;
  children: React.ReactNode;
}> = ({ label, view, currentView, onClick, children }) => {
  const isActive = currentView === view;
  return (
    <button
      onClick={() => onClick(view)}
      className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-colors duration-300 ${
        isActive
          ? 'bg-green-500 text-white shadow-md'
          : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
      }`}
    >
      {children}
      <span className="font-semibold">{label}</span>
    </button>
  );
};

export const Header: React.FC<HeaderProps> = ({ points, setView, currentView }) => {
  return (
    <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => setView(View.Dashboard)}
        >
          <LeafIcon className="w-8 h-8 text-green-500" />
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">EcoQuest</h1>
        </div>
        <div className="flex items-center space-x-2 md:space-x-4">
          <NavItem label="Dashboard" view={View.Dashboard} currentView={currentView} onClick={setView}>
             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg>
          </NavItem>
          <NavItem label="Leaderboard" view={View.Leaderboard} currentView={currentView} onClick={setView}>
            <TrophyIcon className="w-5 h-5" />
          </NavItem>
          <div className="flex items-center space-x-2 bg-yellow-400 text-yellow-900 font-bold px-4 py-2 rounded-full shadow-inner">
            <span>{points}</span>
            <span className="text-yellow-600">pts</span>
          </div>
          <button onClick={() => setView(View.Profile)} className="w-10 h-10 rounded-full overflow-hidden border-2 border-green-500 hover:scale-105 transition-transform">
             <img src="https://picsum.photos/seed/alex/100" alt="User Avatar" />
          </button>
        </div>
      </nav>
    </header>
  );
};