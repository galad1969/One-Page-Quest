import React, { useState } from 'react';
import {
  AdventureScenario,
  CombinationType,
  FaceValue,
  ComboValue,
  Equipment,
  SpecialPotion,
  Achievement
} from '../types/game';
import { DEFAULT_FACE_VALUES, DEFAULT_COMBO_VALUES } from '../data/opqData';
import { detectAllCombinations, calculateCombatPower, playSound, ComboDetection } from '../utils/diceCombat';
import confetti from 'canvas-confetti';
import {
  Swords,
  Target,
  Coins,
  RotateCcw,
  Sparkles,
  ShoppingBag,
  Trophy,
  Skull,
  ShieldAlert,
  Flame,
  ArrowRight,
  Info,
  FlaskConical,
  Award,
  CheckCircle2,
  Lock,
  X
} from 'lucide-react';

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_victory',
    name: 'Premier Sang',
    description: 'Remporter votre tout premier combat contre un Sbire.',
    icon: '⚔️'
  },
  {
    id: 'critical_strike',
    name: 'Coup de Maître',
    description: 'Obtenir une Victoire Critique (au moins 2× le seuil de Puissance requis).',
    icon: '🎯'
  },
  {
    id: 'boss_slayer_1',
    name: 'Premier Boss Vaincu',
    description: 'Terrasser le redoutable Boss de fin de l’Acte 1.',
    icon: '👑'
  },
  {
    id: 'full_inventory',
    name: 'Inventaire Plein',
    description: 'Posséder au moins 3 équipements acquis chez Marie-Agnès.',
    icon: '🎒'
  },
  {
    id: 'alchemist_master',
    name: 'Maître Alchimiste',
    description: 'Acheter ou boire une Fiole Spéciale de l’Apothicaire en combat.',
    icon: '🧪'
  },
  {
    id: 'gold_hoarder',
    name: 'Plein aux As',
    description: 'Amasser au moins 50 Or dans votre Bourse d’aventurier.',
    icon: '🪙'
  },
  {
    id: 'quest_complete',
    name: 'Sauveur du Royaume',
    description: 'Triompher du Boss d’Acte 3 et vaincre la quête principale.',
    icon: '🏆'
  },
  {
    id: 'infinite_mode',
    name: 'Par-delà l’Infini',
    description: 'Braver le redoutable Mode Infini (seuils de puissance ×10).',
    icon: '🌌'
  }
];

interface InteractivePlayProps {
  scenario: AdventureScenario;
  onOpenRules: () => void;
  onOpenCompendium: () => void;
  onNewScenario: () => void;
}

type Phase = 'INITIAL_SETUP' | 'COMBAT' | 'COMBAT_RESULT' | 'MERCHANT' | 'GAME_OVER' | 'VICTORY_SCREEN';

export const InteractivePlay: React.FC<InteractivePlayProps> = ({
  scenario,
  onOpenRules,
  onOpenCompendium,
  onNewScenario
}) => {
  // Scenario state
  const [act, setAct] = useState<1 | 2 | 3>(1);
  const [combatIndex, setCombatIndex] = useState<number>(0); // 0,1,2 = sbires, 3 = boss
  const [infiniteMultiplier, setInfiniteMultiplier] = useState<number>(1);

  // Player sheet progression state
  const [gold, setGold] = useState<number>(scenario.hero.startingGold || 25);
  const [faceValues, setFaceValues] = useState<Record<number, FaceValue>>(
    JSON.parse(JSON.stringify(DEFAULT_FACE_VALUES))
  );
  const [comboValues, setComboValues] = useState<Record<CombinationType, ComboValue>>(
    JSON.parse(JSON.stringify(DEFAULT_COMBO_VALUES))
  );
  const [ownedEquipments, setOwnedEquipments] = useState<Equipment[]>([]);
  const [ownedPotions, setOwnedPotions] = useState<SpecialPotion[]>([]);
  const [activeCombatPotions, setActiveCombatPotions] = useState<SpecialPotion[]>([]);
  const [diePickerTarget, setDiePickerTarget] = useState<number | null>(null);

  // Achievements state
  const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('opq_achievements');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [recentUnlockedAchievement, setRecentUnlockedAchievement] = useState<Achievement | null>(null);
  const [showAchievementsModal, setShowAchievementsModal] = useState<boolean>(false);

  const unlockAchievement = (id: string) => {
    setUnlockedAchievements(prev => {
      if (prev.includes(id)) return prev;
      const next = [...prev, id];
      try {
        localStorage.setItem('opq_achievements', JSON.stringify(next));
      } catch {
        // ignore
      }
      const found = ACHIEVEMENTS.find(a => a.id === id);
      if (found) {
        setRecentUnlockedAchievement(found);
        playSound.achievement();
        setTimeout(() => {
          setRecentUnlockedAchievement(curr => (curr?.id === id ? null : curr));
        }, 4500);
      }
      return next;
    });
  };

  // Setup state
  const [phase, setPhase] = useState<Phase>('INITIAL_SETUP');
  const [setupDice, setSetupDice] = useState<number[]>([2, 3, 4, 5, 6]);
  const [setupBonusAllocated, setSetupBonusAllocated] = useState(false);

  // Combat loop state
  const [dice, setDice] = useState<number[]>([1, 2, 3, 4, 5]);
  const [lockedDice, setLockedDice] = useState<boolean[]>([false, false, false, false, false]);
  const [rerollsLeft, setRerollsLeft] = useState<number>(5);
  const [isRolling, setIsRolling] = useState<boolean>(false);
  const [selectedCombo, setSelectedCombo] = useState<ComboDetection | null>(null);
  const [lastCombatResult, setLastCombatResult] = useState<{
    power: number;
    threshold: number;
    outcome: 'defeat' | 'victory' | 'critical';
    goldEarned: number;
    chestLooted?: string;
  } | null>(null);

  // Merchant phase state
  const [merchantDice, setMerchantDice] = useState<number[]>([]);
  const [usedMerchantDice, setUsedMerchantDice] = useState<number[]>([]);
  const [merchantRerolls, setMerchantRerolls] = useState<number>(0);
  const [selectedPairDice, setSelectedPairDice] = useState<number[]>([]); // For Marie-Agnès 2-dice sum

  // Get current enemy
  const getCurrentEnemy = () => {
    const actData = act === 1 ? scenario.act1 : act === 2 ? scenario.act2 : scenario.act3;
    if (combatIndex < 3) {
      const sbire = actData.sbires[combatIndex];
      return {
        isBoss: false,
        name: `Sbire ${sbire.index}`,
        threshold: sbire.powerThreshold * infiniteMultiplier,
        chest: sbire.chest,
        powerRule: null
      };
    } else {
      const boss = actData.boss;
      return {
        isBoss: true,
        name: boss.name,
        threshold: boss.powerThreshold * infiniteMultiplier,
        chest: { name: 'Coffre de Boss', effect: boss.chestEffect },
        powerRule: boss.powerRule
      };
    }
  };

  const currentEnemy = getCurrentEnemy();

  // Initial dice setup
  const handleRollSetupDice = () => {
    playSound.rollDice();
    const newDice = Array.from({ length: 5 }, () => Math.floor(Math.random() * 6) + 1);
    setSetupDice(newDice);
  };

  const handleApplySetupBonus = () => {
    playSound.coin();
    // Rule: "Attribuez +1 Force à 3 dés, +1 Précision à 1 dé et +1 Or à 1 dé."
    const updated = JSON.parse(JSON.stringify(faceValues)) as Record<number, FaceValue>;
    // Assign +1 Force to first 3 dice
    [setupDice[0], setupDice[1], setupDice[2]].forEach(val => {
      updated[val].force += 1;
    });
    // Assign +1 Precision to 4th die
    updated[setupDice[3]].precision += 1;
    // Assign +1 Gold to 5th die
    updated[setupDice[4]].gold += 1;

    setFaceValues(updated);
    setSetupBonusAllocated(true);
    startCombat();
  };

  // Start a fresh combat
  const startCombat = () => {
    const initialDice = Array.from({ length: 5 }, () => Math.floor(Math.random() * 6) + 1);
    setDice(initialDice);
    setLockedDice([false, false, false, false, false]);
    setRerollsLeft(5);
    setActiveCombatPotions([]);
    setDiePickerTarget(null);
    const combos = detectAllCombinations(initialDice);
    setSelectedCombo(combos[0] || null);
    setPhase('COMBAT');
  };

  // Roll dice during combat
  const handleRollCombatDice = () => {
    if (rerollsLeft <= 0 || isRolling) return;
    setIsRolling(true);
    playSound.rollDice();

    setTimeout(() => {
      const nextDice = dice.map((d, i) => (lockedDice[i] ? d : Math.floor(Math.random() * 6) + 1));
      setDice(nextDice);
      setRerollsLeft(prev => prev - 1);
      setIsRolling(false);

      const detected = detectAllCombinations(nextDice);
      // Auto-select best combination
      setSelectedCombo(detected[0] || null);
    }, 280);
  };

  const toggleDieLock = (index: number) => {
    setLockedDice(prev => {
      const copy = [...prev];
      copy[index] = !copy[index];
      return copy;
    });
  };

  // Potion active buffs
  const hasDragonBlood = activeCombatPotions.some(p => p.type === 'dragon_blood');
  const hasCancelBoss = activeCombatPotions.some(p => p.type === 'cancel_boss');
  const hasMidas = activeCombatPotions.some(p => p.type === 'double_gold');
  const hasBerserk = activeCombatPotions.some(p => p.type === 'clutch_power');

  let potionForce = 0;
  let potionPrecision = 0;
  let potionPower = 0;
  let potionIgnoreRounding = false;

  if (hasDragonBlood) {
    potionForce += 5;
    potionIgnoreRounding = true;
  }
  if (hasMidas) {
    potionPrecision += 3;
  }
  if (hasBerserk) {
    potionPower += 50;
  }

  // Boss modifiers check
  const isSirenBoss = currentEnemy.isBoss && act === 2 && currentEnemy.name.includes('Sirène') && !hasCancelBoss;

  // Calculate power with currently selected combo and active potions
  const combatCalc = selectedCombo
    ? calculateCombatPower(
        selectedCombo.usedDiceValues,
        selectedCombo.type,
        faceValues,
        comboValues,
        {
          bossRuleDisableEvens: isSirenBoss,
          extraForce: potionForce,
          extraPrecision: potionPrecision,
          extraPower: potionPower,
          ignoreRounding: potionIgnoreRounding,
          allDiceValues: dice,
          ownedEquipments: ownedEquipments
        }
      )
    : null;

  // Handlers for consuming potions
  const handleDrinkPotion = (potion: SpecialPotion) => {
    playSound.potionDrink();
    unlockAchievement('alchemist_master');
    setOwnedPotions(prev => {
      const idx = prev.findIndex(p => p.id === potion.id);
      if (idx === -1) return prev;
      const copy = [...prev];
      copy.splice(idx, 1);
      return copy;
    });

    if (potion.type === 'extra_rerolls') {
      setRerollsLeft(prev => prev + (potion.value || 2));
    } else if (potion.type === 'change_die') {
      setDiePickerTarget(0); // open die value picker for die 0
    } else {
      setActiveCombatPotions(prev => [...prev, potion]);
    }
  };

  const handleApplyDieChange = (dieIndex: number, newValue: number) => {
    const nextDice = [...dice];
    nextDice[dieIndex] = newValue;
    setDice(nextDice);
    setDiePickerTarget(null);
    playSound.coin();
    const detected = detectAllCombinations(nextDice);
    setSelectedCombo(detected[0] || null);
  };

  const handleBuySpecialPotion = (potion: SpecialPotion) => {
    if (gold < potion.cost || ownedPotions.length >= 3) return;
    playSound.coin();
    setGold(prev => prev - potion.cost);
    setOwnedPotions(prev => [...prev, potion]);
    unlockAchievement('alchemist_master');
  };

  // Submit combat
  const handleSubmitCombat = () => {
    if (!combatCalc) return;

    const power = combatCalc.finalPower;
    const threshold = currentEnemy.threshold;

    let outcome: 'defeat' | 'victory' | 'critical' = 'defeat';
    let goldEarned = combatCalc.totalGold;
    if (hasMidas) {
      goldEarned *= 2;
    }
    let chestLooted: string | undefined = undefined;

    if (power >= threshold * 2) {
      outcome = 'critical';
      goldEarned += rerollsLeft * 3;
      chestLooted = currentEnemy.chest.effect;
      playSound.critical();
      confetti({ particleCount: 75, spread: 60, origin: { y: 0.6 } });
      unlockAchievement('critical_strike');
    } else if (power >= threshold) {
      outcome = 'victory';
      goldEarned += rerollsLeft * 3;
      playSound.victory();
      confetti({ particleCount: 40, spread: 45, origin: { y: 0.6 } });
    } else {
      outcome = 'defeat';
      playSound.defeat();
    }

    if (outcome !== 'defeat') {
      if (!currentEnemy.isBoss) {
        unlockAchievement('first_victory');
      } else if (act === 1) {
        unlockAchievement('boss_slayer_1');
      } else if (act === 3) {
        unlockAchievement('quest_complete');
      }
    }

    if (gold + goldEarned >= 50) {
      unlockAchievement('gold_hoarder');
    }

    setGold(prev => Math.min(100, prev + goldEarned));
    setLastCombatResult({
      power,
      threshold,
      outcome,
      goldEarned,
      chestLooted
    });

    // Check boss loss
    if (outcome === 'defeat' && currentEnemy.isBoss) {
      setPhase('GAME_OVER');
      return;
    }

    // Check final boss victory
    if (outcome !== 'defeat' && currentEnemy.isBoss && act === 3) {
      setPhase('VICTORY_SCREEN');
      return;
    }

    setPhase('COMBAT_RESULT');
  };

  // Move from Combat Result to Merchant
  const handleProceedToMerchant = () => {
    // Dice for merchants: 3 (defeat), 4 (victory), 5 (critical)
    const diceCount =
      lastCombatResult?.outcome === 'critical' ? 5 : lastCombatResult?.outcome === 'victory' ? 4 : 3;
    const rolled = Array.from({ length: diceCount }, () => Math.floor(Math.random() * 6) + 1);
    setMerchantDice(rolled);
    setUsedMerchantDice([]);
    setMerchantRerolls(rerollsLeft); // unused combat rerolls can be used here
    setSelectedPairDice([]);
    setPhase('MERCHANT');
  };

  // Merchant actions: Scribe item purchase
  const handleBuyScribeItem = (dieIndex: number, dieValue: number, item: typeof scenario.scribeItems[0]) => {
    if (gold < item.cost) return;
    playSound.coin();
    setGold(prev => prev - item.cost);
    setUsedMerchantDice(prev => [...prev, dieIndex]);

    // Apply upgrade to face
    setFaceValues(prev => {
      const copy = { ...prev };
      const f = { ...copy[item.targetFace] };
      if (item.bonusType === 'force') f.force = Math.min(20, f.force + item.bonusValue);
      if (item.bonusType === 'precision') f.precision = Math.min(20, f.precision + item.bonusValue);
      if (item.bonusType === 'gold') f.gold = Math.min(20, f.gold + item.bonusValue);
      copy[item.targetFace] = f;
      return copy;
    });
  };

  // Merchant actions: Apothecary item purchase
  const handleBuyApothecaryItem = (dieIndex: number, dieValue: number, item: typeof scenario.apothecaryItems[0]) => {
    if (gold < item.cost) return;
    playSound.coin();
    setGold(prev => prev - item.cost);
    setUsedMerchantDice(prev => [...prev, dieIndex]);

    // Apply upgrade to combo
    setComboValues(prev => {
      const copy = { ...prev };
      const c = { ...copy[item.targetCombo] };
      if (item.bonusType === 'force') c.force = Math.min(20, c.force + item.bonusValue);
      if (item.bonusType === 'precision') c.precision = Math.min(20, c.precision + item.bonusValue);
      if (item.bonusType === 'gold') c.gold = Math.min(20, c.gold + item.bonusValue);
      if (item.bonusType === 'force_and_precision') {
        c.force = Math.min(20, c.force + item.bonusValue);
        c.precision = Math.min(20, c.precision + item.bonusValue);
      }
      copy[item.targetCombo] = c;
      return copy;
    });
  };

  // Merchant actions: Marie-Agnès equipment purchase (2 dice sum)
  const toggleSelectPairDie = (dieIndex: number) => {
    if (selectedPairDice.includes(dieIndex)) {
      setSelectedPairDice(prev => prev.filter(i => i !== dieIndex));
    } else {
      if (selectedPairDice.length >= 2) {
        setSelectedPairDice([selectedPairDice[1], dieIndex]);
      } else {
        setSelectedPairDice(prev => [...prev, dieIndex]);
      }
    }
  };

  const handleBuyEquipment = (eq: Equipment) => {
    if (gold < eq.cost) return;
    if (selectedPairDice.length !== 2) return;
    const sum = merchantDice[selectedPairDice[0]] + merchantDice[selectedPairDice[1]];
    if (sum !== eq.requiredSum) return;

    playSound.coin();
    setGold(prev => prev - eq.cost);
    setOwnedEquipments(prev => {
      const next = [...prev, eq];
      if (next.length >= 3) {
        unlockAchievement('full_inventory');
      }
      return next;
    });
    setUsedMerchantDice(prev => [...prev, selectedPairDice[0], selectedPairDice[1]]);
    setSelectedPairDice([]);
  };

  // Move to next fight
  const handleProceedToNextCombat = () => {
    if (combatIndex < 3) {
      setCombatIndex(prev => prev + 1);
    } else {
      if (act < 3) {
        setAct(prev => ((prev + 1) as 1 | 2 | 3));
        setCombatIndex(0);
      }
    }
    startCombat();
  };

  // Infinite mode trigger
  const handleEnterInfiniteMode = () => {
    unlockAchievement('infinite_mode');
    setInfiniteMultiplier(prev => prev * 10);
    setAct(2); // Ignore Act 1 and restart from Act 2
    setCombatIndex(0);
    startCombat();
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Hero Status */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 sm:p-5 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl relative overflow-hidden">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-lg overflow-hidden border-2 border-amber-500/40 bg-slate-950 shrink-0">
            <img
              src="/src/assets/images/opq_mercenary_art_1793969941470.jpg"
              alt={scenario.hero.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-cinzel text-lg font-bold text-amber-200">{scenario.hero.name}</span>
              <span className="text-xs text-slate-400">· {scenario.hero.title}</span>
              {infiniteMultiplier > 1 && (
                <span className="text-xs px-2 py-0.5 rounded bg-red-950 text-red-300 border border-red-700 font-bold">
                  Mode Infini ×{infiniteMultiplier}
                </span>
              )}
            </div>
            <p className="text-xs text-slate-300 max-w-xl mt-0.5">{scenario.hero.description}</p>
          </div>
        </div>

        {/* Gold & Quick Meters */}
        <div className="flex items-center gap-4 sm:gap-6 bg-slate-950/70 border border-slate-800/80 px-4 py-2.5 rounded-lg shrink-0">
          <div className="flex items-center gap-2">
            <Coins className="w-5 h-5 text-amber-400" />
            <div>
              <span className="text-xs text-slate-400 block leading-tight">Bourse d'Or</span>
              <span className="font-mono text-lg font-extrabold text-amber-300 tabular-nums">
                {gold} <span className="text-xs text-slate-400">/ 100</span>
              </span>
            </div>
          </div>

          <div className="h-8 w-px bg-slate-800" />

          <div>
            <span className="text-xs text-slate-400 block leading-tight">Progression</span>
            <span className="font-semibold text-sm text-slate-200">
              Acte {act} · {combatIndex === 3 ? 'Boss' : `Sbire ${combatIndex + 1}`}
            </span>
          </div>

          <div className="h-8 w-px bg-slate-800" />

          {/* Hauts Faits Button */}
          <button
            onClick={() => setShowAchievementsModal(true)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-500/15 border border-amber-500/35 hover:bg-amber-500/25 text-amber-300 text-xs font-bold transition-all cursor-pointer shadow-sm group"
            title="Consulter vos Hauts Faits débloqués"
          >
            <Trophy className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
            <div className="text-left">
              <span className="text-[10px] text-amber-400/80 uppercase font-semibold block leading-tight">
                Hauts Faits
              </span>
              <span className="font-mono text-xs font-black text-amber-200">
                {unlockedAchievements.length} / {ACHIEVEMENTS.length}
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* PHASE 0: INITIAL SETUP */}
      {phase === 'INITIAL_SETUP' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-white space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h3 className="font-cinzel text-xl font-bold text-amber-300">Préparation de la Partie</h3>
            <p className="text-sm text-slate-300">
              Selon la règle officielle de One Page Quest : Lancez 5 dés. Attribuez{' '}
              <strong className="text-white">+1 Force à 3 dés</strong>,{' '}
              <strong className="text-white">+1 Précision à 1 dé</strong> et{' '}
              <strong className="text-white">+1 Or à 1 dé</strong> dans votre tableau de Valeurs de Faces.
            </p>
          </div>

          {/* Setup Dice */}
          <div className="flex justify-center gap-3">
            {setupDice.map((val, idx) => (
              <div
                key={idx}
                className="w-16 h-16 rounded-xl bg-slate-800 border-2 border-amber-500/30 flex flex-col items-center justify-center shadow-lg font-mono"
              >
                <span className="text-2xl font-black text-amber-400">{val}</span>
                <span className="text-[10px] text-slate-400 font-sans mt-0.5">
                  {idx < 3 ? '+1 ⚔️' : idx === 3 ? '+1 🎯' : '+1 🪙'}
                </span>
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-3">
            <button
              onClick={handleRollSetupDice}
              className="px-4 py-2 text-xs font-semibold rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
            >
              Relancer les dés de départ
            </button>
            <button
              onClick={handleApplySetupBonus}
              className="px-5 py-2 text-xs font-bold rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors shadow-lg shadow-amber-500/20"
            >
              Appliquer les bonus et Commencer la Quête
            </button>
          </div>
        </div>
      )}

      {/* PHASE 1: ACTIVE COMBAT */}
      {phase === 'COMBAT' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Left / Center: The Combat Arena (8 cols) */}
          <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-xl p-5 sm:p-6 text-white space-y-6">

            {/* Enemy Header */}
            <div className="border border-slate-800 bg-slate-950/60 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs uppercase tracking-wider text-slate-400">
                    Acte {act} · {currentEnemy.isBoss ? '👑 Boss Final d’Acte' : 'Sbire'}
                  </span>
                  {currentEnemy.isBoss && (
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 bg-red-950 border border-red-800 text-red-300 rounded">
                      Combat décisif
                    </span>
                  )}
                </div>
                <h3 className="font-cinzel text-xl font-bold text-white mt-0.5">{currentEnemy.name}</h3>
                {currentEnemy.powerRule && (
                  <p className="text-xs text-amber-300/90 mt-1 flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/20 p-2 rounded">
                    <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
                    <span><strong>Pouvoir du Boss :</strong> {currentEnemy.powerRule}</span>
                  </p>
                )}
              </div>

              {/* Threshold Target */}
              <div className="text-right">
                <span className="text-xs text-slate-400 block">Seuil de Puissance</span>
                <div className="flex items-baseline gap-1.5 justify-end">
                  <span className="font-mono text-2xl font-black text-amber-400 tabular-nums">
                    {currentEnemy.threshold}+
                  </span>
                  <span className="text-xs text-slate-400">
                    (Critique: <strong className="text-amber-300">{currentEnemy.threshold * 2}+</strong>)
                  </span>
                </div>
              </div>
            </div>

            {/* Active Potions Buffs Banner */}
            {activeCombatPotions.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 p-2.5 bg-amber-500/15 border border-amber-500/40 rounded-xl text-xs text-amber-200">
                <span className="font-bold flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Élixirs Actifs :
                </span>
                {activeCombatPotions.map((p, idx) => (
                  <span key={idx} className="bg-amber-500/20 border border-amber-500/30 px-2 py-0.5 rounded text-[11px] font-semibold">
                    {p.name} ({p.effect})
                  </span>
                ))}
              </div>
            )}

            {/* Ceinture d'Alchimiste (Consommables en poche) */}
            {ownedPotions.length > 0 && (
              <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs text-amber-300 font-bold">
                  <FlaskConical className="w-4 h-4 text-amber-400" />
                  <span>Ceinture d'Élixirs ({ownedPotions.length}/3) :</span>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {ownedPotions.map(potion => (
                    <button
                      key={potion.id}
                      onClick={() => handleDrinkPotion(potion)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/15 border border-amber-500/40 hover:bg-amber-500/30 text-amber-200 text-xs font-semibold transition-all cursor-pointer shadow-sm"
                      title={potion.description}
                    >
                      <span>🧪 {potion.name}</span>
                      <span className="text-[10px] text-amber-300/80">({potion.effect})</span>
                      <span className="ml-1 text-[10px] font-bold uppercase bg-amber-500 text-slate-950 px-1 rounded">Boire</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Die Picker if Fiole de Vue Astrale is active */}
            {diePickerTarget !== null && (
              <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl space-y-2">
                <div className="flex items-center justify-between text-xs text-amber-300 font-bold">
                  <span>Fiole de Vue Astrale : Choisissez le dé à modifier et sa nouvelle valeur</span>
                  <button onClick={() => setDiePickerTarget(null)} className="text-slate-400 hover:text-white cursor-pointer">✕</button>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs text-slate-300">Sélectionnez le dé :</span>
                  <div className="flex gap-1.5">
                    {[0, 1, 2, 3, 4].map(dIdx => (
                      <button
                        key={dIdx}
                        onClick={() => setDiePickerTarget(dIdx)}
                        className={`px-2 py-1 rounded text-xs font-bold border transition-colors cursor-pointer ${
                          diePickerTarget === dIdx ? 'bg-amber-500 text-slate-950 border-amber-400' : 'bg-slate-800 text-white border-slate-700'
                        }`}
                      >
                        Dé #{dIdx + 1} ({dice[dIdx]})
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs text-slate-300">Nouvelle valeur :</span>
                  <div className="flex gap-1.5">
                    {[1, 2, 3, 4, 5, 6].map(v => (
                      <button
                        key={v}
                        onClick={() => handleApplyDieChange(diePickerTarget, v)}
                        className="w-7 h-7 rounded bg-slate-800 border border-amber-500/40 text-amber-300 font-bold text-sm hover:bg-amber-500 hover:text-slate-950 transition-colors cursor-pointer"
                      >
                        {v}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* The 5 Dice Table */}
            <div className="bg-slate-950 border border-slate-800/80 rounded-xl p-6 text-center space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Cliquez sur un dé pour le verrouiller (Garder)</span>
                <div className="flex items-center gap-1.5">
                  <span>Relances restantes :</span>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map(box => (
                      <span
                        key={box}
                        className={`w-4 h-4 rounded text-[10px] font-bold flex items-center justify-center border ${
                          box <= rerollsLeft
                            ? 'bg-amber-500 text-slate-950 border-amber-400'
                            : 'bg-slate-800 text-slate-500 border-slate-700'
                        }`}
                      >
                        {box <= rerollsLeft ? '✓' : '✕'}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* 5 Dice */}
              <div className="flex justify-center gap-3 sm:gap-4 py-2">
                {dice.map((value, idx) => {
                  const isLocked = lockedDice[idx];
                  const isInSelectedCombo = selectedCombo?.usedDiceIndices.includes(idx);
                  return (
                    <button
                      key={idx}
                      onClick={() => toggleDieLock(idx)}
                      disabled={isRolling}
                      className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex flex-col items-center justify-center transition-all duration-200 select-none cursor-pointer transform active:scale-95 ${
                        isLocked
                          ? 'bg-amber-500/20 border-2 border-amber-400 text-amber-200 shadow-lg shadow-amber-500/10 -translate-y-1'
                          : 'bg-slate-800/90 border-2 border-slate-700 text-slate-200 hover:border-slate-500'
                      } ${isInSelectedCombo ? 'ring-2 ring-emerald-500/50' : ''}`}
                    >
                      <span className="font-mono text-3xl sm:text-4xl font-black">{value}</span>
                      <span className="text-[10px] font-semibold uppercase tracking-wider mt-0.5">
                        {isLocked ? 'Gardé' : 'À relancer'}
                      </span>
                      {isInSelectedCombo && (
                        <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-emerald-500 text-slate-950 rounded-full text-[9px] font-bold flex items-center justify-center">
                          ✓
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Roll controls */}
              <div className="flex justify-center gap-3 pt-2">
                <button
                  onClick={handleRollCombatDice}
                  disabled={rerollsLeft <= 0 || isRolling}
                  className={`flex items-center gap-2 px-6 py-2.5 text-sm font-bold rounded-xl transition-all shadow-lg ${
                    rerollsLeft > 0 && !isRolling
                      ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/20 cursor-pointer'
                      : 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
                  }`}
                >
                  <RotateCcw className={`w-4 h-4 ${isRolling ? 'animate-spin' : ''}`} />
                  <span>Relancer les dés ({rerollsLeft} restants)</span>
                </button>
              </div>
            </div>

            {/* Combinations Selector */}
            <div className="space-y-3">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                Choisissez votre Combinaison active
              </span>

              {(() => {
                const detectedCombos = detectAllCombinations(dice);
                if (detectedCombos.length === 0) {
                  return (
                    <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-lg text-slate-400 text-xs text-center">
                      Aucune combinaison valide détectée. Utilisez une relance pour former une Paire, Double Paire, Brelan, Parité, Full, Carré ou Quintuple.
                    </div>
                  );
                }

                return (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {detectedCombos.map(combo => {
                      const isSelected = selectedCombo?.type === combo.type && selectedCombo?.label === combo.label;
                      const calc = calculateCombatPower(
                        combo.usedDiceValues,
                        combo.type,
                        faceValues,
                        comboValues,
                        { bossRuleDisableEvens: isSirenBoss }
                      );
                      const isWinning = calc.finalPower >= currentEnemy.threshold;

                      return (
                        <button
                          key={`${combo.type}-${combo.description}`}
                          onClick={() => setSelectedCombo(combo)}
                          className={`p-3 rounded-lg border text-left transition-all flex items-center justify-between cursor-pointer ${
                            isSelected
                              ? 'bg-amber-500/15 border-amber-500 text-white'
                              : 'bg-slate-950/40 border-slate-800 text-slate-300 hover:border-slate-700'
                          }`}
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-sm text-amber-200">{combo.label}</span>
                              <span className="text-[11px] text-slate-400">({combo.description})</span>
                            </div>
                            <span className="text-xs text-slate-400 block mt-0.5">
                              {calc.effectiveForce} ⚔️ × {calc.totalPrecision} 🎯
                            </span>
                          </div>

                          <div className="text-right">
                            <span className={`font-mono text-base font-bold ${isWinning ? 'text-emerald-400' : 'text-slate-400'}`}>
                              = {calc.finalPower}
                            </span>
                            <span className="text-[10px] block text-slate-400">
                              {isWinning ? (calc.finalPower >= currentEnemy.threshold * 2 ? 'Critique' : 'Victoire') : 'Défaite'}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                );
              })()}
            </div>

            {/* Combat Calculation Breakdown & Submit */}
            {combatCalc && (
              <div className="border border-slate-800 bg-slate-950/80 rounded-xl p-4 sm:p-5 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-xs text-slate-400 block">Formule officielle One Page Quest</span>
                    <span className="text-xs text-slate-300">
                      Puissance = Force Totale (arrondie à la dizaine inf. dès 20) × Précision Totale
                    </span>
                  </div>

                  <div className="flex items-center gap-3 font-mono text-lg font-bold">
                    <span className="text-amber-300" title="Force effective">
                      {combatCalc.effectiveForce} ⚔️
                    </span>
                    <span className="text-slate-500">×</span>
                    <span className="text-amber-300" title="Précision totale">
                      {combatCalc.totalPrecision} 🎯
                    </span>
                    <span className="text-slate-500">=</span>
                    <span
                      className={`text-2xl font-black ${
                        combatCalc.finalPower >= currentEnemy.threshold * 2
                          ? 'text-amber-400'
                          : combatCalc.finalPower >= currentEnemy.threshold
                          ? 'text-emerald-400'
                          : 'text-red-400'
                      }`}
                    >
                      {combatCalc.finalPower}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-xs text-slate-400">
                    {combatCalc.finalPower >= currentEnemy.threshold * 2 ? (
                      <span className="text-amber-300 font-semibold flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-amber-400" />
                        Victoire Critique ! (+{rerollsLeft * 3} Or des relances + Contenu du Coffre)
                      </span>
                    ) : combatCalc.finalPower >= currentEnemy.threshold ? (
                      <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                        <Trophy className="w-4 h-4 text-emerald-400" />
                        Victoire ! (+{rerollsLeft * 3} Or des relances inutilisées)
                      </span>
                    ) : (
                      <span className="text-rose-400 font-semibold flex items-center gap-1.5">
                        <Skull className="w-4 h-4 text-rose-400" />
                        {currentEnemy.isBoss ? 'Défaite Fatale (Fin de partie)' : 'Défaite (Gain de l’Or des dés, passage au suivant)'}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={handleSubmitCombat}
                    className="px-6 py-2.5 text-xs font-bold rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors shadow-lg shadow-amber-500/20 cursor-pointer"
                  >
                    Valider le Combat
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right: Character Sheet Quick-Viewer (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            {/* Sheet Tabs / Face Values */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-white space-y-3">
              <h4 className="font-cinzel text-sm font-bold text-amber-300 uppercase tracking-wider">
                Vos Valeurs de Faces
              </h4>
              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3, 4, 5, 6].map(die => {
                  const val = faceValues[die];
                  return (
                    <div key={die} className="p-2 rounded bg-slate-950/60 border border-slate-800 text-center">
                      <span className="font-mono text-xs font-bold text-amber-400 block mb-1">Face {die}</span>
                      <div className="text-[11px] text-slate-300 space-y-0.5">
                        <div>⚔️ {val.force}</div>
                        <div>🎯 {val.precision}</div>
                        <div>🪙 {val.gold}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Combos Values */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-white space-y-2">
              <h4 className="font-cinzel text-sm font-bold text-amber-300 uppercase tracking-wider">
                Vos Combinaisons
              </h4>
              <div className="space-y-1 text-xs">
                {Object.entries(comboValues).map(([key, val]) => (
                  <div key={key} className="flex items-center justify-between p-1.5 rounded bg-slate-950/40 border border-slate-800/80">
                    <span className="capitalize text-slate-300">{key.replace('_', ' ')}</span>
                    <span className="font-mono text-slate-400">
                      {val.force} ⚔️ · {val.precision} 🎯 · {val.gold} 🪙
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Owned Equipments */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-white space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-cinzel text-sm font-bold text-amber-300 uppercase tracking-wider">
                  Équipements ({ownedEquipments.length})
                </h4>
              </div>

              {ownedEquipments.length === 0 ? (
                <p className="text-xs text-slate-500 italic p-3 text-center border border-dashed border-slate-800 rounded">
                  Aucun équipement acquis. Visitez Marie-Agnès après un combat.
                </p>
              ) : (
                <div className="space-y-1.5">
                  {ownedEquipments.map((eq, idx) => (
                    <div key={idx} className="p-2 rounded bg-slate-950/50 border border-slate-800 text-xs">
                      <div className="font-bold text-amber-200">{eq.name}</div>
                      <div className="text-[11px] text-slate-400">{eq.effect}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

        </div>
      )}

      {/* PHASE 2: COMBAT RESULT SUMMARY */}
      {phase === 'COMBAT_RESULT' && lastCombatResult && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 sm:p-8 text-white max-w-xl mx-auto space-y-6 text-center shadow-2xl">
          <div className="space-y-2">
            <span className="text-xs uppercase font-bold text-slate-400">Résultat du Combat</span>
            <h3
              className={`font-cinzel text-2xl font-black ${
                lastCombatResult.outcome === 'critical'
                  ? 'text-amber-400'
                  : lastCombatResult.outcome === 'victory'
                  ? 'text-emerald-400'
                  : 'text-slate-300'
              }`}
            >
              {lastCombatResult.outcome === 'critical'
                ? 'Victoire Critique !'
                : lastCombatResult.outcome === 'victory'
                ? 'Victoire !'
                : 'Défaite honorable'}
            </h3>
            <p className="text-sm text-slate-300">
              Votre Puissance a atteint <strong className="text-white font-mono">{lastCombatResult.power}</strong> face au seuil de{' '}
              <strong className="text-white font-mono">{lastCombatResult.threshold}</strong>.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 p-4 bg-slate-950 rounded-xl border border-slate-800 text-left">
            <div>
              <span className="text-xs text-slate-400 block">Or total gagné</span>
              <span className="font-mono text-xl font-bold text-amber-300">+{lastCombatResult.goldEarned} 🪙</span>
            </div>

            <div>
              <span className="text-xs text-slate-400 block">Dés chez les Marchands</span>
              <span className="font-mono text-xl font-bold text-white">
                {lastCombatResult.outcome === 'critical' ? '5 Dés' : lastCombatResult.outcome === 'victory' ? '4 Dés' : '3 Dés'}
              </span>
            </div>
          </div>

          {lastCombatResult.chestLooted && (
            <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl text-left space-y-1">
              <span className="text-xs uppercase font-bold text-amber-400 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-400" /> Contenu du Coffre débloqué !
              </span>
              <p className="text-xs text-slate-200">{lastCombatResult.chestLooted}</p>
            </div>
          )}

          <button
            onClick={handleProceedToMerchant}
            className="w-full py-3 text-sm font-bold rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Visiter les Marchands (Scribe, Apothicaire & Marie-Agnès)</span>
          </button>
        </div>
      )}

      {/* PHASE 3: MERCHANT SHOP PHASE */}
      {phase === 'MERCHANT' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 sm:p-6 text-white space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h3 className="font-cinzel text-xl font-bold text-amber-300">Visite des Marchands</h3>
              <p className="text-xs text-slate-400">
                Placez 1 dé chez le Scribe ou l'Apothicaire, ou associez 2 dés chez Marie-Agnès pour acheter de l'équipement.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <span className="text-xs text-slate-400 block">Bourse</span>
                <span className="font-mono text-lg font-bold text-amber-300">{gold} 🪙</span>
              </div>
              <button
                onClick={handleProceedToNextCombat}
                className="px-5 py-2 text-xs font-bold rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors shadow-lg shadow-amber-500/20 flex items-center gap-1.5"
              >
                <span>Terminer les Achats</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Available Merchant Dice */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
              Vos dés disponibles pour les marchands :
            </span>
            <div className="flex flex-wrap gap-3">
              {merchantDice.map((val, idx) => {
                const isUsed = usedMerchantDice.includes(idx);
                const isPairSelected = selectedPairDice.includes(idx);
                return (
                  <button
                    key={idx}
                    disabled={isUsed}
                    onClick={() => toggleSelectPairDie(idx)}
                    className={`w-14 h-14 rounded-xl flex flex-col items-center justify-center font-mono border-2 transition-all ${
                      isUsed
                        ? 'opacity-30 bg-slate-900 border-slate-800 cursor-not-allowed'
                        : isPairSelected
                        ? 'bg-amber-500/20 border-amber-400 text-amber-300 scale-105'
                        : 'bg-slate-800 border-slate-700 text-white hover:border-slate-500'
                    }`}
                  >
                    <span className="text-2xl font-black">{val}</span>
                    <span className="text-[9px] uppercase font-sans">
                      {isUsed ? 'Utilisé' : isPairSelected ? 'Sélectionné' : 'Dispo'}
                    </span>
                  </button>
                );
              })}
            </div>
            {selectedPairDice.length === 2 && (
              <div className="text-xs text-amber-300">
                Somme sélectionnée pour Marie-Agnès :{' '}
                <strong className="font-mono text-sm">
                  {merchantDice[selectedPairDice[0]] + merchantDice[selectedPairDice[1]]}
                </strong>
              </div>
            )}
          </div>

          {/* The 3 Shops */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* 1. SCRIBE SANS-VISAGE */}
            <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <div>
                  <h4 className="font-cinzel text-sm font-bold text-amber-200">Scribe Sans-Visage</h4>
                  <span className="text-[10px] text-slate-400">Améliore les Faces · 1 dé</span>
                </div>
              </div>

              <div className="space-y-2">
                {scenario.scribeItems.map((item) => {
                  const matchingDieIndex = merchantDice.findIndex(
                    (d, i) => d === item.dieRequired && !usedMerchantDice.includes(i)
                  );
                  const canBuy = matchingDieIndex !== -1 && gold >= item.cost;

                  return (
                    <div
                      key={item.id}
                      className="p-2.5 rounded-lg border border-slate-800 bg-slate-900/60 flex items-center justify-between gap-2"
                    >
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="w-5 h-5 rounded bg-slate-800 border border-slate-700 text-amber-300 font-mono text-xs font-bold flex items-center justify-center">
                            {item.dieRequired}
                          </span>
                          <span className="text-xs font-semibold text-white">{item.name}</span>
                        </div>
                        <span className="text-[11px] text-slate-400 block mt-0.5">
                          Face {item.targetFace} : +{item.bonusValue}{' '}
                          {item.bonusType === 'force' ? '⚔️' : item.bonusType === 'precision' ? '🎯' : '🪙'}
                        </span>
                      </div>

                      <button
                        disabled={!canBuy}
                        onClick={() => handleBuyScribeItem(matchingDieIndex, item.dieRequired, item)}
                        className={`px-2.5 py-1 text-xs font-bold rounded transition-colors ${
                          canBuy
                            ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 cursor-pointer'
                            : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                        }`}
                      >
                        {item.cost} 🪙
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 2. APOTHICAIRE */}
            <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <div>
                  <h4 className="font-cinzel text-sm font-bold text-amber-200">Apothicaire</h4>
                  <span className="text-[10px] text-slate-400">Améliore les Combos · 1 dé</span>
                </div>
              </div>

              <div className="space-y-2">
                {scenario.apothecaryItems.map((item) => {
                  const matchingDieIndex = merchantDice.findIndex(
                    (d, i) => d === item.dieRequired && !usedMerchantDice.includes(i)
                  );
                  const canBuy = matchingDieIndex !== -1 && gold >= item.cost;

                  return (
                    <div
                      key={item.id}
                      className="p-2.5 rounded-lg border border-slate-800 bg-slate-900/60 flex items-center justify-between gap-2"
                    >
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="w-5 h-5 rounded bg-slate-800 border border-slate-700 text-amber-300 font-mono text-xs font-bold flex items-center justify-center">
                            {item.dieRequired}
                          </span>
                          <span className="text-xs font-semibold text-white">{item.name}</span>
                        </div>
                        <span className="text-[11px] text-slate-300 block mt-0.5 capitalize">
                          {item.targetCombo.replace('_', ' ')} :{' '}
                          <strong className="text-amber-300 font-semibold">
                            +{item.bonusValue}{' '}
                            {item.bonusType === 'force'
                              ? '⚔️ Force'
                              : item.bonusType === 'precision'
                              ? '🎯 Précision'
                              : item.bonusType === 'force_and_precision'
                              ? '⚔️ Force & 🎯 Précision'
                              : '🪙 Or'}
                          </strong>
                        </span>
                        {item.description && (
                          <span className="text-[10px] text-slate-400 block leading-tight mt-0.5 italic">
                            {item.description}
                          </span>
                        )}
                      </div>

                      <button
                        disabled={!canBuy}
                        onClick={() => handleBuyApothecaryItem(matchingDieIndex, item.dieRequired, item)}
                        className={`px-2.5 py-1 text-xs font-bold rounded transition-colors ${
                          canBuy
                            ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 cursor-pointer'
                            : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                        }`}
                      >
                        {item.cost} 🪙
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* ÉTAGÈRE DES FIOLES SPÉCIALES */}
              {scenario.specialPotions && scenario.specialPotions.length > 0 && (
                <div className="pt-3 border-t border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1">
                      <FlaskConical className="w-3.5 h-3.5" />
                      <span>Fioles Spéciales Consommables</span>
                    </span>
                    <span className="text-[9px] text-slate-400">Ceinture: {ownedPotions.length}/3</span>
                  </div>

                  <div className="space-y-1.5">
                    {scenario.specialPotions.map(potion => {
                      const isAlreadyOwned = ownedPotions.some(p => p.id === potion.id);
                      const canBuy = gold >= potion.cost && ownedPotions.length < 3 && !isAlreadyOwned;
                      return (
                        <div
                          key={potion.id}
                          className="p-2 rounded border border-amber-500/25 bg-amber-500/5 flex items-center justify-between gap-2"
                        >
                          <div className="min-w-0">
                            <span className="text-xs font-bold text-amber-200 block truncate">🧪 {potion.name}</span>
                            <span className="text-[10px] text-slate-300 block line-clamp-1">{potion.effect}</span>
                          </div>
                          <button
                            disabled={!canBuy}
                            onClick={() => handleBuySpecialPotion(potion)}
                            className={`px-2 py-1 text-xs font-bold rounded transition-colors whitespace-nowrap shrink-0 ${
                              isAlreadyOwned
                                ? 'bg-slate-800 text-emerald-400 cursor-default'
                                : canBuy
                                ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 cursor-pointer'
                                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                            }`}
                          >
                            {isAlreadyOwned ? 'En poche ✓' : `${potion.cost} 🪙`}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* 3. MARIE-AGNÈS, MARCHANDE ITINÉRANTE */}
            <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <div>
                  <h4 className="font-cinzel text-sm font-bold text-amber-200">Marie-Agnès</h4>
                  <span className="text-[10px] text-slate-400">Équipements · Somme de 2 dés</span>
                </div>
              </div>

              <div className="space-y-2 max-h-[460px] overflow-y-auto pr-1">
                {scenario.equipments.map((eq) => {
                  const isOwned = ownedEquipments.some(e => e.id === eq.id);
                  const selectedSum =
                    selectedPairDice.length === 2
                      ? merchantDice[selectedPairDice[0]] + merchantDice[selectedPairDice[1]]
                      : null;
                  const canBuy = !isOwned && selectedSum === eq.requiredSum && gold >= eq.cost;

                  return (
                    <div
                      key={eq.id}
                      className={`p-2.5 rounded-lg border transition-all ${
                        isOwned
                          ? 'bg-emerald-950/20 border-emerald-900/40 opacity-70'
                          : selectedSum === eq.requiredSum
                          ? 'bg-amber-500/10 border-amber-500/40'
                          : 'bg-slate-900/60 border-slate-800'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <span className="w-5 h-5 rounded bg-slate-800 border border-slate-700 text-amber-300 font-mono text-xs font-bold flex items-center justify-center">
                            {eq.requiredSum}
                          </span>
                          <span className="text-xs font-semibold text-white">{eq.name}</span>
                        </div>
                        <span className="font-mono text-xs text-amber-400 font-bold">{eq.cost} 🪙</span>
                      </div>

                      <p className="text-[11px] text-slate-300 mt-1">{eq.effect}</p>

                      <div className="mt-2 flex justify-end">
                        {isOwned ? (
                          <span className="text-[10px] font-bold text-emerald-400">Possédé ✓</span>
                        ) : (
                          <button
                            disabled={!canBuy}
                            onClick={() => handleBuyEquipment(eq)}
                            className={`px-3 py-1 text-xs font-bold rounded transition-colors ${
                              canBuy
                                ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 cursor-pointer'
                                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                            }`}
                          >
                            Acheter ({eq.cost} 🪙)
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* PHASE 4: GAME OVER (BOSS DEFEAT) */}
      {phase === 'GAME_OVER' && (
        <div className="bg-slate-900 border border-red-900/50 rounded-xl p-8 text-white max-w-xl mx-auto space-y-6 text-center shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-red-950/80 border border-red-800 flex items-center justify-center mx-auto text-red-400">
            <Skull className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h3 className="font-cinzel text-2xl font-black text-red-400">Fin de Partie Immédiate</h3>
            <p className="text-sm text-slate-300">
              Selon la règle officielle de One Page Quest : La partie se termine immédiatement si vous perdez contre un Boss.
            </p>
            <p className="text-xs text-amber-300 bg-amber-500/10 border border-amber-500/20 p-3 rounded-lg">
              « En cas de défaite, si vous souhaitez retenter votre chance, conservez un équipement de votre choix pour votre prochaine partie avec le même héros et la même feuille d'aventure. »
            </p>
          </div>

          <div className="flex justify-center gap-3">
            <button
              onClick={() => {
                // Keep 1 equipment if any
                setOwnedEquipments(prev => prev.slice(0, 1));
                setAct(1);
                setCombatIndex(0);
                setGold(scenario.hero.startingGold || 25);
                setFaceValues(JSON.parse(JSON.stringify(DEFAULT_FACE_VALUES)));
                setComboValues(JSON.parse(JSON.stringify(DEFAULT_COMBO_VALUES)));
                startCombat();
              }}
              className="px-6 py-2.5 text-xs font-bold rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors shadow-lg"
            >
              Recommencer avec 1 équipement conservé
            </button>
          </div>
        </div>
      )}

      {/* PHASE 5: VICTORY SCREEN (ACT 3 BOSS BEATEN) */}
      {phase === 'VICTORY_SCREEN' && (
        <div className="bg-slate-900 border border-amber-500/40 rounded-xl p-8 text-white max-w-2xl mx-auto space-y-6 text-center shadow-2xl">
          <div className="w-20 h-20 rounded-full bg-amber-500/10 border-2 border-amber-400 flex items-center justify-center mx-auto text-amber-400">
            <Trophy className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="text-xs uppercase font-bold text-amber-400 tracking-widest">Victoire Totale</span>
            <h3 className="font-cinzel text-3xl font-black text-amber-200">
              Vous avez terrassé les 3 Boss de l'Aventure !
            </h3>
            <p className="text-sm text-slate-300">
              Félicitations Aventurier ! Vous avez vaincu l'ultime Boss de l'Acte 3 avec le Héros {scenario.hero.name}.
            </p>
          </div>

          {/* Mode Infini Option */}
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-left space-y-2">
            <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
              <Flame className="w-4 h-4 text-red-400" />
              <span>Règle Spéciale : Débloquer le Mode Infini</span>
            </div>
            <p className="text-xs text-slate-400">
              « Après avoir vaincu le 3e Boss, vous pouvez poursuivre votre aventure en gommant les résultats des combats précédents. Ignorez alors l'Acte 1 et reprenez à partir de l'Acte 2, en multipliant les seuils de Puissance par 10. »
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={handleEnterInfiniteMode}
              className="px-6 py-2.5 text-xs font-bold rounded-lg bg-red-600 hover:bg-red-500 text-white transition-colors shadow-lg shadow-red-600/30 flex items-center gap-2"
            >
              <Flame className="w-4 h-4" />
              <span>Entrer dans le Mode Infini (Seuils ×10)</span>
            </button>

            <button
              onClick={onNewScenario}
              className="px-6 py-2.5 text-xs font-bold rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors shadow-lg"
            >
              Générer une Nouvelle Feuille d'Aventure
            </button>
          </div>
        </div>
      )}

      {/* Floating Toast Notification for Unlocked Achievement */}
      {recentUnlockedAchievement && (
        <div className="fixed top-6 right-6 z-50 animate-bounce bg-slate-900/95 border-2 border-amber-500 rounded-xl p-4 shadow-2xl text-white flex items-center gap-3.5 max-w-sm backdrop-blur-md">
          <div className="w-11 h-11 rounded-xl bg-amber-500/20 border border-amber-500/60 flex items-center justify-center text-2xl shrink-0 shadow-inner">
            {recentUnlockedAchievement.icon}
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-[10px] uppercase font-extrabold text-amber-400 tracking-wider flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-400" /> Haut Fait Débloqué !
            </span>
            <h4 className="font-cinzel text-sm font-bold text-white truncate">{recentUnlockedAchievement.name}</h4>
            <p className="text-[11px] text-slate-300 leading-tight mt-0.5">{recentUnlockedAchievement.description}</p>
          </div>
          <button
            onClick={() => setRecentUnlockedAchievement(null)}
            className="text-slate-400 hover:text-white cursor-pointer p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Modal: Hauts Faits */}
      {showAchievementsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-6 text-white shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                  <Trophy className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-cinzel text-lg font-bold text-amber-200">Hauts Faits du Simulateur</h3>
                  <span className="text-xs text-slate-400">
                    {unlockedAchievements.length} sur {ACHIEVEMENTS.length} accomplis ({Math.round((unlockedAchievements.length / ACHIEVEMENTS.length) * 100)}%)
                  </span>
                </div>
              </div>
              <button
                onClick={() => setShowAchievementsModal(false)}
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
              <div
                className="bg-gradient-to-r from-amber-500 to-amber-300 h-full transition-all duration-500"
                style={{ width: `${(unlockedAchievements.length / ACHIEVEMENTS.length) * 100}%` }}
              />
            </div>

            {/* Achievements List */}
            <div className="space-y-2.5 pt-1">
              {ACHIEVEMENTS.map(ach => {
                const isUnlocked = unlockedAchievements.includes(ach.id);
                return (
                  <div
                    key={ach.id}
                    className={`p-3 rounded-xl border flex items-center gap-3.5 transition-all ${
                      isUnlocked
                        ? 'bg-amber-950/20 border-amber-500/40 text-white'
                        : 'bg-slate-950/50 border-slate-800/80 text-slate-400 opacity-60'
                    }`}
                  >
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center text-2xl shrink-0 border ${
                        isUnlocked
                          ? 'bg-amber-500/20 border-amber-500/50 shadow-sm'
                          : 'bg-slate-900 border-slate-800 text-slate-600'
                      }`}
                    >
                      {ach.icon}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-cinzel text-sm font-bold text-amber-200">{ach.name}</span>
                        {isUnlocked ? (
                          <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 flex items-center gap-0.5">
                            <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Débloqué
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded bg-slate-800 text-slate-500 flex items-center gap-0.5">
                            <Lock className="w-3 h-3 text-slate-500" /> Verrouillé
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-300 mt-0.5 leading-normal">{ach.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-2 border-t border-slate-800 text-center">
              <button
                onClick={() => setShowAchievementsModal(false)}
                className="w-full py-2 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors cursor-pointer"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
