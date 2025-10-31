
import React from 'react';
import { DiamondIcon } from './icons';

export const Header: React.FC = () => {
  return (
    <header className="py-6 md:py-8 text-center border-b border-slate-700/50 bg-slate-900/50 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-center items-center gap-4 mb-2">
          <DiamondIcon className="w-8 h-8 md:w-10 md:h-10 text-amber-300" />
          <h1 className="text-3xl md:text-5xl font-bold font-playfair tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-amber-200 to-yellow-500">
            AI Jewelry Stylist
          </h1>
        </div>
        <p className="max-w-2xl mx-auto text-sm md:text-base text-slate-400 mt-2">
          Upload your portrait and let our AI adorn you with the world's most luxurious virtual jewelry collections.
        </p>
      </div>
    </header>
  );
};
