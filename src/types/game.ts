export type CombinationType =
  | 'paire'
  | 'double_paire'
  | 'brelan'
  | 'parite'
  | 'full'
  | 'carre'
  | 'quintuple';

export type EquipmentType = 'immediate' | 'combat' | 'permanent' | 'cumulative';

export interface Hero {
  id: string;
  name: string;
  title: string;
  description: string;
  startingGold: number;
  startingBonus?: {
    type: 'force' | 'precision' | 'gold' | 'rerolls';
    value: number;
    target?: string;
  };
}

export interface Chest {
  id: string;
  name: string;
  effect: string;
  act: 1 | 2 | 3;
}

export interface Boss {
  id: string;
  name: string;
  act: 1 | 2 | 3;
  powerThreshold: number;
  powerRule: string;
  chestEffect: string;
  difficultyRating?: number; // 1 to 5
  difficultyTier?: 'Modéré' | 'Corsé' | 'Redoutable' | 'Cauchemardesque' | 'Mythique';
  archetype?: string;
  tacticalTip?: string;
}

export interface Sbire {
  id: string;
  index: number; // 1, 2, 3
  act: 1 | 2 | 3;
  powerThreshold: number;
  chest: Chest;
}

export interface Equipment {
  id: string;
  name: string;
  requiredSum: number; // 2 to 12
  cost: number; // Gold cost
  type: EquipmentType;
  effect: string;
}

export interface ScribeItem {
  id: string;
  name: string;
  dieRequired: number; // 1 to 6
  targetFace: number; // 1 to 6
  cost: number;
  bonusType: 'force' | 'precision' | 'gold';
  bonusValue: number;
  description?: string;
}

export interface ApothecaryItem {
  id: string;
  name: string;
  dieRequired: number; // 1 to 6
  targetCombo: CombinationType;
  cost: number;
  bonusType: 'force' | 'precision' | 'gold' | 'force_and_precision';
  bonusValue: number;
  description?: string;
  flavor?: string;
}

export interface SpecialPotion {
  id: string;
  name: string;
  cost: number;
  effect: string;
  type: 'extra_rerolls' | 'dragon_blood' | 'change_die' | 'double_gold' | 'clutch_power' | 'cancel_boss';
  value?: number;
  description: string;
}

export interface AdventureScenario {
  seed: string;
  difficulty: 'Aventurier' | 'Expert' | 'Légendaire' | 'Cauchemar';
  hero: Hero;
  act1: {
    title: string;
    sbires: Sbire[];
    boss: Boss;
  };
  act2: {
    title: string;
    sbires: Sbire[];
    boss: Boss;
  };
  act3: {
    title: string;
    sbires: Sbire[];
    boss: Boss;
  };
  scribeItems: ScribeItem[];
  apothecaryItems: ApothecaryItem[];
  specialPotions: SpecialPotion[];
  equipments: Equipment[]; // 11 items for sums 2 to 12
}

export interface FaceValue {
  force: number;
  precision: number;
  gold: number;
}

export interface ComboValue {
  force: number;
  precision: number;
  gold: number;
}

export interface GameProgress {
  currentAct: 1 | 2 | 3;
  currentCombatIndex: number; // 0..3 (0..2 = sbires, 3 = boss)
  gold: number;
  goldSpent: number;
  faceValues: Record<number, FaceValue>;
  comboValues: Record<CombinationType, ComboValue>;
  ownedEquipments: string[]; // equipment ids
  completedCombats: Record<string, {
    rerollsUsed: number;
    forceUsed: number;
    precisionUsed: number;
    power: number;
    outcome: 'defeat' | 'victory' | 'critical';
    goldEarned: number;
  }>;
  infiniteMultiplier: number;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: number;
}

