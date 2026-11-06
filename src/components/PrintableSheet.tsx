import React, { useState } from 'react';
import { AdventureScenario, CombinationType } from '../types/game';
import { Printer, RotateCcw, Palette, CheckCircle2 } from 'lucide-react';

interface PrintableSheetProps {
  scenario: AdventureScenario;
  onRegenerate: () => void;
}

export const PrintableSheet: React.FC<PrintableSheetProps> = ({ scenario, onRegenerate }) => {
  const [printTheme, setPrintTheme] = useState<'bw' | 'parchment'>('bw');
  // Interactive ticking state so players can fill or mark on the sheet
  const [tickedBoxes, setTickedBoxes] = useState<Record<string, boolean>>({});

  const toggleTick = (id: string) => {
    setTickedBoxes(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handlePrint = () => {
    window.print();
  };

  const isBw = printTheme === 'bw';

  return (
    <div className="space-y-4">
      {/* Action Toolbar (hidden on print) */}
      <div className="no-print bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4 text-white shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-amber-500/10 border border-amber-500/20 rounded-lg text-amber-400">
            <Printer className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-semibold font-cinzel text-amber-100">Feuille d'Aventure Imprimable A4</h2>
            <p className="text-xs text-slate-400">
              Format fidèle au PDF original de la campagne Kickstarter. Prêt pour impression directe ou jeu au stylo numérique.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Theme switcher */}
          <button
            onClick={() => setPrintTheme(prev => (prev === 'bw' ? 'parchment' : 'bw'))}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
            title="Basculer entre style Noir & Blanc (économie d'encre) et Parchemin ancien"
          >
            <Palette className="w-3.5 h-3.5 text-amber-400" />
            <span>{isBw ? 'Noir & Blanc (Éco Encre)' : 'Style Parchemin'}</span>
          </button>

          <button
            onClick={() => setTickedBoxes({})}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            title="Effacer les annotations numériques"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Effacer les traits</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors shadow-lg shadow-amber-500/20"
          >
            <Printer className="w-4 h-4" />
            <span>Imprimer la Feuille A4 (PDF)</span>
          </button>
        </div>
      </div>

      {/* Sheet Container matching A4 dimensions */}
      <div className="overflow-x-auto pb-6 flex justify-center">
        <div
          className={`print-sheet-container w-[1000px] min-w-[1000px] border-2 border-black p-4 text-black select-none transition-colors duration-200 ${
            isBw ? 'bg-white' : 'bg-[#fcf8ed] border-[#3d2b1f]'
          }`}
          style={{ boxSizing: 'border-box' }}
        >
          {/* GRID LAYOUT: 3 Main Columns */}
          <div className="grid grid-cols-12 gap-3">

            {/* LEFT COLUMN (Cols 1-3): Hero Card + Valeurs de Faces + Valeurs de Combinaisons */}
            <div className="col-span-3 space-y-3">
              {/* Hero Banner */}
              <div className="border border-black p-2 bg-white relative">
                <div className="flex items-center gap-2">
                  <div className="w-12 h-12 border border-black overflow-hidden shrink-0 bg-slate-100 flex items-center justify-center font-cinzel font-bold text-lg">
                    <img
                      src="./assets/images/opq_mercenary_art_1793969941470.jpg"
                      alt={scenario.hero.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-600 block">Héros</span>
                    <h3 className="font-cinzel text-xs font-extrabold leading-tight truncate">{scenario.hero.name}</h3>
                    <span className="text-[9px] italic text-slate-700 block truncate">{scenario.hero.title}</span>
                  </div>
                </div>
                <div className="mt-1.5 pt-1.5 border-t border-dashed border-black/40 text-[9px] leading-tight">
                  <span className="font-bold">{scenario.hero.name} : </span>
                  <span>{scenario.hero.description}</span>
                </div>
              </div>

              {/* VALEURS DE FACES */}
              <div className="border border-black p-1.5 bg-white">
                <div className="bg-black text-white text-[10px] font-bold tracking-widest text-center py-0.5 uppercase mb-1">
                  Valeurs de Faces
                </div>
                <div className="grid grid-cols-4 text-center text-[9px] font-bold border-b border-black pb-1 mb-1">
                  <span>Dé</span>
                  <span title="Force">⚔️ Force</span>
                  <span title="Précision">🎯 Préc.</span>
                  <span title="Or">🪙 Or</span>
                </div>

                {/* Faces 1 to 6 */}
                {[1, 2, 3, 4, 5, 6].map(dieVal => (
                  <div key={`face-${dieVal}`} className="grid grid-cols-4 items-center text-[9px] border-b border-dotted border-black/30 py-1">
                    <div className="flex items-center justify-center font-bold font-mono text-xs">
                      <span className="inline-flex items-center justify-center w-5 h-5 border border-black rounded bg-slate-50">
                        {dieVal}
                      </span>
                    </div>

                    {/* Force slot */}
                    <div className="px-1 flex items-center justify-center gap-0.5">
                      {[1, 2, 3, 4].map(slot => {
                        const id = `face_${dieVal}_f_${slot}`;
                        const isChecked = tickedBoxes[id];
                        return (
                          <button
                            key={id}
                            onClick={() => toggleTick(id)}
                            className={`w-2.5 h-3.5 border border-black text-[7px] font-bold flex items-center justify-center transition-colors ${
                              isChecked ? 'bg-black text-white' : 'bg-transparent hover:bg-black/10'
                            }`}
                          >
                            {isChecked ? '|' : ''}
                          </button>
                        );
                      })}
                    </div>

                    {/* Precision slot */}
                    <div className="px-1 flex items-center justify-center gap-0.5">
                      {[1, 2, 3, 4].map(slot => {
                        const id = `face_${dieVal}_p_${slot}`;
                        const isChecked = tickedBoxes[id];
                        return (
                          <button
                            key={id}
                            onClick={() => toggleTick(id)}
                            className={`w-2.5 h-3.5 border border-black text-[7px] font-bold flex items-center justify-center transition-colors ${
                              isChecked ? 'bg-black text-white' : 'bg-transparent hover:bg-black/10'
                            }`}
                          >
                            {isChecked ? '|' : ''}
                          </button>
                        );
                      })}
                    </div>

                    {/* Gold slot */}
                    <div className="px-1 flex items-center justify-center gap-0.5">
                      {[1, 2, 3, 4].map(slot => {
                        const id = `face_${dieVal}_g_${slot}`;
                        const isChecked = tickedBoxes[id];
                        return (
                          <button
                            key={id}
                            onClick={() => toggleTick(id)}
                            className={`w-2.5 h-3.5 border border-black text-[7px] font-bold flex items-center justify-center transition-colors ${
                              isChecked ? 'bg-black text-white' : 'bg-transparent hover:bg-black/10'
                            }`}
                          >
                            {isChecked ? '|' : ''}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* VALEURS DE COMBINAISONS */}
              <div className="border border-black p-1.5 bg-white">
                <div className="bg-black text-white text-[10px] font-bold tracking-widest text-center py-0.5 uppercase mb-1">
                  Valeurs de Combinaisons
                </div>
                <div className="grid grid-cols-4 text-center text-[9px] font-bold border-b border-black pb-1 mb-1">
                  <span>Combo</span>
                  <span title="Force">⚔️</span>
                  <span title="Précision">🎯</span>
                  <span title="Or">🪙</span>
                </div>

                {[
                  { key: 'paire', label: 'Paire' },
                  { key: 'double_paire', label: 'Double Paire' },
                  { key: 'brelan', label: 'Brelan' },
                  { key: 'parite', label: 'Parité' },
                  { key: 'full', label: 'Full' },
                  { key: 'carre', label: 'Carré' },
                  { key: 'quintuple', label: 'Quintuple' }
                ].map(item => (
                  <div key={`combo-${item.key}`} className="grid grid-cols-4 items-center text-[9px] border-b border-dotted border-black/30 py-1">
                    <span className="font-semibold truncate text-[8.5px]">{item.label}</span>

                    {/* Force */}
                    <div className="flex items-center justify-center gap-0.5">
                      {[1, 2, 3].map(slot => {
                        const id = `combo_${item.key}_f_${slot}`;
                        const isChecked = tickedBoxes[id];
                        return (
                          <button
                            key={id}
                            onClick={() => toggleTick(id)}
                            className={`w-2.5 h-3.5 border border-black text-[7px] font-bold flex items-center justify-center ${
                              isChecked ? 'bg-black text-white' : 'hover:bg-black/10'
                            }`}
                          >
                            {isChecked ? '|' : ''}
                          </button>
                        );
                      })}
                    </div>

                    {/* Precision */}
                    <div className="flex items-center justify-center gap-0.5">
                      {[1, 2, 3].map(slot => {
                        const id = `combo_${item.key}_p_${slot}`;
                        const isChecked = tickedBoxes[id];
                        return (
                          <button
                            key={id}
                            onClick={() => toggleTick(id)}
                            className={`w-2.5 h-3.5 border border-black text-[7px] font-bold flex items-center justify-center ${
                              isChecked ? 'bg-black text-white' : 'hover:bg-black/10'
                            }`}
                          >
                            {isChecked ? '|' : ''}
                          </button>
                        );
                      })}
                    </div>

                    {/* Gold */}
                    <div className="flex items-center justify-center gap-0.5">
                      {[1, 2, 3].map(slot => {
                        const id = `combo_${item.key}_g_${slot}`;
                        const isChecked = tickedBoxes[id];
                        return (
                          <button
                            key={id}
                            onClick={() => toggleTick(id)}
                            className={`w-2.5 h-3.5 border border-black text-[7px] font-bold flex items-center justify-center ${
                              isChecked ? 'bg-black text-white' : 'hover:bg-black/10'
                            }`}
                          >
                            {isChecked ? '|' : ''}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CENTER COLUMN (Cols 4-7): Acte 1, Acte 2, Acte 3 Tracks */}
            <div className="col-span-4 space-y-2.5">

              {/* ACTE 1 */}
              <div className="border-2 border-black p-2 bg-white">
                <div className="bg-black text-white text-[9.5px] font-bold tracking-wider px-2 py-0.5 uppercase mb-1.5 flex justify-between">
                  <span>Acte 1 : {scenario.act1.title}</span>
                </div>

                <div className="space-y-1.5">
                  {scenario.act1.sbires.map((sbire) => (
                    <div key={sbire.id} className="border border-black p-1.5 text-[9px] relative bg-slate-50/50">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold">Sbire {sbire.index}</span>
                        {/* 5 Reroll checkboxes */}
                        <div className="flex items-center gap-1">
                          <span className="text-[7.5px] text-slate-500 uppercase">Relances</span>
                          {[1, 2, 3, 4, 5].map(r => {
                            const id = `act1_s${sbire.index}_r${r}`;
                            const checked = tickedBoxes[id];
                            return (
                              <button
                                key={id}
                                onClick={() => toggleTick(id)}
                                className={`w-3 h-3 border border-black flex items-center justify-center text-[8px] font-bold ${checked ? 'bg-black text-white' : 'bg-white'}`}
                              >
                                {checked ? '✕' : ''}
                              </button>
                            );
                          })}
                        </div>
                        {/* Threshold badge */}
                        <span className="font-mono font-bold text-[10px] bg-black text-white px-1.5 py-0.2 rounded-sm">
                          {sbire.powerThreshold}+
                        </span>
                      </div>

                      {/* Calculation fields */}
                      <div className="flex items-center justify-between text-[8px] border-t border-dotted border-black/40 pt-1">
                        <div className="flex items-center gap-1 font-mono">
                          <span className="w-5 h-4 border border-black text-center flex items-center justify-center">⚔️</span>
                          <span>×</span>
                          <span className="w-5 h-4 border border-black text-center flex items-center justify-center">🎯</span>
                          <span>=</span>
                          <span className="w-8 h-4 border border-black text-center flex items-center justify-center font-bold"></span>
                        </div>
                        <div className="text-[7.5px] text-right text-slate-700 italic max-w-[150px] truncate" title={sbire.chest.effect}>
                          🎁 {sbire.chest.effect}
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Boss 1 */}
                  <div className="border-2 border-black p-1.5 text-[9px] bg-amber-500/10">
                    <div className="flex items-center justify-between font-bold mb-1">
                      <span className="text-[10px] uppercase font-cinzel text-red-950">👑 Boss 1 : {scenario.act1.boss.name}</span>
                      <span className="font-mono text-[10.5px] bg-black text-white px-2 py-0.5 rounded-sm">
                        {scenario.act1.boss.powerThreshold}+
                      </span>
                    </div>
                    <div className="text-[8px] italic border-l-2 border-black pl-1.5 my-1 text-slate-900">
                      <strong>Pouvoir spécial : </strong>{scenario.act1.boss.powerRule}
                    </div>
                    <div className="flex items-center justify-between text-[8px] border-t border-dotted border-black/40 pt-1">
                      <div className="flex items-center gap-1 font-mono">
                        <span className="w-5 h-4 border border-black text-center flex items-center justify-center">⚔️</span>
                        <span>×</span>
                        <span className="w-5 h-4 border border-black text-center flex items-center justify-center">🎯</span>
                        <span>=</span>
                        <span className="w-8 h-4 border border-black text-center flex items-center justify-center font-bold"></span>
                      </div>
                      <span className="text-[8px] text-slate-700">🏆 {scenario.act1.boss.chestEffect}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* ACTE 2 */}
              <div className="border-2 border-black p-2 bg-white">
                <div className="bg-black text-white text-[9.5px] font-bold tracking-wider px-2 py-0.5 uppercase mb-1.5 flex justify-between">
                  <span>Acte 2 : {scenario.act2.title}</span>
                </div>

                <div className="space-y-1.5">
                  {scenario.act2.sbires.map((sbire) => (
                    <div key={sbire.id} className="border border-black p-1.5 text-[9px] relative bg-slate-50/50">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold">Sbire {sbire.index}</span>
                        <div className="flex items-center gap-1">
                          <span className="text-[7.5px] text-slate-500 uppercase">Relances</span>
                          {[1, 2, 3, 4, 5].map(r => {
                            const id = `act2_s${sbire.index}_r${r}`;
                            const checked = tickedBoxes[id];
                            return (
                              <button
                                key={id}
                                onClick={() => toggleTick(id)}
                                className={`w-3 h-3 border border-black flex items-center justify-center text-[8px] font-bold ${checked ? 'bg-black text-white' : 'bg-white'}`}
                              >
                                {checked ? '✕' : ''}
                              </button>
                            );
                          })}
                        </div>
                        <span className="font-mono font-bold text-[10px] bg-black text-white px-1.5 py-0.2 rounded-sm">
                          {sbire.powerThreshold}+
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-[8px] border-t border-dotted border-black/40 pt-1">
                        <div className="flex items-center gap-1 font-mono">
                          <span className="w-5 h-4 border border-black text-center flex items-center justify-center">⚔️</span>
                          <span>×</span>
                          <span className="w-5 h-4 border border-black text-center flex items-center justify-center">🎯</span>
                          <span>=</span>
                          <span className="w-8 h-4 border border-black text-center flex items-center justify-center font-bold"></span>
                        </div>
                        <div className="text-[7.5px] text-right text-slate-700 italic max-w-[150px] truncate" title={sbire.chest.effect}>
                          🎁 {sbire.chest.effect}
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Boss 2 */}
                  <div className="border-2 border-black p-1.5 text-[9px] bg-amber-500/10">
                    <div className="flex items-center justify-between font-bold mb-1">
                      <span className="text-[10px] uppercase font-cinzel text-red-950">👑 Boss 2 : {scenario.act2.boss.name}</span>
                      <span className="font-mono text-[10.5px] bg-black text-white px-2 py-0.5 rounded-sm">
                        {scenario.act2.boss.powerThreshold}+
                      </span>
                    </div>
                    <div className="text-[8px] italic border-l-2 border-black pl-1.5 my-1 text-slate-900">
                      <strong>Pouvoir spécial : </strong>{scenario.act2.boss.powerRule}
                    </div>
                    <div className="flex items-center justify-between text-[8px] border-t border-dotted border-black/40 pt-1">
                      <div className="flex items-center gap-1 font-mono">
                        <span className="w-5 h-4 border border-black text-center flex items-center justify-center">⚔️</span>
                        <span>×</span>
                        <span className="w-5 h-4 border border-black text-center flex items-center justify-center">🎯</span>
                        <span>=</span>
                        <span className="w-8 h-4 border border-black text-center flex items-center justify-center font-bold"></span>
                      </div>
                      <span className="text-[8px] text-slate-700">🏆 {scenario.act2.boss.chestEffect}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* ACTE 3 */}
              <div className="border-2 border-black p-2 bg-white">
                <div className="bg-black text-white text-[9.5px] font-bold tracking-wider px-2 py-0.5 uppercase mb-1.5 flex justify-between">
                  <span>Acte 3 : {scenario.act3.title}</span>
                </div>

                <div className="space-y-1.5">
                  {scenario.act3.sbires.map((sbire) => (
                    <div key={sbire.id} className="border border-black p-1.5 text-[9px] relative bg-slate-50/50">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold">Sbire {sbire.index}</span>
                        <div className="flex items-center gap-1">
                          <span className="text-[7.5px] text-slate-500 uppercase">Relances</span>
                          {[1, 2, 3, 4, 5].map(r => {
                            const id = `act3_s${sbire.index}_r${r}`;
                            const checked = tickedBoxes[id];
                            return (
                              <button
                                key={id}
                                onClick={() => toggleTick(id)}
                                className={`w-3 h-3 border border-black flex items-center justify-center text-[8px] font-bold ${checked ? 'bg-black text-white' : 'bg-white'}`}
                              >
                                {checked ? '✕' : ''}
                              </button>
                            );
                          })}
                        </div>
                        <span className="font-mono font-bold text-[10px] bg-black text-white px-1.5 py-0.2 rounded-sm">
                          {sbire.powerThreshold}+
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-[8px] border-t border-dotted border-black/40 pt-1">
                        <div className="flex items-center gap-1 font-mono">
                          <span className="w-5 h-4 border border-black text-center flex items-center justify-center">⚔️</span>
                          <span>×</span>
                          <span className="w-5 h-4 border border-black text-center flex items-center justify-center">🎯</span>
                          <span>=</span>
                          <span className="w-8 h-4 border border-black text-center flex items-center justify-center font-bold"></span>
                        </div>
                        <div className="text-[7.5px] text-right text-slate-700 italic max-w-[150px] truncate" title={sbire.chest.effect}>
                          🎁 {sbire.chest.effect}
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Boss 3 */}
                  <div className="border-2 border-black p-1.5 text-[9px] bg-amber-500/10">
                    <div className="flex items-center justify-between font-bold mb-1">
                      <span className="text-[10px] uppercase font-cinzel text-red-950">👑 Boss 3 : {scenario.act3.boss.name}</span>
                      <span className="font-mono text-[10.5px] bg-black text-white px-2 py-0.5 rounded-sm">
                        {scenario.act3.boss.powerThreshold}+
                      </span>
                    </div>
                    <div className="text-[8px] italic border-l-2 border-black pl-1.5 my-1 text-slate-900">
                      <strong>Pouvoir spécial : </strong>{scenario.act3.boss.powerRule}
                    </div>
                    <div className="flex items-center justify-between text-[8px] border-t border-dotted border-black/40 pt-1">
                      <div className="flex items-center gap-1 font-mono">
                        <span className="w-5 h-4 border border-black text-center flex items-center justify-center">⚔️</span>
                        <span>×</span>
                        <span className="w-5 h-4 border border-black text-center flex items-center justify-center">🎯</span>
                        <span>=</span>
                        <span className="w-8 h-4 border border-black text-center flex items-center justify-center font-bold"></span>
                      </div>
                      <span className="text-[8px] text-slate-700">🏆 {scenario.act3.boss.chestEffect}</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN (Cols 8-12): Bourse d'Or + Marchands (Scribe, Apothicaire, Marie-Agnès) */}
            <div className="col-span-5 space-y-2.5">

              {/* MA BOURSE D'OR (100 coins in 4 blocks of 25) */}
              <div className="border-2 border-black p-2 bg-white">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="bg-black text-white text-[9px] font-bold tracking-widest px-2 py-0.5 uppercase">
                    Ma Bourse d'Or (100)
                  </span>
                  <span className="text-[8px] text-slate-600">Rond = Gagné · Barré = Dépensé</span>
                </div>

                <div className="grid grid-cols-4 gap-2 pt-1">
                  {[0, 1, 2, 3].map(block => (
                    <div key={`gold-block-${block}`} className="grid grid-cols-5 gap-1 p-1 border border-black/30 rounded bg-slate-50/50">
                      {Array.from({ length: 25 }).map((_, cIdx) => {
                        const coinNumber = block * 25 + cIdx + 1;
                        const id = `gold_coin_${coinNumber}`;
                        const state = tickedBoxes[id]; // true = marked
                        return (
                          <button
                            key={id}
                            onClick={() => toggleTick(id)}
                            className={`w-3.5 h-3.5 rounded-full border border-black text-[7px] flex items-center justify-center font-bold transition-all ${
                              state ? 'bg-amber-400 text-black border-amber-600' : 'bg-white hover:bg-slate-200'
                            }`}
                            title={`Pièce d'or #${coinNumber}`}
                          >
                            {state ? '●' : '○'}
                          </button>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>

              {/* SCRIBE SANS-VISAGE */}
              <div className="border border-black p-1.5 bg-white">
                <div className="flex items-center justify-between bg-black text-white px-2 py-0.5 mb-1.5">
                  <span className="text-[9px] font-bold tracking-widest uppercase">Scribe Sans-Visage (Améliore les Faces)</span>
                  <span className="text-[8px] text-amber-300">1 dé requis</span>
                </div>
                <div className="grid grid-cols-3 gap-1.5">
                  {scenario.scribeItems.map((item) => (
                    <div key={item.id} className="border border-black p-1 text-[8px] bg-slate-50 relative">
                      <div className="flex items-center justify-between font-bold mb-0.5">
                        <span className="w-3.5 h-3.5 border border-black rounded flex items-center justify-center bg-white font-mono text-[9px]">
                          {item.dieRequired}
                        </span>
                        <span className="text-amber-800 font-mono font-extrabold">{item.cost} 🪙</span>
                      </div>
                      <div className="font-semibold truncate text-[8px]">{item.name}</div>
                      <div className="text-[7.5px] text-slate-700">
                        Face {item.targetFace} : <strong className="text-black">+{item.bonusValue} {item.bonusType === 'force' ? '⚔️' : item.bonusType === 'precision' ? '🎯' : '🪙'}</strong>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* APOTHICAIRE */}
              <div className="border border-black p-1.5 bg-white">
                <div className="flex items-center justify-between bg-black text-white px-2 py-0.5 mb-1.5">
                  <span className="text-[9px] font-bold tracking-widest uppercase">Apothicaire (Améliore les Combinaisons)</span>
                  <span className="text-[8px] text-amber-300">1 dé requis</span>
                </div>
                <div className="grid grid-cols-3 gap-1.5">
                  {scenario.apothecaryItems.map((item) => (
                    <div key={item.id} className="border border-black p-1 text-[8px] bg-slate-50 relative">
                      <div className="flex items-center justify-between font-bold mb-0.5">
                        <span className="w-3.5 h-3.5 border border-black rounded flex items-center justify-center bg-white font-mono text-[9px]">
                          {item.dieRequired}
                        </span>
                        <span className="text-amber-800 font-mono font-extrabold">{item.cost} 🪙</span>
                      </div>
                      <div className="font-semibold truncate text-[8px]">{item.name}</div>
                      <div className="text-[7.5px] text-slate-700 capitalize">
                        {item.targetCombo.replace('_', ' ')} :{' '}
                        <strong className="text-black">
                          {item.bonusType === 'force_and_precision'
                            ? `+${item.bonusValue} ⚔️ & 🎯`
                            : `+${item.bonusValue} ${item.bonusType === 'force' ? '⚔️' : item.bonusType === 'precision' ? '🎯' : '🪙'}`}
                        </strong>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Fioles Spéciales Consommables */}
                {scenario.specialPotions && scenario.specialPotions.length > 0 && (
                  <div className="mt-1.5 pt-1 border-t border-dashed border-black/40">
                    <div className="flex items-center justify-between text-[7.5px] font-bold uppercase mb-0.5">
                      <span>🧪 Fioles Spéciales (Consommables)</span>
                      <span className="text-slate-600 font-normal">Cocher si achetée</span>
                    </div>
                    <div className="grid grid-cols-3 gap-1">
                      {scenario.specialPotions.map(potion => {
                        const id = `special_pot_${potion.id}`;
                        const isChecked = tickedBoxes[id];
                        return (
                          <div key={potion.id} className="border border-black p-0.5 text-[7px] bg-amber-50/40 relative">
                            <div className="flex items-center justify-between font-bold">
                              <span className="truncate">{potion.name}</span>
                              <span className="text-amber-900 font-mono">{potion.cost} 🪙</span>
                            </div>
                            <div className="text-[6.5px] text-slate-700 leading-tight" title={potion.effect}>
                              {potion.effect}
                            </div>
                            <div className="flex justify-end mt-0.5">
                              <button
                                onClick={() => toggleTick(id)}
                                className={`w-3 h-3 border border-black flex items-center justify-center text-[7px] font-bold ${isChecked ? 'bg-black text-white' : 'bg-white'}`}
                              >
                                {isChecked ? '✓' : ''}
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* MARIE-AGNÈS, MARCHANDE ITINÉRANTE (11 Equipments for sums 2 to 12) */}
              <div className="border border-black p-1.5 bg-white">
                <div className="flex items-center justify-between bg-black text-white px-2 py-0.5 mb-1.5">
                  <span className="text-[9px] font-bold tracking-widest uppercase">Marie-Agnès, la Marchande Itinérante</span>
                  <span className="text-[8px] text-amber-300">Somme de 2 dés</span>
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  {scenario.equipments.map((eq) => (
                    <div key={eq.id} className="border border-black p-1 text-[7.5px] bg-slate-50/70 relative">
                      <div className="flex items-center justify-between font-bold mb-0.5">
                        <div className="flex items-center gap-1">
                          <span className="w-4 h-3.5 border border-black rounded bg-white flex items-center justify-center font-mono font-bold text-[8.5px]">
                            {eq.requiredSum}
                          </span>
                          <span className="text-[8px]" title={eq.type}>
                            {eq.type === 'immediate' ? '⚡' : eq.type === 'combat' ? '⚔️' : eq.type === 'permanent' ? '♾️' : '🔼'}
                          </span>
                        </div>
                        <span className="text-amber-900 font-mono font-bold text-[8.5px]">{eq.cost} 🪙</span>
                      </div>
                      <div className="font-bold text-[8px] truncate">{eq.name}</div>
                      <div className="text-[7px] leading-tight text-slate-700 line-clamp-2" title={eq.effect}>
                        {eq.effect}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>

          {/* FOOTER BAR: Logo, Seed, Game Info, Mode Infini reminder */}
          <div className="mt-3 pt-2 border-t-2 border-black flex items-center justify-between text-[9px]">
            <div className="flex items-center gap-3">
              <span className="font-cinzel font-black text-sm tracking-wider uppercase border border-black px-2 py-0.5 bg-black text-white">
                ONE PAGE QUEST
              </span>
              <div className="flex items-center gap-2">
                <span className="text-slate-600">Code de partie :</span>
                <span className="font-mono font-bold tracking-wider text-[10px] bg-slate-100 border border-black/40 px-1.5 py-0.5 rounded">
                  {scenario.seed}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4 text-[9px] font-medium text-slate-700">
              <span>Niveau : <strong>{scenario.difficulty}</strong></span>
              <span>Matériel : <strong>1 Crayon & 5 Dés d6</strong></span>
              <span>Joueur : <strong>Solo</strong></span>
              <span>Durée : <strong>40-45'</strong></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
