import React, { useState } from 'react';
import { HEROES_CATALOG, generateSeed } from '../data/opqData';
import { Hero } from '../types/game';
import { X, Sparkles, Dices, Copy, Check } from 'lucide-react';

interface ScenarioGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentSeed: string;
  currentDifficulty: 'Aventurier' | 'Expert' | 'Légendaire' | 'Cauchemar';
  currentHero: Hero;
  onApplyScenario: (
    seed: string,
    difficulty: 'Aventurier' | 'Expert' | 'Légendaire' | 'Cauchemar',
    hero: Hero
  ) => void;
}

export const ScenarioGeneratorModal: React.FC<ScenarioGeneratorModalProps> = ({
  isOpen,
  onClose,
  currentSeed,
  currentDifficulty,
  currentHero,
  onApplyScenario
}) => {
  const [seed, setSeed] = useState(currentSeed);
  const [difficulty, setDifficulty] = useState<'Aventurier' | 'Expert' | 'Légendaire' | 'Cauchemar'>(
    currentDifficulty
  );
  const [selectedHeroId, setSelectedHeroId] = useState<string>(currentHero.id);
  const [isCopied, setIsCopied] = useState(false);

  if (!isOpen) return null;

  const handleRandomizeSeed = () => {
    setSeed(generateSeed());
  };

  const handleCopySeed = () => {
    navigator.clipboard.writeText(seed);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleApply = () => {
    const hero = HEROES_CATALOG.find(h => h.id === selectedHeroId) || currentHero;
    onApplyScenario(seed, difficulty, hero);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-xl w-full flex flex-col shadow-2xl text-white overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h2 className="font-cinzel text-lg font-bold text-amber-100">Générateur de Scénario Unique</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-5 text-sm">
          {/* Seed Code Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 block">
              Code de Partie (Graine / Seed Déterministe)
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={seed}
                onChange={e => setSeed(e.target.value.toUpperCase())}
                placeholder="Ex: 17XRWYJMHUB03TAB7NH3TX9RNSQKLF2Y"
                className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs font-mono text-amber-300 focus:outline-none focus:border-amber-500 tracking-wider"
              />
              <button
                type="button"
                onClick={handleCopySeed}
                className="p-2 rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                title="Copier le code de partie"
              >
                {isCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
              <button
                type="button"
                onClick={handleRandomizeSeed}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-amber-300 transition-colors"
              >
                <Dices className="w-4 h-4" />
                <span>Aléatoire</span>
              </button>
            </div>
            <p className="text-[11px] text-slate-500">
              Un même code de partie générera exactement la même combinaison de 3 Boss, 9 Sbires, 66 Coffres et 11 Équipements.
            </p>
          </div>

          {/* Difficulty Selection */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 block">Niveau de Difficulté</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(['Aventurier', 'Expert', 'Légendaire', 'Cauchemar'] as const).map(diff => (
                <button
                  key={diff}
                  type="button"
                  onClick={() => setDifficulty(diff)}
                  className={`py-2 px-3 text-xs font-semibold rounded-lg border text-center transition-all cursor-pointer ${
                    difficulty === diff
                      ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-sm'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white'
                  }`}
                >
                  {diff}
                </button>
              ))}
            </div>
          </div>

          {/* Hero Selection */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 block">
              Choix du Héros (50 héros disponibles)
            </label>
            <select
              value={selectedHeroId}
              onChange={e => setSelectedHeroId(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
            >
              {HEROES_CATALOG.map(h => (
                <option key={h.id} value={h.id}>
                  {h.name} — {h.title} ({h.description})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold rounded-lg border border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors cursor-pointer"
          >
            Annuler
          </button>
          <button
            type="button"
            onClick={handleApply}
            className="px-5 py-2 text-xs font-bold rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors shadow-lg shadow-amber-500/20 cursor-pointer"
          >
            Générer l'Aventure
          </button>
        </div>
      </div>
    </div>
  );
};
