import React from 'react';
import { X, BookOpen, Swords, Target, Coins, ShieldAlert, Sparkles, RefreshCw, Trophy } from 'lucide-react';

interface RulesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RulesModal: React.FC<RulesModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-3xl w-full max-h-[85vh] flex flex-col shadow-2xl text-white overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <BookOpen className="w-5 h-5 text-amber-400" />
            <h2 className="font-cinzel text-lg font-bold text-amber-100">Règles Officielles - One Page Quest</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-300 leading-relaxed">
          {/* Section 1: Intro */}
          <div className="space-y-2 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            <h3 className="font-cinzel text-base font-bold text-amber-300">Présentation du Jeu</h3>
            <p className="text-xs">
              <strong>ONE PAGE QUEST</strong> est un roguelike fantasy solo jouable avec 5 dés à 6 faces (d6), une feuille de jeu et un crayon. Vous incarnez un personnage disposant d’une capacité spéciale. Créez des combinaisons de dés, améliorez votre personnage et tentez de vaincre les 3 Boss de la partie.
            </p>
            <p className="text-xs">
              Chaque Acte contient <strong>3 Sbires suivis d’un Boss</strong>. Les ennemis sont affrontés par ordre croissant de Puissance. Les Boss disposent d’un pouvoir spécial néfaste.
            </p>
          </div>

          {/* Section 2: Combat & Power Formula */}
          <div className="space-y-3">
            <h3 className="font-cinzel text-base font-bold text-amber-300 flex items-center gap-2">
              <Swords className="w-4 h-4 text-amber-400" /> 1. Combattre
            </h3>
            <p className="text-xs">
              Lancez 5 dés et utilisez vos <strong>5 Relances</strong> pour former la meilleure Combinaison possible :
            </p>
            <ul className="grid grid-cols-2 gap-2 text-xs text-slate-300">
              <li className="p-2 rounded bg-slate-950 border border-slate-800">
                <strong>Paire :</strong> 2 dés de même valeur
              </li>
              <li className="p-2 rounded bg-slate-950 border border-slate-800">
                <strong>Double Paire :</strong> 2 paires de valeurs distinctes
              </li>
              <li className="p-2 rounded bg-slate-950 border border-slate-800">
                <strong>Brelan :</strong> 3 dés de même valeur
              </li>
              <li className="p-2 rounded bg-slate-950 border border-slate-800">
                <strong>Parité :</strong> 5 dés tous pairs ou tous impairs (avec les 3 valeurs distinctes)
              </li>
              <li className="p-2 rounded bg-slate-950 border border-slate-800">
                <strong>Full :</strong> 1 Brelan et 1 Paire
              </li>
              <li className="p-2 rounded bg-slate-950 border border-slate-800">
                <strong>Carré :</strong> 4 dés de même valeur
              </li>
              <li className="p-2 rounded bg-slate-950 border border-slate-800 col-span-2">
                <strong>Quintuple :</strong> 5 dés de même valeur
              </li>
            </ul>

            <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl space-y-2 text-xs">
              <span className="font-bold text-amber-300 block">Calcul de la Puissance :</span>
              <p>
                Votre Puissance est égale à votre <strong>Force totale × Précision totale</strong>.
              </p>
              <div className="p-2 bg-slate-950/70 rounded border border-slate-800 text-slate-200">
                <strong>Règle de l’Arrondi :</strong> À partir de 20, la Force est toujours arrondie à la dizaine inférieure avant multiplication (ex. 26 → 20, 39 → 30).
              </div>
              <p className="text-[11px] text-slate-400">
                Les valeurs d’une même Face ou d’une même Combinaison ne peuvent jamais dépasser 20 Force, 20 Précision et 20 Or.
              </p>
            </div>
          </div>

          {/* Section 3: Combat Results */}
          <div className="space-y-3">
            <h3 className="font-cinzel text-base font-bold text-amber-300 flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-400" /> 2. Résultat du Combat
            </h3>
            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded bg-slate-950 border border-slate-800">
                <span className="font-bold text-slate-200">Défaite (contre un Sbire) :</span> Puissance inférieure au seuil demandé. Gagnez l'Or des Faces et de la Combinaison. Passez à l'ennemi suivant. Lancez <strong>3 dés</strong> chez les Marchands.
              </div>
              <div className="p-2.5 rounded bg-slate-950 border border-slate-800">
                <span className="font-bold text-emerald-400">Victoire :</span> Puissance égale ou supérieure au seuil. Gagnez <strong>3 Or par Relance inutilisée</strong> ET l'Or des Faces et de la Combinaison. Lancez <strong>4 dés</strong> chez les Marchands.
              </div>
              <div className="p-2.5 rounded bg-slate-950 border border-slate-800">
                <span className="font-bold text-amber-400">Victoire Critique :</span> Puissance égale ou supérieure au double (2×) du seuil. Gagnez 3 Or par Relance inutilisée, l'Or des dés, ET <strong>obtenez le contenu du Coffre</strong>. Lancez <strong>5 dés</strong> chez les Marchands.
              </div>
              <div className="p-2.5 rounded bg-red-950/50 border border-red-800 text-red-200">
                <span className="font-bold text-red-300">Défaite contre un Boss :</span> La partie se termine immédiatement ! En cas de défaite, vous pouvez conserver un équipement de votre choix pour votre prochaine partie.
              </div>
            </div>
          </div>

          {/* Section 4: Merchants */}
          <div className="space-y-3">
            <h3 className="font-cinzel text-base font-bold text-amber-300 flex items-center gap-2">
              <Coins className="w-4 h-4 text-amber-400" /> 3. Visiter les Marchands
            </h3>
            <p className="text-xs">
              Après chaque combat, lancez 3, 4 ou 5 dés selon le résultat. Les Relances non utilisées pendant le combat peuvent être utilisées pour relancer ces dés.
            </p>
            <ul className="space-y-2 text-xs">
              <li className="p-2 bg-slate-950 rounded border border-slate-800">
                <strong>Scribe Sans-Visage :</strong> Placez 1 dé sur l'article correspondant à sa valeur (1 à 6). Améliore définitivement les Faces des dés.
              </li>
              <li className="p-2 bg-slate-950 rounded border border-slate-800">
                <strong>Apothicaire :</strong> Placez 1 dé sur l'article correspondant à sa valeur. Améliore définitivement les Combinaisons.
              </li>
              <li className="p-2 bg-slate-950 rounded border border-slate-800">
                <strong>Marie-Agnès :</strong> Associez 2 dés et faites-en la somme (2 à 12). Vends des équipements aux pouvoirs Immédiats (⚡), de Combat (⚔️), Permanents (♾️) ou Cumulatifs (🔼).
              </li>
            </ul>
          </div>

          {/* Section 5: Mode Infini */}
          <div className="space-y-2 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            <h3 className="font-cinzel text-base font-bold text-red-400">Mode Infini</h3>
            <p className="text-xs">
              Après avoir vaincu le 3e Boss, vous pouvez poursuivre votre aventure en gommant les résultats des combats précédents. Ignorez alors l'Acte 1 et reprenez à partir de l'Acte 2, en multipliant les seuils de Puissance par 10 (puis 100, etc.) !
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-bold rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors shadow-lg cursor-pointer"
          >
            J'ai compris
          </button>
        </div>
      </div>
    </div>
  );
};
