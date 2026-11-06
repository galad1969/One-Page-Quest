import React, { useState } from 'react';
import {
  HEROES_CATALOG,
  BOSSES_CATALOG,
  CHESTS_CATALOG,
  EQUIPMENTS_CATALOG,
  APOTHECARY_CATALOG,
  SPECIAL_POTIONS_CATALOG,
  SCRIBE_CATALOG
} from '../data/opqData';
import {
  Search,
  Shield,
  Trophy,
  Gift,
  Sword,
  FlaskConical,
  Scroll,
  Sparkles,
  Skull,
  Flame,
  AlertTriangle,
  Lightbulb,
  Star,
  Filter,
  ArrowUpDown,
  BookOpen,
  Dices,
  Play,
  ShoppingBag
} from 'lucide-react';

// Composant d'illustration des dés D6 standards avec points officiels
const D6Die: React.FC<{
  value: number;
  label?: string;
  sublabel?: string;
  highlight?: boolean;
}> = ({ value, label, sublabel, highlight }) => {
  const getPips = (val: number) => {
    switch (val) {
      case 1:
        return [4];
      case 2:
        return [0, 8];
      case 3:
        return [0, 4, 8];
      case 4:
        return [0, 2, 6, 8];
      case 5:
        return [0, 2, 4, 6, 8];
      case 6:
        return [0, 2, 3, 5, 6, 8];
      default:
        return [4];
    }
  };

  const pips = getPips(value);

  return (
    <div className="flex flex-col items-center gap-1.5 group">
      <div
        className={`w-14 h-14 rounded-2xl border-2 p-2 flex items-center justify-center shadow-lg transition-transform group-hover:scale-105 ${
          highlight
            ? 'bg-gradient-to-br from-amber-500/25 to-amber-950/60 border-amber-400 text-amber-300 shadow-amber-500/20'
            : 'bg-gradient-to-br from-slate-900 to-slate-950 border-slate-700 text-white shadow-slate-950/60'
        }`}
      >
        <div className="w-full h-full grid grid-cols-3 grid-rows-3 gap-1">
          {Array.from({ length: 9 }).map((_, idx) => (
            <div key={idx} className="flex items-center justify-center">
              {pips.includes(idx) && (
                <div
                  className={`w-2.5 h-2.5 rounded-full ${
                    highlight ? 'bg-amber-400 shadow-sm shadow-amber-300' : 'bg-slate-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>
      {label && <span className="font-cinzel text-xs font-bold text-amber-200 text-center leading-tight">{label}</span>}
      {sublabel && <span className="text-[10px] text-slate-400 font-mono text-center">{sublabel}</span>}
    </div>
  );
};

export const Compendium: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'guide' | 'heroes' | 'bosses' | 'chests' | 'equipments' | 'apothecary' | 'scribe'>('guide');
  const [apothecarySubTab, setApothecarySubTab] = useState<'all' | 'special' | 'permanent'>('all');
  const [bossActFilter, setBossActFilter] = useState<'all' | 1 | 2 | 3>('all');
  const [bossTierFilter, setBossTierFilter] = useState<'all' | 'Modéré' | 'Corsé' | 'Redoutable' | 'Cauchemardesque' | 'Mythique'>('all');
  const [bossSort, setBossSort] = useState<'threshold_asc' | 'threshold_desc' | 'difficulty_desc' | 'name_asc'>('threshold_asc');
  const [search, setSearch] = useState('');

  const filteredHeroes = HEROES_CATALOG.filter(
    h => h.name.toLowerCase().includes(search.toLowerCase()) || h.description.toLowerCase().includes(search.toLowerCase())
  );

  const filteredBosses = BOSSES_CATALOG.filter(b => {
    const matchesSearch =
      b.name.toLowerCase().includes(search.toLowerCase()) ||
      b.powerRule.toLowerCase().includes(search.toLowerCase()) ||
      (b.archetype && b.archetype.toLowerCase().includes(search.toLowerCase())) ||
      (b.tacticalTip && b.tacticalTip.toLowerCase().includes(search.toLowerCase()));
    const matchesAct = bossActFilter === 'all' || b.act === bossActFilter;
    const matchesTier = bossTierFilter === 'all' || b.difficultyTier === bossTierFilter;
    return matchesSearch && matchesAct && matchesTier;
  }).sort((a, b) => {
    if (bossSort === 'threshold_asc') return a.powerThreshold - b.powerThreshold;
    if (bossSort === 'threshold_desc') return b.powerThreshold - a.powerThreshold;
    if (bossSort === 'difficulty_desc') return (b.difficultyRating || 0) - (a.difficultyRating || 0);
    return a.name.localeCompare(b.name);
  });

  const filteredChests = CHESTS_CATALOG.filter(
    c => c.name.toLowerCase().includes(search.toLowerCase()) || c.effect.toLowerCase().includes(search.toLowerCase())
  );

  const filteredEquipments = EQUIPMENTS_CATALOG.filter(
    e => e.name.toLowerCase().includes(search.toLowerCase()) || e.effect.toLowerCase().includes(search.toLowerCase())
  );

  const filteredApothecary = APOTHECARY_CATALOG.filter(
    a => a.name.toLowerCase().includes(search.toLowerCase()) || (a.description && a.description.toLowerCase().includes(search.toLowerCase())) || a.targetCombo.toLowerCase().includes(search.toLowerCase())
  );

  const filteredSpecialPotions = SPECIAL_POTIONS_CATALOG.filter(
    sp => sp.name.toLowerCase().includes(search.toLowerCase()) || sp.effect.toLowerCase().includes(search.toLowerCase()) || sp.description.toLowerCase().includes(search.toLowerCase())
  );

  const filteredScribe = SCRIBE_CATALOG.filter(
    s => s.name.toLowerCase().includes(search.toLowerCase()) || (s.description && s.description.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      {/* Header & Tabs */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-white shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-cinzel text-xl font-bold text-amber-200">Compendium One Page Quest</h2>
            <p className="text-xs text-slate-400">
              Découvrez la base complète du jeu : 50 Héros, 36 Boss, 66 Coffres, 110 Équipements, 42 Fioles d'Apothicaire (dont 6 Fioles Spéciales Consommables) et 24 Manuscrits du Scribe.
            </p>
          </div>

          {/* Search */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Rechercher..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center gap-2 p-1 bg-slate-950/80 rounded-lg border border-slate-800 overflow-x-auto">
          <button
            onClick={() => setActiveTab('guide')}
            className={`flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'guide' ? 'bg-amber-500 text-slate-950 font-bold shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>📖 Guide de Démarrage (3 Étapes)</span>
          </button>

          <button
            onClick={() => setActiveTab('heroes')}
            className={`flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'heroes' ? 'bg-amber-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>50 Héros ({filteredHeroes.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('bosses')}
            className={`flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'bosses' ? 'bg-amber-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Trophy className="w-3.5 h-3.5" />
            <span>36 Boss ({filteredBosses.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('chests')}
            className={`flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'chests' ? 'bg-amber-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Gift className="w-3.5 h-3.5" />
            <span>66 Coffres ({filteredChests.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('equipments')}
            className={`flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'equipments' ? 'bg-amber-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sword className="w-3.5 h-3.5" />
            <span>110 Équipements ({filteredEquipments.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('apothecary')}
            className={`flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'apothecary' ? 'bg-amber-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            <FlaskConical className="w-3.5 h-3.5" />
            <span>42 Fioles Apothicaire ({filteredApothecary.length + filteredSpecialPotions.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('scribe')}
            className={`flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'scribe' ? 'bg-amber-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Scroll className="w-3.5 h-3.5" />
            <span>24 Manuscrits Scribe ({filteredScribe.length})</span>
          </button>
        </div>
      </div>

      {/* TAB 0: GUIDE DE DÉMARRAGE EN 3 ÉTAPES & ILLUSTRATION DES DÉS */}
      {activeTab === 'guide' && (
        <div className="space-y-6">
          {/* Hero Welcome Banner */}
          <div className="bg-gradient-to-r from-slate-900 via-amber-950/40 to-slate-900 border border-amber-500/40 rounded-2xl p-6 text-white shadow-xl space-y-3">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs uppercase font-extrabold tracking-wider text-amber-400 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-amber-400" />
                  Règles Officielles Simplifiées
                </span>
                <h3 className="font-cinzel text-xl sm:text-2xl font-black text-amber-200">
                  Guide de Démarrage : One Page Quest en 3 Étapes
                </h3>
                <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
                  Bienvenue dans l'aventure solo de <em>One Page Quest</em> ! Découvrez les principes fondamentaux du jeu pour piloter le simulateur interactif ou remplir votre feuille papier imprimée.
                </p>
              </div>

              <div className="flex items-center gap-2 p-2 bg-slate-950/80 rounded-xl border border-slate-800 shrink-0">
                <Dices className="w-8 h-8 text-amber-400" />
                <div className="text-xs">
                  <span className="text-slate-400 block font-semibold">Format du Jeu</span>
                  <span className="font-bold text-white">5 Dés D6 Standards</span>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION DÉS : ILLUSTRATION DES 5 DÉS NÉCESSAIRES */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <h4 className="font-cinzel text-base font-bold text-amber-200 flex items-center gap-2">
                  <Dices className="w-5 h-5 text-amber-400" />
                  Illustration du Matériel Nécessaire : Les 5 Dés D6
                </h4>
                <p className="text-xs text-slate-400">
                  Tout le jeu se joue exclusivement avec <strong>5 dés cubiques standard à 6 faces (D6)</strong>.
                </p>
              </div>
              <span className="text-[11px] font-mono font-bold text-amber-300 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30">
                5 × Dés D6 (Faces 1 à 6)
              </span>
            </div>

            {/* Visual Dice Display */}
            <div className="p-4 bg-slate-950/90 rounded-xl border border-slate-800/80 space-y-3">
              <span className="text-[11px] uppercase font-bold text-slate-400 tracking-wider block text-center">
                Exemple du Lancer Initial de Préparation (Attribution de Départ) :
              </span>
              <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 py-2">
                <D6Die value={1} label="Dé #1" sublabel="+1 Force ⚔️" highlight={true} />
                <D6Die value={3} label="Dé #2" sublabel="+1 Force ⚔️" highlight={true} />
                <D6Die value={5} label="Dé #3" sublabel="+1 Force ⚔️" highlight={true} />
                <D6Die value={4} label="Dé #4" sublabel="+1 Précision 🎯" highlight={true} />
                <D6Die value={6} label="Dé #5" sublabel="+1 Or 🪙" highlight={true} />
              </div>
            </div>

            {/* The 3 Roles of Dice in OPQ */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs pt-1">
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
                <div className="flex items-center gap-2 text-amber-300 font-bold">
                  <span className="w-6 h-6 rounded bg-amber-500/20 text-amber-300 flex items-center justify-center font-mono">1</span>
                  <span>En Combat (5 dés)</span>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  Lancez les 5 dés simultanément. Vous disposez de <strong>5 Relances</strong> pour sculpter la meilleure combinaison possible face à l'adversaire.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
                <div className="flex items-center gap-2 text-amber-300 font-bold">
                  <span className="w-6 h-6 rounded bg-amber-500/20 text-amber-300 flex items-center justify-center font-mono">2</span>
                  <span>Chez Marie-Agnès (2 dés)</span>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  Associez la <strong>somme de deux dés</strong> de marché (de 2 à 12) pour débloquer l'équipement correspondant et l'acheter avec votre or.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
                <div className="flex items-center gap-2 text-amber-300 font-bold">
                  <span className="w-6 h-6 rounded bg-amber-500/20 text-amber-300 flex items-center justify-center font-mono">3</span>
                  <span>Scribe & Apothicaire (1 dé)</span>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  Chaque dé individuel de valeur 1 à 6 vous permet d'acheter un parchemin pour cette face (Scribe) ou une fiole pour la combinaison liée (Apothicaire).
                </p>
              </div>
            </div>
          </div>

          {/* SECTION : LES 3 ÉTAPES DU JEU */}
          <div className="space-y-4">
            <h4 className="font-cinzel text-lg font-bold text-amber-200 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              Comment Jouer une Partie en 3 Étapes Simples
            </h4>

            <div className="grid grid-cols-1 gap-4">
              {/* ÉTAPE 1 */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-white shadow-xl space-y-3">
                <div className="flex items-start justify-between gap-3 border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 font-black font-cinzel text-lg flex items-center justify-center shadow-lg shadow-amber-500/20">
                      1
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">Première Phase</span>
                      <h5 className="font-cinzel text-base font-bold text-white">
                        Le Lancer Initial & les Relances Tactiques (Sculpter sa Main)
                      </h5>
                    </div>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-slate-950 text-slate-300 border border-slate-800 font-mono">
                    5 Relances Offertes
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-2 text-slate-300 leading-relaxed">
                    <p>
                      Au début de chaque affrontement face à un Sbire ou un Boss, vos <strong>5 dés sont jetés</strong> sur la table.
                    </p>
                    <p>
                      Cliquez sur les dés que vous souhaitez <strong>conserver (Garder)</strong> pour les verrouiller. Vous pouvez ensuite cliquer sur <strong>« Relancer les dés libres »</strong> pour relancer uniquement les autres dés.
                    </p>
                    <p>
                      Vous pouvez effectuer jusqu'à <strong>5 relances successives</strong> pour chercher à former une Paire, une Double Paire, un Brelan, une Parité (5 pairs ou 5 impairs), un Full (3+2), un Carré (4) ou un Quintuple (5 identiques).
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-500/30 text-amber-200 space-y-2">
                    <span className="text-[11px] uppercase font-bold text-amber-300 flex items-center gap-1.5">
                      <Lightbulb className="w-4 h-4 text-amber-400" /> Règle d'Or du Game Designer :
                    </span>
                    <p className="text-[11px] leading-relaxed text-amber-200/90">
                      <strong>Chaque Relance inutilisée rapporte +3 Or dans votre Bourse en cas de Victoire !</strong>
                      <br />
                      Si votre premier ou deuxième jet suffit déjà à vaincre le monstre, ne gaspillez pas vos relances : validez le combat pour empocher une fortune en or !
                    </p>
                  </div>
                </div>
              </div>

              {/* ÉTAPE 2 */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-white shadow-xl space-y-3">
                <div className="flex items-start justify-between gap-3 border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 font-black font-cinzel text-lg flex items-center justify-center shadow-lg shadow-amber-500/20">
                      2
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">Deuxième Phase</span>
                      <h5 className="font-cinzel text-base font-bold text-white">
                        Le Choix de Combinaison & la Formule de Puissance
                      </h5>
                    </div>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-slate-950 text-slate-300 border border-slate-800 font-mono">
                    Force × Précision
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-2 text-slate-300 leading-relaxed">
                    <p>
                      Le simulateur analyse automatiquement vos 5 dés et vous propose la liste de <strong>toutes les combinaisons valides</strong> (Paires, Brelans, Full, etc.).
                    </p>
                    <p>
                      La formule mathématique officielle applique la multiplication :
                    </p>
                    <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 font-mono text-center text-amber-300 font-bold">
                      Force Effective × Précision Totale = Puissance Finale
                    </div>
                    <p>
                      <strong>Règle de l'arrondi dès 20 de Force :</strong> Dès que votre Force atteint 20, elle est toujours arrondie à la dizaine inférieure (21..29 valent 20). Visez les paliers ronds (20, 30, 40) !
                    </p>
                  </div>

                  <div className="space-y-2">
                    <span className="text-[11px] font-bold uppercase text-slate-400 block">Les 3 Issues Possibles :</span>
                    <div className="space-y-1.5">
                      <div className="p-2 rounded-lg bg-emerald-950/40 border border-emerald-800 text-[11px]">
                        <strong className="text-emerald-400">1. Victoire standard (Puissance ≥ Seuil) :</strong> Vous gagnez l'Or des dés + l'Or des relances restantes (+3 Or par relance).
                      </div>
                      <div className="p-2 rounded-lg bg-amber-950/40 border border-amber-800 text-[11px]">
                        <strong className="text-amber-300">2. Victoire Critique (Puissance ≥ 2× Seuil) :</strong> Victoire éclatante ! En plus de l'Or, vous ouvrez le <strong>Coffre aux Trésors</strong> du monstre.
                      </div>
                      <div className="p-2 rounded-lg bg-rose-950/40 border border-rose-800 text-[11px]">
                        <strong className="text-rose-400">3. Défaite (Puissance &lt; Seuil) :</strong> Contre un Sbire, vous touchez quand même l'or des dés pour acheter du matériel. <em>Attention : la défaite face à un Boss est éliminatoire !</em>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ÉTAPE 3 */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-white shadow-xl space-y-3">
                <div className="flex items-start justify-between gap-3 border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 font-black font-cinzel text-lg flex items-center justify-center shadow-lg shadow-amber-500/20">
                      3
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">Troisième Phase</span>
                      <h5 className="font-cinzel text-base font-bold text-white">
                        Le Marché Itinérant & la Progression de votre Héros
                      </h5>
                    </div>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-slate-950 text-slate-300 border border-slate-800 font-mono">
                    3 Marchands Spécialisés
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
                    <div className="flex items-center gap-2 text-amber-300 font-bold">
                      <ShoppingBag className="w-4 h-4 text-amber-400" />
                      <span>Marie-Agnès (Équipements)</span>
                    </div>
                    <p className="text-[11px] text-slate-300 leading-relaxed">
                      Sélectionnez <strong>deux dés de marché</strong> dont la somme (2 à 12) correspond à l'un des équipements de sa boutique. Payez son coût en or pour équiper des effets passifs durables.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
                    <div className="flex items-center gap-2 text-amber-300 font-bold">
                      <Scroll className="w-4 h-4 text-amber-400" />
                      <span>Le Scribe (Faces de Dés)</span>
                    </div>
                    <p className="text-[11px] text-slate-300 leading-relaxed">
                      Utilisez vos dés de valeur 1 à 6 pour inscrire des bonus permanents de Force (+⚔️), de Précision (+🎯) ou d'Or (+🪙) directement sur vos faces de dés.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
                    <div className="flex items-center gap-2 text-amber-300 font-bold">
                      <FlaskConical className="w-4 h-4 text-amber-400" />
                      <span>L'Apothicaire (Combos & Fioles)</span>
                    </div>
                    <p className="text-[11px] text-slate-300 leading-relaxed">
                      Améliorez de manière permanente vos combinaisons (Paires, Full, Quintuple) ou stockez jusqu'à 3 <strong>Fioles Spéciales consommables</strong> dans votre Ceinture d'Élixirs !
                    </p>
                  </div>
                </div>

                <div className="p-3 bg-purple-950/20 border border-purple-800/40 rounded-xl flex items-center justify-between text-xs text-purple-200">
                  <span className="flex items-center gap-2">
                    <Flame className="w-4 h-4 text-purple-400" />
                    <strong>La Marche vers la Gloire :</strong> 3 Sbires ➔ Boss d'Acte 1 ➔ Acte 2 ➔ Acte 3 ➔ Victoire Finale & Mode Infini !
                  </span>
                  <span className="font-bold text-amber-300 text-[11px] hidden sm:inline">Bonne Quête Aventurier !</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 1: HEROES */}
      {activeTab === 'heroes' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredHeroes.map(hero => (
            <div key={hero.id} className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-white space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-slate-950 border border-slate-700 flex items-center justify-center font-bold text-amber-300 font-cinzel">
                  {hero.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-cinzel text-sm font-bold text-amber-200">{hero.name}</h3>
                  <span className="text-[11px] text-slate-400 block">{hero.title}</span>
                </div>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed pt-1 border-t border-slate-800/80">
                {hero.description}
              </p>
              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                <span>Or de départ : <strong className="text-amber-300">{hero.startingGold} 🪙</strong></span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 2: BOSSES (36 BOSSES WITH BASE STATS & DIFFICULTY) */}
      {activeTab === 'bosses' && (
        <div className="space-y-6">
          {/* Controls: Act Filter, Difficulty Filter, and Sorting */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              {/* Act Filters */}
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-xs text-slate-400 font-semibold mr-1 flex items-center gap-1">
                  <Filter className="w-3.5 h-3.5" /> Acte :
                </span>
                <button
                  onClick={() => setBossActFilter('all')}
                  className={`px-2.5 py-1 text-xs rounded-lg font-semibold transition-colors cursor-pointer ${
                    bossActFilter === 'all'
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                      : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  Tous ({BOSSES_CATALOG.length})
                </button>
                <button
                  onClick={() => setBossActFilter(1)}
                  className={`px-2.5 py-1 text-xs rounded-lg font-semibold transition-colors cursor-pointer ${
                    bossActFilter === 1
                      ? 'bg-emerald-600 text-white font-bold shadow-sm'
                      : 'bg-slate-950 text-emerald-400 hover:text-white border border-slate-800'
                  }`}
                >
                  Acte 1 (12 Boss · 140–165)
                </button>
                <button
                  onClick={() => setBossActFilter(2)}
                  className={`px-2.5 py-1 text-xs rounded-lg font-semibold transition-colors cursor-pointer ${
                    bossActFilter === 2
                      ? 'bg-amber-600 text-white font-bold shadow-sm'
                      : 'bg-slate-950 text-amber-400 hover:text-white border border-slate-800'
                  }`}
                >
                  Acte 2 (12 Boss · 570–650)
                </button>
                <button
                  onClick={() => setBossActFilter(3)}
                  className={`px-2.5 py-1 text-xs rounded-lg font-semibold transition-colors cursor-pointer ${
                    bossActFilter === 3
                      ? 'bg-red-600 text-white font-bold shadow-sm'
                      : 'bg-slate-950 text-red-400 hover:text-white border border-slate-800'
                  }`}
                >
                  Acte 3 (12 Boss · 1850–2250)
                </button>
              </div>

              {/* Sort Selector */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <ArrowUpDown className="w-3.5 h-3.5" /> Trier :
                </span>
                <select
                  value={bossSort}
                  onChange={e => setBossSort(e.target.value as 'threshold_asc' | 'threshold_desc' | 'difficulty_desc' | 'name_asc')}
                  className="bg-slate-950 border border-slate-700 text-white text-xs rounded-lg px-2.5 py-1 focus:outline-none focus:border-amber-500 cursor-pointer"
                >
                  <option value="threshold_asc">Seuil croissant (140 ➔ 2250)</option>
                  <option value="threshold_desc">Seuil décroissant (2250 ➔ 140)</option>
                  <option value="difficulty_desc">Difficulté (⭐⭐⭐⭐⭐ ➔ ⭐⭐)</option>
                  <option value="name_asc">Nom (A ➔ Z)</option>
                </select>
              </div>
            </div>

            {/* Difficulty Tier Filter Chips */}
            <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-800/80 text-xs">
              <span className="text-slate-400 font-semibold mr-1">Niveau de Difficulté :</span>
              {(['all', 'Modéré', 'Corsé', 'Redoutable', 'Cauchemardesque', 'Mythique'] as const).map(tier => (
                <button
                  key={tier}
                  onClick={() => setBossTierFilter(tier)}
                  className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-colors cursor-pointer ${
                    bossTierFilter === tier
                      ? 'bg-purple-600 text-white shadow-sm font-bold'
                      : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {tier === 'all'
                    ? 'Toutes Difficultés'
                    : tier === 'Modéré'
                    ? '⭐⭐ Modéré'
                    : tier === 'Corsé'
                    ? '⭐⭐⭐ Corsé'
                    : tier === 'Redoutable'
                    ? '⭐⭐⭐⭐ Redoutable'
                    : tier === 'Cauchemardesque'
                    ? '⭐⭐⭐⭐ Cauchemardesque'
                    : '⭐⭐⭐⭐⭐ Mythique'}
                </button>
              ))}
            </div>
          </div>

          {/* Game Design Architecture Banner */}
          <div className="bg-gradient-to-r from-slate-900 via-purple-950/40 to-slate-900 border border-purple-800/40 rounded-xl p-4 text-white shadow-xl space-y-3">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-purple-900/60 border border-purple-700 flex items-center justify-center text-purple-300">
                  <Skull className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-cinzel text-sm font-bold text-amber-200">
                    Étude de Game Design : Équilibrage des Boss & Anti-« Gros Bill »
                  </h3>
                  <p className="text-[11px] text-slate-300">
                    Comment le système de <em>One Page Quest</em> préserve la tension dramatique sans rendre le joueur invincible :
                  </p>
                </div>
              </div>
              <span className="text-[10px] uppercase font-mono font-bold bg-purple-950 text-purple-300 border border-purple-800 px-2.5 py-1 rounded-full whitespace-nowrap">
                36 Boss Étalonnés
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs pt-1">
              <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-emerald-400">
                  <span>Acte 1 : 140 – 165 Puissance</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Validation des bases. Requiert une Force ~15–20 et Précision ~8–11. Une simple Paire ou Double Paire bien dosée suffit.
                </p>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-amber-400">
                  <span>Acte 2 : 570 – 650 Puissance</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Le mur de mi-parcours. Requiert Force ~30 et Précision ~20. Nécessite un Brelan, Parité ou Full avec équipements de Marie-Agnès.
                </p>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-rose-400">
                  <span>Acte 3 : 1850 – 2250 Puissance</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Le test ultime. L'arrondi à la dizaine dès 20 de Force impose d'atteindre 50+ de Force et 40+ de Précision ou d'utiliser les Fioles Spéciales.
                </p>
              </div>
            </div>
          </div>

          {/* Bosses Grid */}
          {filteredBosses.length === 0 ? (
            <div className="text-center p-8 bg-slate-900 border border-slate-800 rounded-xl text-slate-400 text-xs">
              Aucun boss ne correspond à vos filtres actuels.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredBosses.map(boss => {
                const critMultiplier = boss.id === 'b3_10' ? 2.5 : 2;
                const critThreshold = Math.round(boss.powerThreshold * critMultiplier);

                return (
                  <div
                    key={boss.id}
                    className={`bg-slate-900 border rounded-xl p-4 text-white space-y-3 shadow-lg transition-all ${
                      boss.act === 1
                        ? 'border-emerald-950 hover:border-emerald-700/60'
                        : boss.act === 2
                        ? 'border-amber-950 hover:border-amber-700/60'
                        : 'border-red-950 hover:border-red-700/60'
                    }`}
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-1.5 mb-1">
                          <span
                            className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded border ${
                              boss.act === 1
                                ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                                : boss.act === 2
                                ? 'bg-amber-950 text-amber-300 border-amber-800'
                                : 'bg-red-950 text-red-300 border-red-800'
                            }`}
                          >
                            Acte {boss.act}
                          </span>
                          {boss.archetype && (
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800">
                              {boss.archetype}
                            </span>
                          )}
                        </div>
                        <h3 className="font-cinzel text-base font-bold text-white leading-tight">
                          {boss.name}
                        </h3>
                      </div>

                      {/* Difficulty Stars */}
                      <div className="text-right shrink-0">
                        <div className="flex items-center gap-0.5 text-amber-400">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${
                                i < (boss.difficultyRating || 3)
                                  ? 'fill-amber-400 text-amber-400'
                                  : 'text-slate-700'
                              }`}
                            />
                          ))}
                        </div>
                        <span
                          className={`text-[10px] font-bold uppercase tracking-wider block mt-0.5 ${
                            boss.difficultyTier === 'Modéré'
                              ? 'text-emerald-400'
                              : boss.difficultyTier === 'Corsé'
                              ? 'text-amber-400'
                              : boss.difficultyTier === 'Redoutable'
                              ? 'text-orange-400'
                              : 'text-rose-400'
                          }`}
                        >
                          {boss.difficultyTier || 'Corsé'}
                        </span>
                      </div>
                    </div>

                    {/* Base Stats Metrics */}
                    <div className="grid grid-cols-2 gap-2 p-2.5 rounded-lg bg-slate-950/80 border border-slate-800 font-mono text-center">
                      <div className="p-1 rounded bg-slate-900/60">
                        <span className="text-[10px] text-slate-400 uppercase font-sans block">
                          Seuil Standard
                        </span>
                        <span className="text-sm font-black text-amber-300">
                          {boss.powerThreshold}+
                        </span>
                      </div>
                      <div className="p-1 rounded bg-slate-900/60">
                        <span className="text-[10px] text-slate-400 uppercase font-sans block">
                          Victoire Critique ({critMultiplier}×)
                        </span>
                        <span className="text-sm font-black text-emerald-400">
                          {critThreshold}+
                        </span>
                      </div>
                    </div>

                    {/* Special Power Rule */}
                    <div className="p-2.5 rounded bg-red-950/20 border border-red-900/40 text-xs text-slate-300 space-y-1">
                      <div className="flex items-center gap-1.5 text-red-300 font-bold text-[11px] uppercase tracking-wide">
                        <AlertTriangle className="w-3.5 h-3.5 text-red-400 shrink-0" />
                        <span>Pouvoir Redoutable du Boss</span>
                      </div>
                      <p className="text-[11px] text-slate-200 leading-relaxed">{boss.powerRule}</p>
                    </div>

                    {/* Game Designer Tactical Tip */}
                    {boss.tacticalTip && (
                      <div className="p-2.5 rounded bg-amber-950/25 border border-amber-900/40 text-xs space-y-1">
                        <div className="flex items-center gap-1.5 text-amber-300 font-bold text-[11px] uppercase tracking-wide">
                          <Lightbulb className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                          <span>Conseil Tactique du Game Designer</span>
                        </div>
                        <p className="text-[11px] text-amber-200/90 italic leading-relaxed">
                          « {boss.tacticalTip} »
                        </p>
                      </div>
                    )}

                    {/* Chest Reward */}
                    <div className="text-xs text-slate-400 pt-2 border-t border-slate-800/80 flex items-start gap-2">
                      <Gift className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">
                          Récompense de Coffre :
                        </span>
                        <span className="text-slate-300 text-[11px] leading-tight">
                          {boss.chestEffect}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: CHESTS */}
      {activeTab === 'chests' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredChests.map(chest => (
            <div key={chest.id} className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 text-white space-y-1.5">
              <div className="flex items-center justify-between">
                <h3 className="font-cinzel text-xs font-bold text-amber-200">{chest.name}</h3>
                <span className="text-[10px] text-slate-400">Acte {chest.act}</span>
              </div>
              <p className="text-xs text-slate-300 leading-normal">{chest.effect}</p>
            </div>
          ))}
        </div>
      )}

      {/* TAB 4: EQUIPMENTS */}
      {activeTab === 'equipments' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredEquipments.map(eq => (
            <div key={eq.id} className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 text-white space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded bg-slate-950 border border-slate-700 text-amber-300 font-mono text-xs font-bold flex items-center justify-center">
                    {eq.requiredSum}
                  </span>
                  <span className="font-cinzel text-xs font-bold text-white">{eq.name}</span>
                </div>
                <span className="font-mono text-xs font-bold text-amber-300">{eq.cost} 🪙</span>
              </div>

              <p className="text-xs text-slate-300 leading-normal">{eq.effect}</p>

              <div className="text-[10px] text-slate-400 flex items-center gap-1 pt-1 border-t border-slate-800">
                <span>Type : </span>
                <strong className="text-slate-200 capitalize">
                  {eq.type === 'immediate'
                    ? '⚡ Immédiat'
                    : eq.type === 'combat'
                    ? '⚔️ Combat'
                    : eq.type === 'permanent'
                    ? '♾️ Permanent'
                    : '🔼 Cumulatif'}
                </strong>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 5: APOTHECARY (36 PERMANENT POTIONS + 6 TACTICAL SPECIAL POTIONS) */}
      {activeTab === 'apothecary' && (
        <div className="space-y-6">
          {/* Sub-Category Filter */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-900 border border-slate-800 rounded-xl">
            <button
              onClick={() => setApothecarySubTab('all')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                apothecarySubTab === 'all'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Toutes ({filteredApothecary.length + filteredSpecialPotions.length})
            </button>
            <button
              onClick={() => setApothecarySubTab('special')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                apothecarySubTab === 'special'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-purple-300 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>🧪 Fioles Spéciales Tactiques ({filteredSpecialPotions.length})</span>
            </button>
            <button
              onClick={() => setApothecarySubTab('permanent')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                apothecarySubTab === 'permanent'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              ⚗️ Améliorations Permanentes ({filteredApothecary.length})
            </button>
          </div>

          {/* SECTION A: FIOLES SPÉCIALES (CONSUMABLES) */}
          {(apothecarySubTab === 'all' || apothecarySubTab === 'special') && filteredSpecialPotions.length > 0 && (
            <div className="space-y-3">
              <div className="p-3 bg-gradient-to-r from-purple-950/60 to-slate-900 border border-purple-800/60 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div>
                  <h3 className="font-cinzel text-sm font-bold text-purple-200 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-purple-400" />
                    Fioles Spéciales de l'Apothicaire (Consommables Tactiques)
                  </h3>
                  <p className="text-[11px] text-purple-300/80">
                    Élixirs à usage unique équipables dans votre Ceinture d'Élixirs (3 emplacements max). Buvez-les au moment décisif d'un combat contre un Boss pour changer un dé, relancer, ignorer l'arrondi ou doubler l'or !
                  </p>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 bg-purple-900/60 text-purple-200 border border-purple-700/50 rounded-lg whitespace-nowrap">
                  Usage Unique en Combat
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {filteredSpecialPotions.map(potion => (
                  <div
                    key={potion.id}
                    className="bg-slate-900/90 border border-purple-800/40 hover:border-purple-600/70 transition-colors rounded-xl p-3.5 text-white space-y-2.5 shadow-lg"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="w-6 h-6 rounded bg-purple-950 border border-purple-700 text-purple-300 flex items-center justify-center text-xs">
                          🧪
                        </span>
                        <span className="font-cinzel text-xs font-bold text-purple-200">{potion.name}</span>
                      </div>
                      <span className="font-mono text-xs font-bold text-amber-300 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-800/50">
                        {potion.cost} 🪙
                      </span>
                    </div>

                    <div className="p-2 rounded-lg bg-purple-950/30 border border-purple-900/50 text-xs">
                      <span className="text-[10px] uppercase font-bold text-purple-300 block mb-0.5">Effet Actif :</span>
                      <p className="text-amber-200 font-medium">{potion.effect}</p>
                    </div>

                    <p className="text-[11px] text-slate-300 italic leading-relaxed">
                      « {potion.description} »
                    </p>

                    <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-400">
                      <span>Type : <strong className="text-purple-300">{potion.type.replace('_', ' ')}</strong></span>
                      <span className="text-emerald-400 font-semibold">Simulateur & Fiche A4</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECTION B: AMÉLIORATIONS PERMANENTES */}
          {(apothecarySubTab === 'all' || apothecarySubTab === 'permanent') && filteredApothecary.length > 0 && (
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <h3 className="font-cinzel text-sm font-bold text-amber-200 flex items-center gap-2">
                  <FlaskConical className="w-4 h-4 text-amber-400" />
                  Améliorations Permanentes de Combinaisons (36 Fioles d'Apothicaire)
                </h3>
                <span className="text-[11px] text-slate-400">Dés requis 1 à 6</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {filteredApothecary.map(potion => (
                  <div key={potion.id} className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 text-white space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="w-5 h-5 rounded bg-slate-950 border border-slate-700 text-amber-300 font-mono text-xs font-bold flex items-center justify-center">
                          {potion.dieRequired}
                        </span>
                        <span className="font-cinzel text-xs font-bold text-white">{potion.name}</span>
                      </div>
                      <span className="font-mono text-xs font-bold text-amber-300">{potion.cost} 🪙</span>
                    </div>

                    <div className="text-xs text-slate-300">
                      <span className="capitalize font-semibold text-amber-200">
                        {potion.targetCombo.replace('_', ' ')}
                      </span>
                      <span className="text-slate-400"> : </span>
                      <strong className="text-white">
                        +{potion.bonusValue}{' '}
                        {potion.bonusType === 'force'
                          ? '⚔️ Force'
                          : potion.bonusType === 'precision'
                          ? '🎯 Précision'
                          : potion.bonusType === 'force_and_precision'
                          ? '⚔️ Force & 🎯 Précision'
                          : '🪙 Or'}
                      </strong>
                    </div>

                    {potion.description && (
                      <p className="text-[11px] text-slate-400 leading-normal italic">
                        {potion.description}
                      </p>
                    )}

                    <div className="text-[10px] text-slate-500 pt-1 border-t border-slate-800">
                      <span>Dé requis : Dé de valeur {potion.dieRequired}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 6: SCRIBE (24 MANUSCRITS) */}
      {activeTab === 'scribe' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredScribe.map(scroll => (
            <div key={scroll.id} className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 text-white space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded bg-slate-950 border border-slate-700 text-amber-300 font-mono text-xs font-bold flex items-center justify-center">
                    {scroll.dieRequired}
                  </span>
                  <span className="font-cinzel text-xs font-bold text-white">{scroll.name}</span>
                </div>
                <span className="font-mono text-xs font-bold text-amber-300">{scroll.cost} 🪙</span>
              </div>

              <div className="text-xs text-slate-300">
                <span className="font-semibold text-amber-200">
                  Face {scroll.targetFace}
                </span>
                <span className="text-slate-400"> : </span>
                <strong className="text-white">
                  +{scroll.bonusValue}{' '}
                  {scroll.bonusType === 'force'
                    ? '⚔️ Force'
                    : scroll.bonusType === 'precision'
                    ? '🎯 Précision'
                    : '🪙 Or'}
                </strong>
              </div>

              {scroll.description && (
                <p className="text-[11px] text-slate-400 leading-normal italic">
                  {scroll.description}
                </p>
              )}

              <div className="text-[10px] text-slate-500 pt-1 border-t border-slate-800">
                <span>Dé requis : Dé de valeur {scroll.dieRequired}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
