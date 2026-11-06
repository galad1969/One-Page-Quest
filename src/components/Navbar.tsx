import React from 'react';
import { Sparkles } from 'lucide-react';

interface NavbarProps {
  currentView: 'simulateur' | 'imprimable' | 'compendium';
  onSelectView: (view: 'simulateur' | 'imprimable' | 'compendium') => void;
  onOpenRules: () => void;
  onOpenGenerator: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onSelectView,
  onOpenRules,
  onOpenGenerator
}) => {
  return (
    <header className="no-print bg-slate-950/90 border-b border-slate-800 backdrop-blur sticky top-0 z-40">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 py-3.5">
        {/* Zone 1: Brand Title */}
        <div className="flex items-center gap-3 shrink-0">
          <span className="font-cinzel text-lg font-bold tracking-tight text-amber-200 whitespace-nowrap shrink-0">
            One Page Quest
          </span>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <button
            onClick={() => onSelectView('simulateur')}
            className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              currentView === 'simulateur'
                ? 'text-amber-300 font-semibold border-b-2 border-amber-400 pb-0.5'
                : 'hover:text-white'
            }`}
          >
            Simulateur de Jeu
          </button>

          <button
            onClick={() => onSelectView('imprimable')}
            className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              currentView === 'imprimable'
                ? 'text-amber-300 font-semibold border-b-2 border-amber-400 pb-0.5'
                : 'hover:text-white'
            }`}
          >
            Feuille Imprimable A4
          </button>

          <button
            onClick={() => onSelectView('compendium')}
            className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              currentView === 'compendium'
                ? 'text-amber-300 font-semibold border-b-2 border-amber-400 pb-0.5'
                : 'hover:text-white'
            }`}
          >
            Compendium
          </button>

          <button
            onClick={onOpenRules}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Règles Officielles
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Mobile quick view toggle if needed */}
          <div className="md:hidden flex items-center gap-1 bg-slate-900 border border-slate-800 rounded-lg p-1 text-xs">
            <button
              onClick={() => onSelectView('simulateur')}
              className={`px-2 py-1 rounded ${currentView === 'simulateur' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400'}`}
            >
              Jeu
            </button>
            <button
              onClick={() => onSelectView('imprimable')}
              className={`px-2 py-1 rounded ${currentView === 'imprimable' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400'}`}
            >
              Fiche A4
            </button>
          </div>

          <button
            onClick={onOpenGenerator}
            className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-slate-950 bg-amber-500 hover:bg-amber-400 rounded-lg transition-colors shadow-lg shadow-amber-500/20 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Nouvelle Quête</span>
          </button>
        </div>
      </div>
    </header>
  );
};
