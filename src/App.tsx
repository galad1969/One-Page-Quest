/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { generateScenario, HEROES_CATALOG } from './data/opqData';
import { AdventureScenario, Hero } from './types/game';
import { Navbar } from './components/Navbar';
import { InteractivePlay } from './components/InteractivePlay';
import { PrintableSheet } from './components/PrintableSheet';
import { Compendium } from './components/Compendium';
import { RulesModal } from './components/RulesModal';
import { ScenarioGeneratorModal } from './components/ScenarioGeneratorModal';
import { Dices, Printer, Sparkles, BookOpen, ExternalLink, ShieldCheck } from 'lucide-react';

export default function App() {
  // Initial scenario generated using the canonical seed from the official PDF sample!
  const [scenario, setScenario] = useState<AdventureScenario>(() => {
    const mercenary = HEROES_CATALOG[0]; // Mercenaire
    return generateScenario('17XRWYJMHUB03TAB7NH3TX9RNSQKLF2Y', 'Aventurier', mercenary);
  });

  const [currentView, setCurrentView] = useState<'simulateur' | 'imprimable' | 'compendium'>('simulateur');
  const [isRulesOpen, setIsRulesOpen] = useState(false);
  const [isGeneratorOpen, setIsGeneratorOpen] = useState(false);

  const handleApplyScenario = (
    seed: string,
    difficulty: 'Aventurier' | 'Expert' | 'Légendaire' | 'Cauchemar',
    hero: Hero
  ) => {
    const newScenario = generateScenario(seed, difficulty, hero);
    setScenario(newScenario);
  };

  const handleQuickRandomScenario = () => {
    const newScenario = generateScenario();
    setScenario(newScenario);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-amber-500 selection:text-slate-950">
      {/* Top Bar Navigation */}
      <Navbar
        currentView={currentView}
        onSelectView={setCurrentView}
        onOpenRules={() => setIsRulesOpen(true)}
        onOpenGenerator={() => setIsGeneratorOpen(true)}
      />

      {/* Hero Banner (hidden on print) */}
      <div className="no-print border-b border-slate-800/80 bg-gradient-to-b from-slate-900 to-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <img
            src="./assets/images/opq_hero_banner_1793969941633.jpg"
            alt="Tabletop solo RPG background"
            className="w-full h-full object-cover object-center"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold tracking-wider uppercase">
                <span>Roguelike Solo de Dés</span>
                <span aria-hidden="true">·</span>
                <span>Campagne Kickstarter</span>
                <span aria-hidden="true">·</span>
                <span>1 Feuille A4 & 5 Dés</span>
              </div>
              <h1 className="font-cinzel text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
                One Page Quest
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Testez le jeu avant de vous lancer dans la campagne Kickstarter ! Générateur complet de feuilles d'aventure uniques (50 Héros, 36 Boss, 66 Coffres et 110 Équipements). Jouez en ligne sur le simulateur interactif ou imprimez votre feuille A4 fidèle au PDF officiel.
              </p>
            </div>

            {/* View Switcher Bar */}
            <div className="flex flex-wrap items-center gap-2 bg-slate-900/90 border border-slate-800 p-1.5 rounded-xl shrink-0">
              <button
                onClick={() => setCurrentView('simulateur')}
                className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  currentView === 'simulateur'
                    ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Dices className="w-4 h-4" />
                <span>Simulateur Interactif</span>
              </button>

              <button
                onClick={() => setCurrentView('imprimable')}
                className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  currentView === 'imprimable'
                    ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Printer className="w-4 h-4" />
                <span>Feuille Imprimable A4</span>
              </button>

              <button
                onClick={() => setCurrentView('compendium')}
                className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  currentView === 'compendium'
                    ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>Compendium</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-6">
        {currentView === 'simulateur' && (
          <InteractivePlay
            scenario={scenario}
            onOpenRules={() => setIsRulesOpen(true)}
            onOpenCompendium={() => setCurrentView('compendium')}
            onNewScenario={() => setIsGeneratorOpen(true)}
          />
        )}

        {currentView === 'imprimable' && (
          <PrintableSheet
            scenario={scenario}
            onRegenerate={handleQuickRandomScenario}
          />
        )}

        {currentView === 'compendium' && <Compendium />}
      </main>

      {/* Footer */}
      <footer className="no-print border-t border-slate-800/80 bg-slate-950 py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-cinzel text-amber-300 font-bold">One Page Quest</span>
            <span>·</span>
            <span>Jeu créé par Léandre Proust, illustrations Oleksander Zahorulko, graphisme Clément Proust</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <a
              href="https://fr.onepagequest.com/"
              target="_blank"
              rel="noreferrer noopener"
              className="hover:text-amber-300 transition-colors flex items-center gap-1"
            >
              <span>Site officiel Kickstarter</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <span>·</span>
            <span>Grammes Édition</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <RulesModal isOpen={isRulesOpen} onClose={() => setIsRulesOpen(false)} />

      <ScenarioGeneratorModal
        isOpen={isGeneratorOpen}
        onClose={() => setIsGeneratorOpen(false)}
        currentSeed={scenario.seed}
        currentDifficulty={scenario.difficulty}
        currentHero={scenario.hero}
        onApplyScenario={handleApplyScenario}
      />
    </div>
  );
}
