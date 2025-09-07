
import React from 'react';
import type { HomeRun } from '../types';

interface HomeRunCardProps {
  homeRun: HomeRun;
}

const BaseballIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-red-500" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.015 6.9a.75.75 0 011.06 0l2.5 2.5a.75.75 0 01-1.06 1.06L10 8.56l-1.515 1.515a.75.75 0 11-1.06-1.06l2.5-2.5z" clipRule="evenodd" />
        <path d="M5.239 9.24a.75.75 0 011.06 0l2.5 2.5a.75.75 0 01-1.06 1.06L6.22 11.284a.75.75 0 010-1.06l-1.06-1.06z" clipRule="evenodd" />
        <path d="M12.985 6.9a.75.75 0 011.06 0l.915.915a.75.75 0 01-1.06 1.06l-.915-.915a.75.75 0 010-1.06z" clipRule="evenodd" />
    </svg>
);


const HomeRunCard: React.FC<HomeRunCardProps> = ({ homeRun }) => {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/60 rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 ease-in-out">
      <div className="p-5">
        <div className="flex justify-between items-start">
            <div>
                <p className="text-sm font-medium text-red-400">{homeRun.team}</p>
                <h3 className="text-2xl font-bold text-white mt-1">{homeRun.playerName}</h3>
            </div>
            <div className="text-right">
                <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-300">{homeRun.distance} ft</p>
                <p className="text-xs text-gray-400">Est. Distance</p>
            </div>
        </div>
        
        <div className="mt-4 text-sm text-gray-400">
            <p><span className="font-semibold text-gray-300">Vs:</span> {homeRun.opponent}</p>
            <p><span className="font-semibold text-gray-300">Date:</span> {homeRun.date}</p>
        </div>

        <div className="mt-5 pt-4 border-t border-gray-700">
            <p className="text-gray-300 leading-relaxed">{homeRun.details}</p>
        </div>
      </div>
       <div className="bg-gray-900/50 px-5 py-2 flex items-center justify-end">
         <BaseballIcon />
         <span className="text-xs font-semibold text-gray-400 tracking-wider uppercase">HOME RUN</span>
       </div>
    </div>
  );
};

export default HomeRunCard;
