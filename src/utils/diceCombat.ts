import { CombinationType, FaceValue, ComboValue } from '../types/game';

export interface ComboDetection {
  type: CombinationType;
  label: string;
  usedDiceIndices: number[];
  usedDiceValues: number[];
  description: string;
}

export function detectAllCombinations(dice: number[]): ComboDetection[] {
  const counts: Record<number, number> = {};
  dice.forEach(d => { counts[d] = (counts[d] || 0) + 1; });

  const result: ComboDetection[] = [];

  // Find counts
  const entries = Object.entries(counts).map(([v, c]) => ({ val: Number(v), count: c }));
  entries.sort((a, b) => b.count - a.count || b.val - a.val);

  // Quintuple (5 of a kind)
  const quintuple = entries.find(e => e.count >= 5);
  if (quintuple) {
    const indices = dice.map((v, i) => (v === quintuple.val ? i : -1)).filter(i => i !== -1).slice(0, 5);
    result.push({
      type: 'quintuple',
      label: 'Quintuple',
      usedDiceIndices: indices,
      usedDiceValues: indices.map(i => dice[i]),
      description: `5 dés de valeur ${quintuple.val}`
    });
  }

  // Carré (4 of a kind)
  const carre = entries.find(e => e.count >= 4);
  if (carre) {
    const indices = dice.map((v, i) => (v === carre.val ? i : -1)).filter(i => i !== -1).slice(0, 4);
    result.push({
      type: 'carre',
      label: 'Carré',
      usedDiceIndices: indices,
      usedDiceValues: indices.map(i => dice[i]),
      description: `4 dés de valeur ${carre.val}`
    });
  }

  // Full (3 of a kind + 2 of a kind)
  const three = entries.find(e => e.count >= 3);
  const two = entries.find(e => e.val !== three?.val && e.count >= 2);
  if (three && two) {
    const idx3 = dice.map((v, i) => (v === three.val ? i : -1)).filter(i => i !== -1).slice(0, 3);
    const idx2 = dice.map((v, i) => (v === two.val ? i : -1)).filter(i => i !== -1).slice(0, 2);
    const combined = [...idx3, ...idx2];
    result.push({
      type: 'full',
      label: 'Full',
      usedDiceIndices: combined,
      usedDiceValues: combined.map(i => dice[i]),
      description: `3 dés de ${three.val} et 2 dés de ${two.val}`
    });
  }

  // Parité: 5 dés tous pairs ou tous impairs avec 3 valeurs distinctes
  const allEven = dice.every(d => d % 2 === 0);
  const allOdd = dice.every(d => d % 2 === 1);
  const distinctValues = Object.keys(counts).length;
  if ((allEven || allOdd) && distinctValues >= 3 && dice.length === 5) {
    result.push({
      type: 'parite',
      label: 'Parité',
      usedDiceIndices: [0, 1, 2, 3, 4],
      usedDiceValues: [...dice],
      description: allEven ? '5 dés tous pairs (2, 4, 6)' : '5 dés tous impairs (1, 3, 5)'
    });
  }

  // Brelan (3 of a kind)
  const brelans = entries.filter(e => e.count >= 3);
  brelans.forEach(br => {
    const indices = dice.map((v, i) => (v === br.val ? i : -1)).filter(i => i !== -1).slice(0, 3);
    result.push({
      type: 'brelan',
      label: `Brelan (${br.val})`,
      usedDiceIndices: indices,
      usedDiceValues: indices.map(i => dice[i]),
      description: `3 dés de valeur ${br.val}`
    });
  });

  // Double Paire (2 paires différentes)
  const pairs = entries.filter(e => e.count >= 2);
  if (pairs.length >= 2) {
    const p1 = pairs[0];
    const p2 = pairs[1];
    const idx1 = dice.map((v, i) => (v === p1.val ? i : -1)).filter(i => i !== -1).slice(0, 2);
    const idx2 = dice.map((v, i) => (v === p2.val ? i : -1)).filter(i => i !== -1).slice(0, 2);
    const combined = [...idx1, ...idx2];
    result.push({
      type: 'double_paire',
      label: 'Double Paire',
      usedDiceIndices: combined,
      usedDiceValues: combined.map(i => dice[i]),
      description: `Paire de ${p1.val} et Paire de ${p2.val}`
    });
  }

  // Paire (2 of a kind) - offer each valid pair
  pairs.forEach(pair => {
    const indices = dice.map((v, i) => (v === pair.val ? i : -1)).filter(i => i !== -1).slice(0, 2);
    result.push({
      type: 'paire',
      label: `Paire (${pair.val})`,
      usedDiceIndices: indices,
      usedDiceValues: indices.map(i => dice[i]),
      description: `2 dés de valeur ${pair.val}`
    });
  });

  return result;
}

export function calculateCombatPower(
  usedDiceValues: number[],
  comboType: CombinationType,
  faceValues: Record<number, FaceValue>,
  comboValues: Record<CombinationType, ComboValue>,
  options?: {
    ignoreRounding?: boolean;
    bossRuleDisableEvens?: boolean;
    extraForce?: number;
    extraPrecision?: number;
    extraPower?: number;
    extraGold?: number;
    powerMultiplier?: number;
    allDiceValues?: number[];
    ownedEquipments?: { id: string; name: string }[];
  }
) {
  let diceForce = 0;
  let dicePrecision = 0;
  let diceGold = 0;

  usedDiceValues.forEach(val => {
    const f = faceValues[val] || { force: 0, precision: 0, gold: 0 };
    // Boss rule check: "Faces paires ne rapportent aucune Force"
    if (options?.bossRuleDisableEvens && val % 2 === 0) {
      // Force ignored
    } else {
      diceForce += Math.min(20, f.force);
    }
    dicePrecision += Math.min(20, f.precision);
    diceGold += Math.min(20, f.gold);
  });

  const c = comboValues[comboType] || { force: 0, precision: 0, gold: 0 };
  
  // Check equipment bonuses
  let eqForce = options?.extraForce || 0;
  let eqPrecision = options?.extraPrecision || 0;
  let eqGold = options?.extraGold || 0;
  let eqExtraPower = options?.extraPower || 0;
  let ignoreRounding = options?.ignoreRounding || false;

  const eqNames = (options?.ownedEquipments || []).map(e => e.name);

  // Cape du Sanglier Sauvage: +2 Force, +1 Précision
  if (eqNames.some(n => n.includes('Cape du Sanglier'))) {
    eqForce += 2;
    eqPrecision += 1;
  }
  // Heaume du Faucon: +2 Précision sur combo
  if (eqNames.some(n => n.includes('Heaume du Faucon'))) {
    eqPrecision += 2;
  }
  // Bouclier de la Création or Heaume du Mammouth: ignore rounding at 20
  if (eqNames.some(n => n.includes('Bouclier de la Création') || n.includes('Heaume du Mammouth'))) {
    ignoreRounding = true;
  }
  // Plastron du Tigre: +15 Puissance si tous les dés sont 1, 3 ou 5
  if (eqNames.some(n => n.includes('Plastron du Tigre'))) {
    if (usedDiceValues.every(v => v % 2 === 1)) {
      eqExtraPower += 15;
    }
  }
  // Ceinture de l'Ours: +4 Or si tous les dés de la combinaison sont pairs
  if (eqNames.some(n => n.includes('Ceinture de l’Ours') || n.includes('Ceinture de l\'Ours'))) {
    if (usedDiceValues.every(v => v % 2 === 0)) {
      eqGold += 4;
    }
  }
  // Unused dice bonuses (Bracelets du Vautour, Coiffe du Vautour)
  if (options?.allDiceValues && options.allDiceValues.length > usedDiceValues.length) {
    const unusedDiceCount = options.allDiceValues.length - usedDiceValues.length;
    if (eqNames.some(n => n.includes('Bracelets du Vautour'))) {
      eqGold += unusedDiceCount * 1;
    }
    if (eqNames.some(n => n.includes('Coiffe du Vautour'))) {
      // count 6s in unused
      const sixesOutside = options.allDiceValues.filter(v => v === 6).length - usedDiceValues.filter(v => v === 6).length;
      if (sixesOutside > 0) {
        eqGold += sixesOutside * 4;
      }
    }
  }

  let totalForce = diceForce + Math.min(20, c.force) + eqForce;
  const totalPrecision = dicePrecision + Math.min(20, c.precision) + eqPrecision;
  const totalGold = diceGold + Math.min(20, c.gold) + eqGold;

  // Rounding Rule: "À partir de 20, la Force est toujours arrondie à la dizaine inférieure avant multiplication (26 -> 20, 39 -> 30)."
  let effectiveForce = totalForce;
  if (!ignoreRounding && totalForce >= 20) {
    effectiveForce = Math.floor(totalForce / 10) * 10;
  }

  let finalPower = (effectiveForce * totalPrecision) + eqExtraPower;
  if (options?.powerMultiplier) {
    finalPower = Math.round(finalPower * options.powerMultiplier);
  }

  return {
    diceForce,
    dicePrecision,
    diceGold,
    comboForce: c.force,
    comboPrecision: c.precision,
    comboGold: c.gold,
    eqForce,
    eqPrecision,
    eqGold,
    eqExtraPower,
    totalForce,
    effectiveForce,
    totalPrecision,
    totalGold,
    finalPower
  };
}

// Web Audio API Sound Synthesizer
let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export const playSound = {
  rollDice: () => {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    for (let i = 0; i < 4; i++) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(120 + Math.random() * 80, now + i * 0.06);
      gain.gain.setValueAtTime(0.15, now + i * 0.06);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.06 + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + i * 0.06);
      osc.stop(now + i * 0.06 + 0.09);
    }
  },

  victory: () => {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const notes = [392, 523.25, 659.25, 783.99]; // G4, C5, E5, G5
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.1);
      gain.gain.setValueAtTime(0.2, now + idx * 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.1 + 0.25);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + idx * 0.1);
      osc.stop(now + idx * 0.1 + 0.3);
    });
  },

  critical: () => {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.12);
      gain.gain.setValueAtTime(0.25, now + idx * 0.12);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.12 + 0.35);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + idx * 0.12);
      osc.stop(now + idx * 0.12 + 0.4);
    });
  },

  coin: () => {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(987.77, now); // B5
    osc.frequency.exponentialRampToValueAtTime(1318.51, now + 0.12); // E6
    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.22);
  },

  defeat: () => {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const notes = [293.66, 261.63, 220.0];
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, now + idx * 0.15);
      gain.gain.setValueAtTime(0.12, now + idx * 0.15);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.15 + 0.2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + idx * 0.15);
      osc.stop(now + idx * 0.15 + 0.25);
    });
  },

  potionDrink: () => {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    // Glug sound: bubbling pitches rising
    [440, 554.37, 659.25, 880].forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);
      gain.gain.setValueAtTime(0.18, now + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.1);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 0.11);
    });
  },

  achievement: () => {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    [523.25, 659.25, 783.99, 1046.5, 1318.5].forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);
      gain.gain.setValueAtTime(0.22, now + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.35);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 0.4);
    });
  }
};

