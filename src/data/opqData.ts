import { Hero, Boss, Chest, Equipment, ScribeItem, ApothecaryItem, SpecialPotion, AdventureScenario, CombinationType, FaceValue, ComboValue } from '../types/game';

// 50 Heroes
export const HEROES_CATALOG: Hero[] = [
  { id: 'h1', name: 'Mercenaire', title: 'Le Vétéran Solitaire', description: 'Commencez la partie avec 25 Or supplémentaires dans votre Bourse.', startingGold: 25 },
  { id: 'h2', name: 'Rôdeur Sylvestre', title: 'L’Œil de Faucon', description: 'Commencez avec +2 Précision sur les Faces 1 et 3.', startingGold: 0, startingBonus: { type: 'precision', value: 2, target: 'faces_1_3' } },
  { id: 'h3', name: 'Paladin de l’Aurore', title: 'Le Rempart Sacré', description: 'Commencez avec +2 Force sur la Combinaison Brelan et 10 Or.', startingGold: 10, startingBonus: { type: 'force', value: 2, target: 'combo_brelan' } },
  { id: 'h4', name: 'Voleur de l’Ombre', title: 'L’Insaisissable', description: 'Gagnez 1 Relance supplémentaire gratuite lors de chaque combat.', startingGold: 10, startingBonus: { type: 'rerolls', value: 1 } },
  { id: 'h5', name: 'Archimage Runique', title: 'L’Érudit Arcanique', description: 'Commencez avec +1 Force et +1 Précision sur les Faces 2, 4 et 6.', startingGold: 5 },
  { id: 'h6', name: 'Berserker du Nord', title: 'La Rage Primordiale', description: 'Commencez avec +3 Force sur la Face 6 et +1 Force sur la Face 5.', startingGold: 0 },
  { id: 'h7', name: 'Barde Vagabond', title: 'La Voix d’Argent', description: 'Commencez avec 15 Or et +1 Or sur toutes les Combinaisons.', startingGold: 15 },
  { id: 'h8', name: 'Alchimiste Furtif', title: 'Le Fabricant de Pandémonium', description: 'Le premier article de chaque visite chez l’Apothicaire coûte 3 Or de moins.', startingGold: 12 },
  { id: 'h9', name: 'Chevalier Noir', title: 'Le Maudit Repenti', description: 'Commencez avec +4 Force sur le Carré mais -10 Or dans votre Bourse.', startingGold: 0 },
  { id: 'h10', name: 'Duelliste d’Acier', title: 'L’Estoc Implacable', description: 'Commencez avec +2 Précision sur la Combinaison Paire et Double Paire.', startingGold: 5 },
  { id: 'h11', name: 'Moine Céleste', title: 'La Paix Intérieure', description: 'Commencez avec +2 Précision sur la Face 4 et la Combinaison Parité.', startingGold: 5 },
  { id: 'h12', name: 'Pyromancienne', title: 'La Flamme Dansante', description: 'Les Faces 5 et 6 gagnent +2 Force.', startingGold: 5 },
  { id: 'h13', name: 'Nécromancien Repenti', title: 'Le Gardien des Âmes', description: 'Commencez avec +3 Précision sur les Combinaisons à chiffres impairs (1, 3, 5).', startingGold: 8 },
  { id: 'h14', name: 'Corsaire des Mers', title: 'Le Pillard Écumeur', description: 'Commencez avec 20 Or et +1 Or sur les Faces 2 et 4.', startingGold: 20 },
  { id: 'h15', name: 'Trapard des Cavernes', title: 'Le Spéléologue Ruseur', description: 'Les Coffres de Sbires octroient 5 Or bonus lors de chaque Victoire Critique.', startingGold: 10 },
  { id: 'h16', name: 'Sentinelle Sylvestre', title: 'La Protectrice des Clairières', description: 'Commencez avec +2 Force sur la Face 1 et +2 Précision sur la Face 2.', startingGold: 6 },
  { id: 'h17', name: 'Chasseur de Primes', title: 'La Traque Sans Fin', description: 'Chaque Victoire contre un Sbire rapporte 4 Or supplémentaires.', startingGold: 10 },
  { id: 'h18', name: 'Maître des Runes', title: 'Le Graveur de Destin', description: 'Chez le Scribe Sans-Visage, vous pouvez acheter 2 articles par visite.', startingGold: 10 },
  { id: 'h19', name: 'Illusionniste', title: 'Le Tisseur de Mirages', description: 'Commencez avec +3 Précision sur la Combinaison Full.', startingGold: 8 },
  { id: 'h20', name: 'Gladiateur Ardent', title: 'L’Invaincu de l’Arène', description: 'Commencez avec +2 Force sur la Combinaison Brelan et Carré.', startingGold: 5 },
  { id: 'h21', name: 'Druide Métamorphe', title: 'L’Esprit de l’Ours', description: 'Ajoutez +1 Force à toutes les Faces de dés paires dès le départ.', startingGold: 5 },
  { id: 'h22', name: 'Forgemage Nain', title: 'L’Enclume Vivante', description: 'Les équipements achetés chez Marie-Agnès coûtent 2 Or de moins (minimum 2 Or).', startingGold: 10 },
  { id: 'h23', name: 'Assassin Fantôme', title: 'Le Pas Silencieux', description: 'Les Victoires Critiques demandent seulement 1.75× le seuil au lieu de 2×.', startingGold: 10 },
  { id: 'h24', name: 'Chaman des Esprits', title: 'Le Guide Astral', description: 'Commencez avec +1 Force et +1 Précision sur toutes les Combinaisons.', startingGold: 6 },
  { id: 'h25', name: 'Arbalétrier d’Élite', title: 'Le Carreleur Précis', description: 'Commencez avec +4 Précision sur la Face 6.', startingGold: 5 },
  { id: 'h26', name: 'Érudit Déchu', title: 'Le Lecteur de Parchemins', description: 'Commencez avec 2 articles du Scribe Sans-Visage déjà acquis gratuitement.', startingGold: 0 },
  { id: 'h27', name: 'Valkyrie Guerrière', title: 'La Lance de Lumière', description: 'Commencez avec +2 Force et +2 Précision sur la Combinaison Quintuple.', startingGold: 5 },
  { id: 'h28', name: 'Sorcière des Marais', title: 'La Tisseuse de Poisons', description: 'Les articles de l’Apothicaire offrent +1 bonus supplémentaire.', startingGold: 8 },
  { id: 'h29', name: 'Inquisiteur Stoïque', title: 'Le Juge Implacable', description: 'Ignorez les malus imposés par les pouvoirs des Boss de l’Acte 1 et 2.', startingGold: 5 },
  { id: 'h30', name: 'Flibustier Insolent', title: 'Le Maître des Dés Pipés', description: 'Une fois par combat, transformez un résultat 1 en 6.', startingGold: 12 },
  { id: 'h31', name: 'Lancier Protecteur', title: 'La Garde Inflexible', description: 'Commencez avec +2 Force sur les Faces 3 et 4.', startingGold: 8 },
  { id: 'h32', name: 'Bretteur Fantasque', title: 'La Finesse Pure', description: 'La Force n’est arrondie qu’à partir de 30 au lieu de 20.', startingGold: 5 },
  { id: 'h33', name: 'Maître Épéiste', title: 'Le Tranchant Suprême', description: 'Commencez avec +3 Force sur la Face 2 et +1 Précision sur la Face 4.', startingGold: 6 },
  { id: 'h34', name: 'Guérisseur Errant', title: 'La Main Secourable', description: 'Chaque défaite contre un Sbire rapporte 10 Or au lieu de l’Or standard.', startingGold: 15 },
  { id: 'h35', name: 'Tireur d’Élite Goblin', title: 'La Balistique Rusée', description: 'Commencez avec +3 Précision sur la Combinaison Double Paire.', startingGold: 10 },
  { id: 'h36', name: 'Seigneur Déchu', title: 'Le Sang Royal', description: 'Commencez avec 35 Or dans votre Bourse.', startingGold: 35 },
  { id: 'h37', name: 'Chasseur de Monstres', title: 'Le Trophée Sanglant', description: 'Chaque Boss vaincu rapporte 25 Or supplémentaires.', startingGold: 5 },
  { id: 'h38', name: 'Chevalier Dragon', title: 'Le Souffle Ardent', description: 'Commencez avec +3 Force sur la Combinaison Full.', startingGold: 5 },
  { id: 'h39', name: 'Pèlerin Dévot', title: 'La Foi Inébranlable', description: 'Commencez avec +1 Force, +1 Précision et +1 Or sur la Face 1.', startingGold: 10 },
  { id: 'h40', name: 'Voleuse Acrobatrice', title: 'Le Saut de Chat', description: 'Gagnez 2 Relances supplémentaires utilisables uniquement chez les Marchands.', startingGold: 10 },
  { id: 'h41', name: 'Mage de Givre', title: 'Le Zéro Absolu', description: 'Commencez avec +3 Précision sur la Face 5.', startingGold: 5 },
  { id: 'h42', name: 'Nomade du Désert', title: 'Le Survivant des Dunes', description: 'Commencez avec 1 équipement aléatoire gratuit de Marie-Agnès.', startingGold: 5 },
  { id: 'h43', name: 'Exorciste Solennel', title: 'Le Châtiment Sacré', description: 'Commencez avec +2 Force sur toutes les Faces impaires (1, 3, 5).', startingGold: 5 },
  { id: 'h44', name: 'Cuisinier Aventurier', title: 'La Marmite Magique', description: 'Commencez avec +1 Or sur toutes les Faces et 10 Or.', startingGold: 10 },
  { id: 'h45', name: 'Archère Elfe', title: 'La Flèche Transperçante', description: 'Commencez avec +3 Précision sur la Combinaison Parité.', startingGold: 6 },
  { id: 'h46', name: 'Sentinelle d’Obsidienne', title: 'Le Roc Vivant', description: 'Commencez avec +4 Force sur la Combinaison Paire.', startingGold: 5 },
  { id: 'h47', name: 'Brocanteur Fouinard', title: 'Le Chasseur de Bonnes Affaires', description: 'Commencez avec 25 Or et +2 Or sur le Coffre de Sbire 1.', startingGold: 25 },
  { id: 'h48', name: 'Sorcier du Crépuscule', title: 'L’Astre Noir', description: 'Commencez avec +2 Force et +2 Précision sur la Face 3.', startingGold: 7 },
  { id: 'h49', name: 'Maître Tacticien', title: 'La Stratégie Impeccable', description: 'Vous commencez avec 6 Relances par combat au lieu de 5.', startingGold: 8 },
  { id: 'h50', name: 'Héros Légendaire', title: 'Le Porteur de la Destinée', description: 'Commencez avec +1 Force et +1 Précision sur chaque Face de dé.', startingGold: 10 }
];

// 36 Bosses (12 Act 1, 12 Act 2, 12 Act 3) avec Statistiques & Difficultés
export const BOSSES_CATALOG: Boss[] = [
  // ACT 1 (Seuils ~140-165, Critique 280-330)
  {
    id: 'b1_1',
    name: 'Reine des Champignons Vénéneux',
    act: 1,
    powerThreshold: 150,
    powerRule: 'Sans Victoire critique, rayez 1 icône sur chaque article de l’Apothicaire.',
    chestEffect: 'Obtenez le contenu du Coffre d’un Sbire de l’Acte 1.',
    difficultyRating: 2,
    difficultyTier: 'Modéré',
    archetype: 'Sabotage d’Élixirs',
    tacticalTip: 'Visez la Victoire Critique (300+ Puissance) pour préserver vos cercles d’amélioration chez l’Apothicaire.'
  },
  {
    id: 'b1_2',
    name: 'Gobelin Chef de Meute',
    act: 1,
    powerThreshold: 140,
    powerRule: 'Vos Faces « 1 » ne rapportent aucune Précision pendant ce combat.',
    chestEffect: 'Gagnez 20 Or et ajoutez +1 Force à une Face.',
    difficultyRating: 2,
    difficultyTier: 'Modéré',
    archetype: 'Blocage de Précision',
    tacticalTip: 'Relancez systématiquement vos dés affichant 1 pour ne pas gaspiller de points de Précision.'
  },
  {
    id: 'b1_3',
    name: 'Gargouille de Pierre',
    act: 1,
    powerThreshold: 160,
    powerRule: 'La Force requise pour ce combat est augmentée de 10 points.',
    chestEffect: 'Ajoutez +2 Force à la Combinaison Paire et Brelan.',
    difficultyRating: 3,
    difficultyTier: 'Corsé',
    archetype: 'Pression Brute',
    tacticalTip: 'Seuil élevé pour l’Acte 1. Priorisez un Brelan ou une Double Paire pour dépasser les 160 de Puissance.'
  },
  {
    id: 'b1_4',
    name: 'Squelette Colossal',
    act: 1,
    powerThreshold: 150,
    powerRule: 'Vous n’avez droit qu’à 4 Relances pour ce combat au lieu de 5.',
    chestEffect: 'Ajoutez +1 Précision à toutes les Faces de dés.',
    difficultyRating: 3,
    difficultyTier: 'Corsé',
    archetype: 'Entrave aux Relances',
    tacticalTip: 'Seulement 4 relances disponibles : verrouillez vos meilleurs dés dès le 2e jet pour éviter les impasses.'
  },
  {
    id: 'b1_5',
    name: 'Épouvantail Hanté',
    act: 1,
    powerThreshold: 145,
    powerRule: 'Vos Faces paires perdent 1 Précision (minimum 0).',
    chestEffect: 'Gagnez 25 Or dans votre Bourse.',
    difficultyRating: 2,
    difficultyTier: 'Modéré',
    archetype: 'Affaiblissement Pair',
    tacticalTip: 'Orientez vos combinaisons sur les faces impaires (1, 3 et 5) pour esquiver la pénalité de Précision.'
  },
  {
    id: 'b1_6',
    name: 'Hydre Fangeuse',
    act: 1,
    powerThreshold: 165,
    powerRule: 'Si vous n’avez pas au moins un Brelan, votre Précision est réduite de moitié.',
    chestEffect: 'Ajoutez +3 Force à la Combinaison Brelan.',
    difficultyRating: 3,
    difficultyTier: 'Corsé',
    archetype: 'Condition de Brelan',
    tacticalTip: 'Formez impérativement un Brelan ou un Full, sous peine de voir votre Précision divisée par deux.'
  },
  {
    id: 'b1_7',
    name: 'Troll des Ponts Brisés',
    act: 1,
    powerThreshold: 155,
    powerRule: 'Vous devez payer 10 Or avant le combat ou perdre 2 Relances.',
    chestEffect: 'Ajoutez +2 Force et +1 Précision à la Face 4.',
    difficultyRating: 3,
    difficultyTier: 'Corsé',
    archetype: 'Rançon de Relances',
    tacticalTip: 'Gardez toujours 10 Or dans votre Bourse pour payer le droit de passage et conserver vos 5 relances.'
  },
  {
    id: 'b1_8',
    name: 'Matriarche Araignée',
    act: 1,
    powerThreshold: 150,
    powerRule: 'Chaque dé affichant 2 ou 3 ne peut pas être relancé.',
    chestEffect: 'Ajoutez +2 Précision aux Faces 2 et 3.',
    difficultyRating: 2,
    difficultyTier: 'Modéré',
    archetype: 'Toile Immobilisante',
    tacticalTip: 'Les dés affichant 2 et 3 sont figés dès le départ : convertissez-les en Paires de 2 ou 3 avec les autres dés.'
  },
  {
    id: 'b1_9',
    name: 'Loup Alpha des Cavernes',
    act: 1,
    powerThreshold: 140,
    powerRule: 'Sans Victoire Critique, perdez 15 Or de votre Bourse.',
    chestEffect: 'Ajoutez +2 Force à deux Combinaisons de votre choix.',
    difficultyRating: 2,
    difficultyTier: 'Modéré',
    archetype: 'Pillage de Bourse',
    tacticalTip: 'Le seuil est accessible (140), mais visez 280+ pour protéger votre trésor indispensable pour l’Acte 2.'
  },
  {
    id: 'b1_10',
    name: 'Golem d’Argile Vivant',
    act: 1,
    powerThreshold: 160,
    powerRule: 'Vos Combinaisons Paire et Double Paire rapportent 0 Force.',
    chestEffect: 'Ajoutez +2 Force sur toutes les Faces impaires.',
    difficultyRating: 3,
    difficultyTier: 'Corsé',
    archetype: 'Anti-Paires',
    tacticalTip: 'Vos Paires et Doubles Paires fournissent 0 Force ! Vous devez cibler un Brelan, un Full ou une Parité.'
  },
  {
    id: 'b1_11',
    name: 'Bandit Masqué en Embuscade',
    act: 1,
    powerThreshold: 150,
    powerRule: 'À la fin du combat, vole 5 Or par relance utilisée.',
    chestEffect: 'Gagnez 30 Or dans votre Bourse.',
    difficultyRating: 2,
    difficultyTier: 'Modéré',
    archetype: 'Voleur d’Or',
    tacticalTip: 'Chaque relance utilisée vous coûte 5 Or. Validez votre jet dès que le seuil de 150 est atteint.'
  },
  {
    id: 'b1_12',
    name: 'Spectre des Catacombes',
    act: 1,
    powerThreshold: 155,
    powerRule: 'Les dés affichant 6 sont relancés obligatoirement une fois.',
    chestEffect: 'Ajoutez +3 Précision sur la Face 6.',
    difficultyRating: 2,
    difficultyTier: 'Modéré',
    archetype: 'Instabilité du Six',
    tacticalTip: 'La face 6 est instable et doit être relancée. Construisez plutôt votre jeu autour des faces 4 et 5.'
  },

  // ACT 2 (Seuils ~570-650, Critique 1140-1300)
  {
    id: 'b2_1',
    name: 'Sirène aux Chants Irrésistibles',
    act: 2,
    powerThreshold: 600,
    powerRule: 'Les Faces paires de vos dés ne rapportent aucune Force.',
    chestEffect: 'Obtenez le contenu du Coffre d’un Sbire de l’Acte 2.',
    difficultyRating: 4,
    difficultyTier: 'Redoutable',
    archetype: 'Interdiction Paire',
    tacticalTip: 'Toutes les faces paires perdent leur Force. Montez d’urgence vos faces 1, 3 et 5 ou buvez une fiole.'
  },
  {
    id: 'b2_2',
    name: 'Chevalier Maudit Sans Tête',
    act: 2,
    powerThreshold: 580,
    powerRule: 'Votre Précision totale est réduite de 3 points.',
    chestEffect: 'Ajoutez +3 Précision à deux Combinaisons différentes.',
    difficultyRating: 3,
    difficultyTier: 'Corsé',
    archetype: 'Malus de Précision',
    tacticalTip: '-3 Précision globale. Compensez avec des manuscrits du Scribe ou une Fiole de Midas (+3 Précision).'
  },
  {
    id: 'b2_3',
    name: 'Banshee Désolée',
    act: 2,
    powerThreshold: 620,
    powerRule: 'Les dés affichant 1 ou 2 réduisent votre Puissance de 50 points.',
    chestEffect: 'Ajoutez +2 Force et +2 Précision à la Face 5.',
    difficultyRating: 4,
    difficultyTier: 'Redoutable',
    archetype: 'Pénalité 1 et 2',
    tacticalTip: 'Chaque 1 ou 2 inflige -50 Puissance. Relancez impérativement ces faces pour éviter l’effondrement du score.'
  },
  {
    id: 'b2_4',
    name: 'Seigneur Vampire de Brume',
    act: 2,
    powerThreshold: 600,
    powerRule: 'Sans Victoire Critique, rayez 2 cercles d’Or vides dans votre Bourse.',
    chestEffect: 'Ajoutez +4 Force à la Combinaison Full.',
    difficultyRating: 4,
    difficultyTier: 'Redoutable',
    archetype: 'Drain de Bourse',
    tacticalTip: 'Sans Victoire Critique (1200+), votre bourse perd 2 cercles max définitivement. Sortez le grand jeu.'
  },
  {
    id: 'b2_5',
    name: 'Basilic Pétrifiant',
    act: 2,
    powerThreshold: 650,
    powerRule: 'Le dé ayant la plus haute valeur est figé dès le premier lancer.',
    chestEffect: 'Ajoutez +3 Force sur les Faces 4 et 6.',
    difficultyRating: 4,
    difficultyTier: 'Redoutable',
    archetype: 'Pétrification Haute',
    tacticalTip: 'Seuil le plus élevé de l’Acte 2 (650). Votre dé le plus élevé est figé : bâtissez votre combinaison autour de lui.'
  },
  {
    id: 'b2_6',
    name: 'Sphinx Mystique',
    act: 2,
    powerThreshold: 570,
    powerRule: 'Vous devez former une Combinaison Parité ou Double Paire, sinon Puissance divisée par 2.',
    chestEffect: 'Ajoutez +4 Précision à la Combinaison Parité.',
    difficultyRating: 3,
    difficultyTier: 'Corsé',
    archetype: 'Énigme de Parité',
    tacticalTip: 'Ne visez que la Parité ou la Double Paire, toute autre combinaison divise votre puissance par deux.'
  },
  {
    id: 'b2_7',
    name: 'Cyclope Forgeur d’Orages',
    act: 2,
    powerThreshold: 610,
    powerRule: 'La Force de vos Combinaisons est divisée par 2 (arrondi sup).',
    chestEffect: 'Ajoutez +3 Force à toutes les Combinaisons.',
    difficultyRating: 4,
    difficultyTier: 'Redoutable',
    archetype: 'Division de Force',
    tacticalTip: 'Force divisée par 2. Misez sur une Précision massive et des bonus d’équipements fixes pour surmonter le malus.'
  },
  {
    id: 'b2_8',
    name: 'Manticore Ailée',
    act: 2,
    powerThreshold: 630,
    powerRule: 'Chaque Relance utilisée coûte 2 Or de votre Bourse.',
    chestEffect: 'Gagnez 40 Or et ajoutez +2 Précision à la Face 3.',
    difficultyRating: 4,
    difficultyTier: 'Redoutable',
    archetype: 'Taxe de Relances',
    tacticalTip: 'Chaque relance coûte 2 Or. Buvez la Fiole de Célérité pour obtenir 2 relances gratuites sans payer de taxe.'
  },
  {
    id: 'b2_9',
    name: 'Général Orc Belliqueux',
    act: 2,
    powerThreshold: 600,
    powerRule: 'Vous perdez 1 Relance pour chaque dé affichant 1 au premier jet.',
    chestEffect: 'Ajoutez +3 Force sur la Face 1 et +3 Force sur le Brelan.',
    difficultyRating: 3,
    difficultyTier: 'Corsé',
    archetype: 'Briseur de Relances',
    tacticalTip: 'Chaque 1 au premier tirage détruit 1 relance. Si vous perdez trop de relances, compensez avec une fiole.'
  },
  {
    id: 'b2_10',
    name: 'Sorcier des Tempêtes',
    act: 2,
    powerThreshold: 590,
    powerRule: 'Les Faces impaires ne rapportent aucune Précision.',
    chestEffect: 'Ajoutez +2 Précision aux Faces 1, 3 et 5.',
    difficultyRating: 3,
    difficultyTier: 'Corsé',
    archetype: 'Interdiction Impaire',
    tacticalTip: 'Les faces impaires (1, 3, 5) perdent leur Précision. Formez vos combinaisons sur les faces paires (2, 4, 6).'
  },
  {
    id: 'b2_11',
    name: 'Dévoreur des Abîmes',
    act: 2,
    powerThreshold: 640,
    powerRule: 'Vous devez sacrifier 1 équipement ou combattre avec 3 Relances max.',
    chestEffect: 'Ajoutez +3 Force et +3 Précision à la Combinaison Carré.',
    difficultyRating: 4,
    difficultyTier: 'Redoutable',
    archetype: 'Sacrifice d’Équipement',
    tacticalTip: 'Ne sacrifiez pas un équipement précieux : préférez vous battre avec 3 relances en utilisant une fiole tactique.'
  },
  {
    id: 'b2_12',
    name: 'Gorgone des Ruines Antiques',
    act: 2,
    powerThreshold: 600,
    powerRule: 'Toutes les Faces de vos dés ont leur Force réduite de 1.',
    chestEffect: 'Ajoutez +2 Force à toutes les Faces de dés.',
    difficultyRating: 3,
    difficultyTier: 'Corsé',
    archetype: 'Érosion de Force',
    tacticalTip: 'Toutes les faces perdent 1 Force. Les bonus de combinaison de l’Apothicaire sont vitaux pour compenser.'
  },

  // ACT 3 (Seuils ~1850-2250, Critique 3700-4500)
  {
    id: 'b3_1',
    name: 'Dragon Rouge Cupide',
    act: 3,
    powerThreshold: 2000,
    powerRule: 'Ignorez tous vos équipements pendant ce combat OU payez 40 Or.',
    chestEffect: 'Obtenez le contenu du Coffre d’un Sbire de l’Acte 3.',
    difficultyRating: 5,
    difficultyTier: 'Mythique',
    archetype: 'Rançon Draconique',
    tacticalTip: 'Préparez impérativement 40 Or pour payer le tribut et préserver vos précieux équipements face au Dragon !'
  },
  {
    id: 'b3_2',
    name: 'Liche Sombre Immortelle',
    act: 3,
    powerThreshold: 1900,
    powerRule: 'Vos Combinaisons Paire et Brelan ne rapportent aucun point de Précision.',
    chestEffect: 'Ajoutez +5 Précision au Full et au Quintuple.',
    difficultyRating: 4,
    difficultyTier: 'Cauchemardesque',
    archetype: 'Anti-Paires et Brelans',
    tacticalTip: 'Paires et Brelans ont 0 Précision ! Vous devez impérativement former un Full, un Carré ou une Parité.'
  },
  {
    id: 'b3_3',
    name: 'Kraken Géant des Profondeurs',
    act: 3,
    powerThreshold: 2100,
    powerRule: 'Vous ne pouvez conserver que 4 dés au total (le 5e est dévoré).',
    chestEffect: 'Ajoutez +4 Force à toutes les Combinaisons.',
    difficultyRating: 5,
    difficultyTier: 'Mythique',
    archetype: 'Dévorateur de Dé',
    tacticalTip: 'Combat à 4 dés uniquement ! Quintuple et Parité sont impossibles : maximisez le Carré de 5 ou 6.'
  },
  {
    id: 'b3_4',
    name: 'Démon Supérieur des Enfers',
    act: 3,
    powerThreshold: 2050,
    powerRule: 'Chaque dé avec un résultat pair inflige -100 à la Puissance finale.',
    chestEffect: 'Ajoutez +5 Force aux Faces 1, 3 et 5.',
    difficultyRating: 5,
    difficultyTier: 'Mythique',
    archetype: 'Châtiment Pair',
    tacticalTip: 'Chaque dé pair inflige -100 Puissance. Visez une Parité impaire (1, 3, 5) ou buvez du Sang de Dragon.'
  },
  {
    id: 'b3_5',
    name: 'Seigneur Dragon Dracoliche',
    act: 3,
    powerThreshold: 2200,
    powerRule: 'La Force est arrondie à la vingtaine inférieure au lieu de la dizaine.',
    chestEffect: 'Gagnez 60 Or et ajoutez +5 Force à la Face de votre choix.',
    difficultyRating: 5,
    difficultyTier: 'Mythique',
    archetype: 'Arrondi à la Vingtaine',
    tacticalTip: 'La Force est arrondie à la vingtaine (ex: 39 -> 20). Buvez impérativement la Fiole de Sang de Dragon pour ignorer l’arrondi.'
  },
  {
    id: 'b3_6',
    name: 'Titanesse des Tempêtes',
    act: 3,
    powerThreshold: 1950,
    powerRule: 'Les Relances ne peuvent être utilisées que pour relancer tous les dés à la fois.',
    chestEffect: 'Ajoutez +3 Force et +3 Précision à toutes les Faces.',
    difficultyRating: 4,
    difficultyTier: 'Cauchemardesque',
    archetype: 'Chaos de Relance',
    tacticalTip: 'Impossible de verrouiller des dés : chaque relance relance les 5 dés d’un coup. Comptez sur vos bonus passifs.'
  },
  {
    id: 'b3_7',
    name: 'Archi-Inquisiteur Noir',
    act: 3,
    powerThreshold: 2000,
    powerRule: 'Sans Victoire Critique, tous vos équipements Cumulatifs sont désactivés.',
    chestEffect: 'Doublez les valeurs d’une Combinaison de votre choix.',
    difficultyRating: 4,
    difficultyTier: 'Cauchemardesque',
    archetype: 'Purge Cumulatif',
    tacticalTip: 'Visez la Victoire Critique (4000+) pour préserver vos bonus cumulatifs indispensables pour le Mode Infini.'
  },
  {
    id: 'b3_8',
    name: 'Béhémoth Cuirassé',
    act: 3,
    powerThreshold: 2150,
    powerRule: 'Seule la Combinaison la plus haute possible parmi vos dés est acceptée.',
    chestEffect: 'Ajoutez +6 Force sur le Carré et le Quintuple.',
    difficultyRating: 5,
    difficultyTier: 'Mythique',
    archetype: 'Combinaison Forcée',
    tacticalTip: 'Seule la combinaison la plus haute est prise en compte. Entraînez votre Carré et votre Full.'
  },
  {
    id: 'b3_9',
    name: 'L’Entité du Néant Cosmique',
    act: 3,
    powerThreshold: 2000,
    powerRule: 'Toutes vos valeurs de Précision sont divisées par 1.5.',
    chestEffect: 'Ajoutez +6 Précision à la Combinaison de votre choix.',
    difficultyRating: 5,
    difficultyTier: 'Mythique',
    archetype: 'Distorsion Spatiale',
    tacticalTip: 'Précision divisée par 1.5. Il vous faut au moins 40+ de Force brute pour compenser la perte de précision.'
  },
  {
    id: 'b3_10',
    name: 'Avatar de la Guerre Sanglante',
    act: 3,
    powerThreshold: 2250,
    powerRule: 'Le seuil de Victoire Critique passe à 2.5× le seuil standard.',
    chestEffect: 'Ajoutez +5 Force et +5 Précision sur la Face 6.',
    difficultyRating: 5,
    difficultyTier: 'Mythique',
    archetype: 'Seuil Critique Ultime',
    tacticalTip: 'Le seuil de base le plus terrifiant du jeu (2250). Une Victoire Critique demande 5625 de Puissance !'
  },
  {
    id: 'b3_11',
    name: 'Souverain Corrompu de l’Oubli',
    act: 3,
    powerThreshold: 1850,
    powerRule: 'Chaque Face de dé non utilisée retire 1 Force à la Combinaison finale.',
    chestEffect: 'Gagnez 50 Or et ajoutez +4 Précision à la Parité.',
    difficultyRating: 4,
    difficultyTier: 'Cauchemardesque',
    archetype: 'Pénalité de Dés Libres',
    tacticalTip: 'Chaque dé hors combinaison finale retire 1 Force. Les combinaisons à 5 dés (Full, Parité) sont reines.'
  },
  {
    id: 'b3_12',
    name: 'Phénix Obscur Déchu',
    act: 3,
    powerThreshold: 2000,
    powerRule: 'Si vous ratez le seuil au premier essai, vous perdez 1 Relance restante.',
    chestEffect: 'Ajoutez +4 Force et +4 Précision sur les Combinaisons Paire et Full.',
    difficultyRating: 4,
    difficultyTier: 'Cauchemardesque',
    archetype: 'Pression Initiale',
    tacticalTip: 'Si le premier tirage ne bat pas le seuil, 1 relance est consumée. Maximisez vos bonus de départ.'
  }
];

// 66 Chests (22 Act 1, 22 Act 2, 22 Act 3)
export const CHESTS_CATALOG: Chest[] = [
  // ACT 1 (Sbires seuils 25, 50, 75)
  { id: 'c1_1', name: 'Bénédiction du Silex', act: 1, effect: 'Ajoutez +1 à une Face de votre choix.' },
  { id: 'c1_2', name: 'Sceau d’Équilibre', act: 1, effect: 'Ajoutez +2 à deux Combinaisons différentes ne possédant aucun bonus.' },
  { id: 'c1_3', name: 'Dé de Fortune', act: 1, effect: 'Lancez 1 dé : ajoutez autant de Force à une Combinaison de votre choix.' },
  { id: 'c1_4', name: 'Bourgeon Vivace', act: 1, effect: 'Ajoutez +1 Précision sur les Faces 1 et 2.' },
  { id: 'c1_5', name: 'Bourse Volée', act: 1, effect: 'Gagnez 15 Or supplémentaires dans votre Bourse.' },
  { id: 'c1_6', name: 'Pointe Trempée', act: 1, effect: 'Ajoutez +1 Force sur les Faces 3 et 5.' },
  { id: 'c1_7', name: 'Flacon de Lucidité', act: 1, effect: 'Ajoutez +2 Précision à la Combinaison Paire.' },
  { id: 'c1_8', name: 'Parchemin Vierge', act: 1, effect: 'Achetez immédiatement un article du Scribe avec 3 Or de réduction.' },
  { id: 'c1_9', name: 'Graine d’Aubépine', act: 1, effect: 'Ajoutez +1 Force et +1 Précision à la Combinaison Brelan.' },
  { id: 'c1_10', name: 'Relique Ébréchée', act: 1, effect: 'Lancez 2 dés : gagnez autant d’Or que le résultat le plus élevé.' },
  { id: 'c1_11', name: 'Charbon Actif', act: 1, effect: 'Ajoutez +1 Or sur 3 Faces de votre choix.' },
  { id: 'c1_12', name: 'Lame d’Affûteur', act: 1, effect: 'Ajoutez +2 Force sur la Combinaison Double Paire.' },
  { id: 'c1_13', name: 'Plume Agile', act: 1, effect: 'Gagnez 1 Relance bonus pour le prochain combat.' },
  { id: 'c1_14', name: 'Amulette Fissurée', act: 1, effect: 'Ajoutez +1 Force et +1 Or sur la Face 6.' },
  { id: 'c1_15', name: 'Pétale d’Or', act: 1, effect: 'Gagnez 20 Or immédiatement.' },
  { id: 'c1_16', name: 'Écaille de Lézard', act: 1, effect: 'Ajoutez +1 Force sur les Faces 2, 4 et 6.' },
  { id: 'c1_17', name: 'Grimoire Mineur', act: 1, effect: 'Ajoutez +2 Précision sur la Combinaison Parité.' },
  { id: 'c1_18', name: 'Pierre à Aiguiser', act: 1, effect: 'Ajoutez +2 Force sur la Combinaison Paire.' },
  { id: 'c1_19', name: 'Bourse Secrète', act: 1, effect: 'Ajoutez +2 Or à la Combinaison Full.' },
  { id: 'c1_20', name: 'Cristal Taillé', act: 1, effect: 'Ajoutez +1 Précision à 3 Faces de votre choix.' },
  { id: 'c1_21', name: 'Teinture Rare', act: 1, effect: 'Achetez immédiatement un article de l’Apothicaire avec 3 Or de réduction.' },
  { id: 'c1_22', name: 'Talisman de Chance', act: 1, effect: 'Relancez gratuitement 1 dé lors de chaque visite chez Marie-Agnès.' },

  // ACT 2 (Sbires seuils 200, 300, 400)
  { id: 'c2_1', name: 'Pacte des Abysses', act: 2, effect: 'Lancez 2 dés : gagnez autant d’Or que la somme de leurs résultats.' },
  { id: 'c2_2', name: 'Harmonie des Égaux', act: 2, effect: 'Ajoutez +3 aux Faces 2, 4 et 6.' },
  { id: 'c2_3', name: 'Onde Percutante', act: 2, effect: 'Ajoutez +1 aux Faces 2, 4 et 6.' },
  { id: 'c2_4', name: 'Miroir Déformant', act: 2, effect: 'Ajoutez +3 Précision sur la Combinaison Brelan et +2 Force sur le Full.' },
  { id: 'c2_5', name: 'Lingot de Mithril', act: 2, effect: 'Gagnez 25 Or dans votre Bourse.' },
  { id: 'c2_6', name: 'Rune Gravée', act: 2, effect: 'Ajoutez +2 Force et +2 Précision sur la Face 5.' },
  { id: 'c2_7', name: 'Vortex de Vitalité', act: 2, effect: 'Gagnez 2 Relances supplémentaires pour le combat de Boss de l’Acte 2.' },
  { id: 'c2_8', name: 'Sceau d’Imprégnation', act: 2, effect: 'Ajoutez +3 Force sur une Combinaison ne possédant aucun bonus.' },
  { id: 'c2_9', name: 'Huile Enchanteresse', act: 2, effect: 'Ajoutez +2 Précision sur les Faces 1, 3 et 5.' },
  { id: 'c2_10', name: 'Trésor Enfoui', act: 2, effect: 'Gagnez 35 Or immédiatement.' },
  { id: 'c2_11', name: 'Oxyde Luminescent', act: 2, effect: 'Ajoutez +3 Précision sur la Combinaison Double Paire.' },
  { id: 'c2_12', name: 'Étendard de Gloire', act: 2, effect: 'Ajoutez +2 Force sur toutes les Faces de dés ayant au moins 1 point.' },
  { id: 'c2_13', name: 'Sphère Stellaire', act: 2, effect: 'Lancez 1 dé : ajoutez son résultat en Précision sur la Face correspondante.' },
  { id: 'c2_14', name: 'Pierre d’Orgueil', act: 2, effect: 'Ajoutez +4 Force sur la Combinaison Carré.' },
  { id: 'c2_15', name: 'Poudre d’Étoile', act: 2, effect: 'Le prochain achat chez Marie-Agnès est à moitié prix.' },
  { id: 'c2_16', name: 'Cor d’Appel', act: 2, effect: 'Ajoutez +2 Force et +2 Précision sur la Combinaison Parité.' },
  { id: 'c2_17', name: 'Joyau Verdoyant', act: 2, effect: 'Ajoutez +2 Or sur toutes les Faces paires.' },
  { id: 'c2_18', name: 'Cœur de Magma', act: 2, effect: 'Ajoutez +3 Force sur la Face 6.' },
  { id: 'c2_19', name: 'Aura Éthérée', act: 2, effect: 'Ajoutez +3 Précision sur la Combinaison Full.' },
  { id: 'c2_20', name: 'Coffre Scellé', act: 2, effect: 'Gagnez 30 Or et ajoutez +1 Force sur les Faces 1 et 2.' },
  { id: 'c2_21', name: 'Diadème d’Ombre', act: 2, effect: 'Ajoutez +2 Précision à toutes les Combinaisons.' },
  { id: 'c2_22', name: 'Dague Rituelle', act: 2, effect: 'Ajoutez +3 Force sur la Combinaison Paire.' },

  // ACT 3 (Sbires seuils 800, 1100, 1400)
  { id: 'c3_1', name: 'Souffle de Persévérance', act: 3, effect: 'Ajoutez 3 Relances à votre prochain combat.' },
  { id: 'c3_2', name: 'Pécule du Stratège', act: 3, effect: 'Chaque Relance inutilisée de ce combat rapporte +5 Or.' },
  { id: 'c3_3', name: 'Écho des Valeurs Oubliées', act: 3, effect: 'Chaque valeur absente de votre Combinaison finale gagne +1 sur sa Face.' },
  { id: 'c3_4', name: 'Joyau de la Couronne', act: 3, effect: 'Gagnez 40 Or immédiatement dans votre Bourse.' },
  { id: 'c3_5', name: 'Flamme Primordiale', act: 3, effect: 'Ajoutez +4 Force sur une Face de votre choix.' },
  { id: 'c3_6', name: 'Œil Omniscient', act: 3, effect: 'Ajoutez +4 Précision sur la Combinaison Full ou Carré.' },
  { id: 'c3_7', name: 'Richesse Insensée', act: 3, effect: 'Gagnez 50 Or et ajoutez +2 Or sur la Combinaison Quintuple.' },
  { id: 'c3_8', name: 'Tome des Arcanes Suprêmes', act: 3, effect: 'Ajoutez +3 Force et +3 Précision sur deux Faces différentes.' },
  { id: 'c3_9', name: 'Élixir de Puissance Pure', act: 3, effect: 'La Force n’est plus arrondie à la dizaine pour le combat contre le Boss 3.' },
  { id: 'c3_10', name: 'Bouclier de Titan', act: 3, effect: 'Ajoutez +5 Force sur la Combinaison Brelan.' },
  { id: 'c3_11', name: 'Sablier Temporel', act: 3, effect: 'Vous gagnez 2 Relances supplémentaires pour tous les combats restants.' },
  { id: 'c3_12', name: 'Trésor du Dragon', act: 3, effect: 'Obtenez immédiatement 1 équipement au choix chez Marie-Agnès gratuitement.' },
  { id: 'c3_13', name: 'Sceptre Démoniaque', act: 3, effect: 'Ajoutez +4 Force sur les Faces 4, 5 et 6.' },
  { id: 'c3_14', name: 'Étoile Déchue', act: 3, effect: 'Ajoutez +5 Précision sur la Combinaison Parité.' },
  { id: 'c3_15', name: 'Cristal d’Infinité', act: 3, effect: 'Ajoutez +2 Force et +2 Précision sur toutes les Combinaisons.' },
  { id: 'c3_16', name: 'Heaume des Rois', act: 3, effect: 'Ajoutez +3 Force et +3 Précision sur la Face 1.' },
  { id: 'c3_17', name: 'Pacte Sanglant', act: 3, effect: 'Payez 20 Or pour ajouter +6 Force sur la Combinaison Quintuple.' },
  { id: 'c3_18', name: 'Gantelet Forgé d’Astre', act: 3, effect: 'Ajoutez +4 Force sur la Combinaison Double Paire.' },
  { id: 'c3_19', name: 'Reliquaire Sacré', act: 3, effect: 'Ajoutez +3 Précision sur toutes les Faces impaires.' },
  { id: 'c3_20', name: 'Cendre d’Immortalité', act: 3, effect: 'Si vous perdez contre le Boss 3, vous avez une seconde chance immédiate.' },
  { id: 'c3_21', name: 'Épée d’Ombrelame', act: 3, effect: 'Ajoutez +5 Force sur la Combinaison Carré.' },
  { id: 'c3_22', name: 'Aura Céleste Suprême', act: 3, effect: 'Gagnez 45 Or et ajoutez +3 Précision sur la Face 6.' }
];

// 110 Equipments for Marie-Agnès (Sums 2 through 12, diverse types)
export const EQUIPMENTS_CATALOG: Equipment[] = [
  // Sum 2
  { id: 'eq_2_1', name: 'Anneau Antique', requiredSum: 2, cost: 15, type: 'permanent', effect: 'Doublez l’effet de vos équipements de type Cumulatif.' },
  { id: 'eq_2_2', name: 'Amulette des Serpents Jumeaux', requiredSum: 2, cost: 14, type: 'combat', effect: 'Si vous obtenez deux « 1 » dans votre jet final, ajoutez +4 Force et +4 Précision.' },
  { id: 'eq_2_3', name: 'Sceau du Monarque Déchu', requiredSum: 2, cost: 15, type: 'immediate', effect: 'Gagnez immédiatement 30 Or et ajoutez +2 Force à la Face 1.' },
  { id: 'eq_2_4', name: 'Ouroboros Infini', requiredSum: 2, cost: 16, type: 'cumulative', effect: 'À chaque combat remporté, gagnez +1 Force permanente sur la Face 1.' },
  { id: 'eq_2_5', name: 'Talisman Double Un', requiredSum: 2, cost: 12, type: 'combat', effect: 'Chaque dé de valeur 1 dans votre jet rapporte 3 Or supplémentaires.' },
  { id: 'eq_2_6', name: 'Bague de l’Éclipse', requiredSum: 2, cost: 13, type: 'permanent', effect: 'Les dés affichant 1 peuvent être relancés gratuitement une fois par combat.' },
  { id: 'eq_2_7', name: 'Graine Primordiale', requiredSum: 2, cost: 11, type: 'immediate', effect: 'Ajoutez +1 à toutes les statistiques de la Face 1 (Force, Précision, Or).' },
  { id: 'eq_2_8', name: 'Diadème des Gémeaux', requiredSum: 2, cost: 14, type: 'combat', effect: 'La Combinaison Paire gagne +4 Force et +2 Précision.' },
  { id: 'eq_2_9', name: 'Bague Éthérée', requiredSum: 2, cost: 12, type: 'cumulative', effect: 'Chaque fois que vous achetez chez le Scribe, gagnez +1 Précision sur la Face 1.' },
  { id: 'eq_2_10', name: 'Sceptre des Étoiles Jumelles', requiredSum: 2, cost: 15, type: 'permanent', effect: 'Chaque Victoire Critique rapporte 1 Coffre supplémentaire d’un Sbire aléatoire.' },

  // Sum 3
  { id: 'eq_3_1', name: 'Cape du Sanglier Sauvage', requiredSum: 3, cost: 12, type: 'combat', effect: 'À la fin du combat, ajoutez +2 Force et +1 Précision à la Combinaison finale.' },
  { id: 'eq_3_2', name: 'Dague d’Assassin Goblin', requiredSum: 3, cost: 10, type: 'combat', effect: 'Ajoutez +3 Précision si votre Combinaison finale contient un dé de valeur 1 ou 2.' },
  { id: 'eq_3_3', name: 'Broche Sylvestre', requiredSum: 3, cost: 9, type: 'permanent', effect: 'Vous commencez chaque visite chez les Marchands avec 1 Relance offerte.' },
  { id: 'eq_3_4', name: 'Flûte Panique', requiredSum: 3, cost: 11, type: 'immediate', effect: 'Ajoutez +2 Force sur la Combinaison Paire et gagnez 10 Or.' },
  { id: 'eq_3_5', name: 'Grigri Porte-Bonheur', requiredSum: 3, cost: 8, type: 'combat', effect: 'Les dés affichant 3 peuvent être modifiés de +1 ou -1 une fois par combat.' },
  { id: 'eq_3_6', name: 'Boussole Étoilée', requiredSum: 3, cost: 12, type: 'cumulative', effect: 'Chaque Victoire Critique ajoute +1 Précision à la Face 3.' },
  { id: 'eq_3_7', name: 'Ceinturon de Cuir Tressé', requiredSum: 3, cost: 7, type: 'permanent', effect: 'Augmente votre Bourse de 10 Or au moment de l’achat.' },
  { id: 'eq_3_8', name: 'Bandana du Vagabond', requiredSum: 3, cost: 9, type: 'combat', effect: 'Gagnez +2 Or par Relance inutilisée lors d’une victoire.' },
  { id: 'eq_3_9', name: 'Grimoire d’Apprenti', requiredSum: 3, cost: 10, type: 'immediate', effect: 'Ajoutez +1 Précision à trois Faces de votre choix.' },
  { id: 'eq_3_10', name: 'Éperons de Voyage', requiredSum: 3, cost: 8, type: 'cumulative', effect: 'À chaque changement d’Acte, gagnez 15 Or.' },

  // Sum 4
  { id: 'eq_4_1', name: 'Coiffe du Vautour', requiredSum: 4, cost: 10, type: 'combat', effect: 'Gagnez 4 Or par dé de valeur 6 hors de votre Combinaison finale.' },
  { id: 'eq_4_2', name: 'Bouclier de Chêne Robuste', requiredSum: 4, cost: 9, type: 'combat', effect: 'Ajoutez +3 Force si vous réalisez une Combinaison Paire ou Double Paire.' },
  { id: 'eq_4_3', name: 'Heaume du Faucon', requiredSum: 4, cost: 11, type: 'permanent', effect: 'Ajoutez +2 Précision à toutes vos Combinaisons finales.' },
  { id: 'eq_4_4', name: 'Collier d’Ambre Runique', requiredSum: 4, cost: 12, type: 'cumulative', effect: 'Dès que vous obtenez un Full, ajoutez +1 Force permanente à la Face 4.' },
  { id: 'eq_4_5', name: 'Brassards d’Archerie', requiredSum: 4, cost: 8, type: 'combat', effect: 'Gagnez +3 Précision si votre Combinaison finale est composée uniquement de dés impairs.' },
  { id: 'eq_4_6', name: 'Carquois Magique', requiredSum: 4, cost: 10, type: 'immediate', effect: 'Ajoutez +2 Précision sur les Faces 2 et 4.' },
  { id: 'eq_4_7', name: 'Fronde Enchantée', requiredSum: 4, cost: 7, type: 'combat', effect: 'Ajoutez +2 Force par dé hors combinaison finale.' },
  { id: 'eq_4_8', name: 'Tunique Renforcée', requiredSum: 4, cost: 9, type: 'permanent', effect: 'Les défaites contre les Sbires rapportent 5 Or supplémentaires.' },
  { id: 'eq_4_9', name: 'Talisman de Chêne', requiredSum: 4, cost: 8, type: 'cumulative', effect: 'Chaque combat gagné sans relance rapporte +1 Force permanente à la Face 2.' },
  { id: 'eq_4_10', name: 'Clé Envoûtée', requiredSum: 4, cost: 12, type: 'immediate', effect: 'Gagnez immédiatement 20 Or et 1 Coffre de l’Acte en cours.' },

  // Sum 5
  { id: 'eq_5_1', name: 'Gants du Corbeau', requiredSum: 5, cost: 8, type: 'permanent', effect: 'À chaque visite chez le Scribe, ajoutez +1 à l’effet du 1er article acheté.' },
  { id: 'eq_5_2', name: 'Gantelets de Cuivre', requiredSum: 5, cost: 8, type: 'combat', effect: 'Ajoutez +2 Force si votre Combinaison finale utilise au moins 3 dés.' },
  { id: 'eq_5_3', name: 'Plume Noire Énigmatique', requiredSum: 5, cost: 9, type: 'combat', effect: 'Ajoutez +3 Précision sur le Brelan.' },
  { id: 'eq_5_4', name: 'Sacoche d’Alchimiste', requiredSum: 5, cost: 10, type: 'permanent', effect: 'Les articles de l’Apothicaire coûtent 1 Or de moins.' },
  { id: 'eq_5_5', name: 'Médaillon du Destin', requiredSum: 5, cost: 11, type: 'cumulative', effect: 'Chaque fois qu’un dé affiche 5, gagnez 1 Or.' },
  { id: 'eq_5_6', name: 'Ceinture d’Agilité', requiredSum: 5, cost: 7, type: 'combat', effect: 'Vous pouvez échanger la valeur de deux dés une fois par combat.' },
  { id: 'eq_5_7', name: 'Potion de Vivacité Infuse', requiredSum: 5, cost: 8, type: 'immediate', effect: 'Gagnez 2 Relances utilisables n’importe quand dans la partie.' },
  { id: 'eq_5_8', name: 'Cape de Corbeau', requiredSum: 5, cost: 9, type: 'permanent', effect: 'Ajoutez +1 Précision sur les Faces 1, 3 et 5.' },
  { id: 'eq_5_9', name: 'Griffes d’Acier Froid', requiredSum: 5, cost: 10, type: 'combat', effect: 'Ajoutez +4 Force si vous terminez avec un Brelan.' },
  { id: 'eq_5_10', name: 'Pierre d’Âme Mineure', requiredSum: 5, cost: 12, type: 'cumulative', effect: 'Chaque Boss vaincu augmente la Force de toutes vos Faces de 1.' },

  // Sum 6
  { id: 'eq_6_1', name: 'Plastron du Tigre', requiredSum: 6, cost: 6, type: 'combat', effect: 'Gagnez +15 Puissance si tous les dés de votre Combinaison finale affichent 1, 3 ou 5.' },
  { id: 'eq_6_2', name: 'Jambières du Serpent', requiredSum: 6, cost: 6, type: 'permanent', effect: 'Dès qu’un dé affiche 5, vous pouvez modifier son résultat de +1.' },
  { id: 'eq_6_3', name: 'Bottes du Sanglier', requiredSum: 6, cost: 6, type: 'combat', effect: 'Avec un Full comme Combinaison finale, ajoutez +1 à cette Combinaison.' },
  { id: 'eq_6_4', name: 'Armure d’Écailles de Basilic', requiredSum: 6, cost: 8, type: 'combat', effect: 'Ajoutez +3 Force sur toutes les Combinaisons à 4 ou 5 dés.' },
  { id: 'eq_6_5', name: 'Cœur de Tigre Sauvage', requiredSum: 6, cost: 10, type: 'cumulative', effect: 'Chaque Victoire Critique ajoute +1 Force permanente à la Face 6.' },
  { id: 'eq_6_6', name: 'Venin de Crotale Concentré', requiredSum: 6, cost: 7, type: 'combat', effect: 'Les dés de valeur 6 ajoutent +2 Précision chacun.' },
  { id: 'eq_6_7', name: 'Épaulières de Fer Trempé', requiredSum: 6, cost: 8, type: 'permanent', effect: 'Votre Force ne peut jamais descendre en dessous de 8 lors des combats.' },
  { id: 'eq_6_8', name: 'Torche Éternelle des Cavernes', requiredSum: 6, cost: 7, type: 'immediate', effect: 'Ajoutez +1 Force et +1 Précision sur les Faces 3 et 6.' },
  { id: 'eq_6_9', name: 'Cape du Léopard', requiredSum: 6, cost: 9, type: 'combat', effect: 'Ajoutez +4 Précision sur la Combinaison Double Paire.' },
  { id: 'eq_6_10', name: 'Broche du Serpent Doré', requiredSum: 6, cost: 11, type: 'permanent', effect: 'Chaque dé de valeur 5 rapporte 2 Or à la fin du combat.' },

  // Sum 7
  { id: 'eq_7_1', name: 'Bracelets du Vautour', requiredSum: 7, cost: 8, type: 'combat', effect: 'Gagnez +1 Or par dé hors de votre Combinaison finale.' },
  { id: 'eq_7_2', name: 'Glaive des Centurions', requiredSum: 7, cost: 9, type: 'combat', effect: 'Ajoutez +3 Force sur le Brelan et le Carré.' },
  { id: 'eq_7_3', name: 'Ceinture des Tempêtes', requiredSum: 7, cost: 10, type: 'combat', effect: 'Si la somme de vos dés fait 20 ou plus, ajoutez +5 Force.' },
  { id: 'eq_7_4', name: 'Anneau de Chance Céleste', requiredSum: 7, cost: 12, type: 'permanent', effect: 'Les dés affichant 6 peuvent être relancés sans dépenser de Relance.' },
  { id: 'eq_7_5', name: 'Chapelet Béni', requiredSum: 7, cost: 7, type: 'immediate', effect: 'Gagnez 15 Or et ajoutez +1 Précision sur la Combinaison Paire.' },
  { id: 'eq_7_6', name: 'Plume du Harfang des Neiges', requiredSum: 7, cost: 9, type: 'cumulative', effect: 'Chaque Victoire sans perdre de Relance ajoute +1 Précision sur la Face 4.' },
  { id: 'eq_7_7', name: 'Tabard des Chevaliers', requiredSum: 7, cost: 8, type: 'combat', effect: 'Ajoutez +2 Force et +1 Précision sur le Full.' },
  { id: 'eq_7_8', name: 'Miroir de Vérité', requiredSum: 7, cost: 10, type: 'permanent', effect: 'La Parité rapporte le double d’Or.' },
  { id: 'eq_7_9', name: 'Faucille Lunaire', requiredSum: 7, cost: 9, type: 'combat', effect: 'Ajoutez +3 Précision si votre Combinaison utilise les dés 1, 2 ou 3.' },
  { id: 'eq_7_10', name: 'Élixir de longévité', requiredSum: 7, cost: 11, type: 'immediate', effect: 'Ajoutez +2 Force sur deux Faces de votre choix.' },

  // Sum 8
  { id: 'eq_8_1', name: 'Ceinture de l’Ours', requiredSum: 8, cost: 10, type: 'combat', effect: 'Gagnez 4 Or supplémentaires si tous les dés de votre Combinaison finale affichent 2, 4 ou 6.' },
  { id: 'eq_8_2', name: 'Gantelets de Mailloche', requiredSum: 8, cost: 10, type: 'combat', effect: 'Ajoutez +4 Force sur la Combinaison Carré.' },
  { id: 'eq_8_3', name: 'Collier d’Os d’Ours', requiredSum: 8, cost: 9, type: 'permanent', effect: 'La Force de la Combinaison Brelan est augmentée de 3.' },
  { id: 'eq_8_4', name: 'Totem de l’Hibou Sage', requiredSum: 8, cost: 11, type: 'cumulative', effect: 'Dès que vous obtenez un Quintuple, ajoutez +2 Précision permanente sur la Face 6.' },
  { id: 'eq_8_5', name: 'Heaume du Mammouth', requiredSum: 8, cost: 12, type: 'combat', effect: 'La Force n’est pas arrondie si elle dépasse 20 (prend la valeur exacte).' },
  { id: 'eq_8_6', name: 'Cape de l’Ours Brun', requiredSum: 8, cost: 8, type: 'immediate', effect: 'Ajoutez +2 Force sur les Faces 2 et 6.' },
  { id: 'eq_8_7', name: 'Bottes de Roc', requiredSum: 8, cost: 9, type: 'permanent', effect: 'Les dés affichant 2 ne peuvent pas être annulés par les effets de Boss.' },
  { id: 'eq_8_8', name: 'Brassards d’Ours Polaire', requiredSum: 8, cost: 10, type: 'combat', effect: 'Ajoutez +3 Force et +2 Précision sur la Combinaison Double Paire.' },
  { id: 'eq_8_9', name: 'Bourse d’Ours Gourmand', requiredSum: 8, cost: 11, type: 'permanent', effect: 'Gagnez +1 Or sur toutes les Combinaisons finales.' },
  { id: 'eq_8_10', name: 'Masse Lourde de l’Ours', requiredSum: 8, cost: 12, type: 'combat', effect: 'Ajoutez +5 Force si tous vos dés sont supérieurs ou égaux à 3.' },

  // Sum 9
  { id: 'eq_9_1', name: 'Épaulettes du Sanglier', requiredSum: 9, cost: 12, type: 'combat', effect: 'Avec une Paire comme Combinaison finale, ajoutez +1 à cette Combinaison.' },
  { id: 'eq_9_2', name: 'Bouclier Miroir d’Athéna', requiredSum: 9, cost: 12, type: 'combat', effect: 'Doublez les points de Précision apportés par votre Combinaison finale.' },
  { id: 'eq_9_3', name: 'Cuirasse de Ronces', requiredSum: 9, cost: 11, type: 'permanent', effect: 'Chaque combat réussi rapporte 3 Or de plus.' },
  { id: 'eq_9_4', name: 'Dague de Frappe Sournoise', requiredSum: 9, cost: 10, type: 'combat', effect: 'Ajoutez +4 Précision si vous utilisez exactement 3 dés dans votre Combinaison.' },
  { id: 'eq_9_5', name: 'Couronne de Sanglier Royal', requiredSum: 9, cost: 13, type: 'cumulative', effect: 'Chaque Victoire contre un Boss ajoute +2 Force et +2 Précision sur le Full.' },
  { id: 'eq_9_6', name: 'Manteau de Brume', requiredSum: 9, cost: 9, type: 'permanent', effect: 'Vous pouvez relancer 1 dé supplémentaire lors des visites chez les Marchands.' },
  { id: 'eq_9_7', name: 'Lame Courbe du Faucheur', requiredSum: 9, cost: 11, type: 'combat', effect: 'Ajoutez +3 Force sur les dés 5 et 6.' },
  { id: 'eq_9_8', name: 'Talisman de Sanglier Furieux', requiredSum: 9, cost: 10, type: 'immediate', effect: 'Ajoutez +3 Force sur la Face 5 et gagnez 10 Or.' },
  { id: 'eq_9_9', name: 'Jambières d’Acier Lourd', requiredSum: 9, cost: 9, type: 'permanent', effect: 'Votre seuil de Victoire Critique est réduit de 10%.' },
  { id: 'eq_9_10', name: 'Anneau de Ferveur Martiale', requiredSum: 9, cost: 12, type: 'combat', effect: 'Ajoutez +5 Force si vous n’avez utilisé aucune Relance.' },

  // Sum 10
  { id: 'eq_10_1', name: 'Pendentif Sylvestre', requiredSum: 10, cost: 15, type: 'combat', effect: 'Gagnez +10 Puissance si au moins 3 Faces ont plus de 5 points de Force.' },
  { id: 'eq_10_2', name: 'Heaume du Griffon Doré', requiredSum: 10, cost: 14, type: 'combat', effect: 'Ajoutez +5 Précision si votre Combinaison est un Full ou un Carré.' },
  { id: 'eq_10_3', name: 'Bottes des Sept Lieues', requiredSum: 10, cost: 13, type: 'permanent', effect: 'Gagnez 1 Relance supplémentaire à chaque combat de l’Acte 3.' },
  { id: 'eq_10_4', name: 'Ailes de Séraphin', requiredSum: 10, cost: 15, type: 'cumulative', effect: 'Chaque Victoire Critique ajoute +1 Précision permanente sur toutes les Combinaisons.' },
  { id: 'eq_10_5', name: 'Cœur de Dragon Éteint', requiredSum: 10, cost: 16, type: 'immediate', effect: 'Ajoutez +2 Force sur toutes les Faces de dés.' },
  { id: 'eq_10_6', name: 'Plastron de Platine', requiredSum: 10, cost: 13, type: 'combat', effect: 'Ajoutez +4 Force et +3 Précision sur la Combinaison Carré.' },
  { id: 'eq_10_7', name: 'Bague de l’Archonte', requiredSum: 10, cost: 14, type: 'permanent', effect: 'Tous les articles chez le Scribe et l’Apothicaire coûtent 2 Or de moins.' },
  { id: 'eq_10_8', name: 'Arc Court des Elfes Noirs', requiredSum: 10, cost: 12, type: 'combat', effect: 'Ajoutez +4 Précision sur les dés de valeur 4 et 5.' },
  { id: 'eq_10_9', name: 'Lanterne des Âmes Errantes', requiredSum: 10, cost: 14, type: 'cumulative', effect: 'À chaque Sbire vaincu, gagnez 2 Or dans votre Bourse.' },
  { id: 'eq_10_10', name: 'Sceptre de Domination', requiredSum: 10, cost: 15, type: 'combat', effect: 'Doublez la Force de la Face la plus élevée de votre jet final.' },

  // Sum 11
  { id: 'eq_11_1', name: 'Sceau Primordial des Tempêtes', requiredSum: 11, cost: 14, type: 'combat', effect: 'Ajoutez +6 Force sur la Combinaison Quintuple et Carré.' },
  { id: 'eq_11_2', name: 'Manteau de l’Ombre Suprême', requiredSum: 11, cost: 13, type: 'permanent', effect: 'Vous pouvez relancer un dé après la phase de combat si vous avez raté le seuil.' },
  { id: 'eq_11_3', name: 'Bouclier du Dragon Noir', requiredSum: 11, cost: 15, type: 'combat', effect: 'Annule l’effet néfaste du Boss adverse.' },
  { id: 'eq_11_4', name: 'Amulette d’Infini Pouvoir', requiredSum: 11, cost: 16, type: 'cumulative', effect: 'Chaque Relance inutilisée ajoute définitivement +1 Or à la Bourse.' },
  { id: 'eq_11_5', name: 'Glaive Stellaire des Titans', requiredSum: 11, cost: 15, type: 'immediate', effect: 'Ajoutez +3 Force et +3 Précision sur la Combinaison Full.' },
  { id: 'eq_11_6', name: 'Diadème d’Émeraude Royale', requiredSum: 11, cost: 13, type: 'permanent', effect: 'Chaque Victoire rapporte le double d’Or provenant des dés.' },
  { id: 'eq_11_7', name: 'Bottes de Téléportation', requiredSum: 11, cost: 12, type: 'combat', effect: 'Vous pouvez relancer n’importe quel dé une fois supplémentaire.' },
  { id: 'eq_11_8', name: 'Corbeau Messager d’Odin', requiredSum: 11, cost: 14, type: 'permanent', effect: 'Obtenez 1 Coffre supplémentaire lors du premier combat de chaque Acte.' },
  { id: 'eq_11_9', name: 'Armure de Force Brute', requiredSum: 11, cost: 13, type: 'combat', effect: 'La Force totale de vos dés est augmentée de 5 points.' },
  { id: 'eq_11_10', name: 'Calice Sacré d’Immortalité', requiredSum: 11, cost: 15, type: 'immediate', effect: 'Ajoutez +2 sur chaque Face de dé (au choix Force, Précision ou Or).' },

  // Sum 12
  { id: 'eq_12_1', name: 'Couronne Impériale des Rois', requiredSum: 12, cost: 16, type: 'permanent', effect: 'Votre Puissance est augmentée de 20% lors de tous les combats de Boss.' },
  { id: 'eq_12_2', name: 'Orbe Cosmique de l’Infini', requiredSum: 12, cost: 17, type: 'cumulative', effect: 'Chaque combat gagné ajoute +1 Force et +1 Précision sur la Face 6.' },
  { id: 'eq_12_3', name: 'Épée Vorpale Légendaire', requiredSum: 12, cost: 16, type: 'combat', effect: 'Si vous obtenez un Carré ou un Quintuple, votre Puissance est multipliée par 1.5.' },
  { id: 'eq_12_4', name: 'Armure Divine du Phénix', requiredSum: 12, cost: 18, type: 'immediate', effect: 'Gagnez 35 Or et ajoutez +3 Force sur toutes les Combinaisons.' },
  { id: 'eq_12_5', name: 'Grimoire du Dieu Oublié', requiredSum: 12, cost: 15, type: 'combat', effect: 'Ajoutez +6 Précision sur la Combinaison Quintuple.' },
  { id: 'eq_12_6', name: 'Bague des Douze Étoiles', requiredSum: 12, cost: 16, type: 'permanent', effect: 'La valeur maximale de Force et Précision par Face passe de 20 à 25.' },
  { id: 'eq_12_7', name: 'Relique du Commencement', requiredSum: 12, cost: 15, type: 'cumulative', effect: 'Chaque équipement acheté chez Marie-Agnès ajoute +1 Force permanente à la Face 1.' },
  { id: 'eq_12_8', name: 'Ailes de Feu Ardent', requiredSum: 12, cost: 14, type: 'combat', effect: 'Ajoutez +5 Force si au moins deux dés affichent la valeur 6.' },
  { id: 'eq_12_9', name: 'Bouclier de la Création', requiredSum: 12, cost: 17, type: 'permanent', effect: 'Ignorez la règle de l’arrondi de Force à la dizaine inférieure.' },
  { id: 'eq_12_10', name: 'Perle des Abîmes Célestes', requiredSum: 12, cost: 15, type: 'immediate', effect: 'Gagnez 40 Or et ajoutez +2 Précision sur toutes les Faces.' }
];

// 36 Potions & Fioles for L'Apothicaire
export const APOTHECARY_CATALOG: ApothecaryItem[] = [
  // Die 1 (Paire)
  { id: 'ap_1_1', name: 'Fiole Amplifiée', dieRequired: 1, targetCombo: 'paire', cost: 9, bonusType: 'force_and_precision', bonusValue: 1, description: 'Ajoute +1 Force et +1 Précision à la Paire.' },
  { id: 'ap_1_2', name: 'Décoction de Belladone', dieRequired: 1, targetCombo: 'paire', cost: 5, bonusType: 'force', bonusValue: 1, description: 'Ajoute +1 Force à la Combinaison Paire.' },
  { id: 'ap_1_3', name: 'Larmes d’Ondine', dieRequired: 1, targetCombo: 'paire', cost: 4, bonusType: 'precision', bonusValue: 1, description: 'Ajoute +1 Précision à la Combinaison Paire.' },
  { id: 'ap_1_4', name: 'Sirop de Bourgeon Sauvage', dieRequired: 1, targetCombo: 'paire', cost: 3, bonusType: 'gold', bonusValue: 1, description: 'Ajoute +1 Or à la Combinaison Paire.' },
  { id: 'ap_1_5', name: 'Alcool de Cuivre Trempé', dieRequired: 1, targetCombo: 'paire', cost: 8, bonusType: 'force', bonusValue: 2, description: 'Ajoute +2 Force à la Combinaison Paire.' },
  { id: 'ap_1_6', name: 'Essence de Trèfle Céleste', dieRequired: 1, targetCombo: 'paire', cost: 7, bonusType: 'precision', bonusValue: 2, description: 'Ajoute +2 Précision à la Combinaison Paire.' },

  // Die 2 (Double Paire)
  { id: 'ap_2_1', name: 'Breuvage Irradiant', dieRequired: 2, targetCombo: 'double_paire', cost: 6, bonusType: 'force', bonusValue: 1, description: 'Ajoute +1 Force à la Double Paire.' },
  { id: 'ap_2_2', name: 'Teinture de Chimère', dieRequired: 2, targetCombo: 'double_paire', cost: 7, bonusType: 'precision', bonusValue: 1, description: 'Ajoute +1 Précision à la Double Paire.' },
  { id: 'ap_2_3', name: 'Huile de Serpent Biliaire', dieRequired: 2, targetCombo: 'double_paire', cost: 8, bonusType: 'force_and_precision', bonusValue: 1, description: 'Ajoute +1 Force et +1 Précision à la Double Paire.' },
  { id: 'ap_2_4', name: 'Infusion de Miel Royal', dieRequired: 2, targetCombo: 'double_paire', cost: 4, bonusType: 'gold', bonusValue: 1, description: 'Ajoute +1 Or à la Double Paire.' },
  { id: 'ap_2_5', name: 'Poudre d’Aiguille Lunaire', dieRequired: 2, targetCombo: 'double_paire', cost: 10, bonusType: 'precision', bonusValue: 2, description: 'Ajoute +2 Précision à la Double Paire.' },
  { id: 'ap_2_6', name: 'Vin de Basilic Rouge', dieRequired: 2, targetCombo: 'double_paire', cost: 9, bonusType: 'force', bonusValue: 2, description: 'Ajoute +2 Force à la Double Paire.' },

  // Die 3 (Brelan)
  { id: 'ap_3_1', name: 'Mixture Trouble', dieRequired: 3, targetCombo: 'brelan', cost: 3, bonusType: 'precision', bonusValue: 1, description: 'Ajoute +1 Précision au Brelan.' },
  { id: 'ap_3_2', name: 'Brume de Dragonnet', dieRequired: 3, targetCombo: 'brelan', cost: 6, bonusType: 'force', bonusValue: 1, description: 'Ajoute +1 Force à la Combinaison Brelan.' },
  { id: 'ap_3_3', name: 'Nectar du Trépied Arcanique', dieRequired: 3, targetCombo: 'brelan', cost: 8, bonusType: 'force_and_precision', bonusValue: 1, description: 'Ajoute +1 Force et +1 Précision au Brelan.' },
  { id: 'ap_3_4', name: 'Sève de Fer Noire', dieRequired: 3, targetCombo: 'brelan', cost: 9, bonusType: 'force', bonusValue: 2, description: 'Ajoute +2 Force à la Combinaison Brelan.' },
  { id: 'ap_3_5', name: 'Essence de Nyx Obscure', dieRequired: 3, targetCombo: 'brelan', cost: 7, bonusType: 'precision', bonusValue: 2, description: 'Ajoute +2 Précision à la Combinaison Brelan.' },
  { id: 'ap_3_6', name: 'Potion de l’Avare Rusé', dieRequired: 3, targetCombo: 'brelan', cost: 4, bonusType: 'gold', bonusValue: 1, description: 'Ajoute +1 Or à la Combinaison Brelan.' },

  // Die 4 (Parité)
  { id: 'ap_4_1', name: 'Philtre Supérieur', dieRequired: 4, targetCombo: 'parite', cost: 7, bonusType: 'force_and_precision', bonusValue: 1, description: 'Ajoute +1 Force et +1 Précision à la Parité.' },
  { id: 'ap_4_2', name: 'Liqueur Géométrique', dieRequired: 4, targetCombo: 'parite', cost: 5, bonusType: 'precision', bonusValue: 1, description: 'Ajoute +1 Précision à la Combinaison Parité.' },
  { id: 'ap_4_3', name: 'Vinaigre des Quatre Vents', dieRequired: 4, targetCombo: 'parite', cost: 6, bonusType: 'force', bonusValue: 1, description: 'Ajoute +1 Force à la Combinaison Parité.' },
  { id: 'ap_4_4', name: 'Rosée d’Harmonie Astrale', dieRequired: 4, targetCombo: 'parite', cost: 10, bonusType: 'precision', bonusValue: 2, description: 'Ajoute +2 Précision à la Combinaison Parité.' },
  { id: 'ap_4_5', name: 'Baume de l’Équilibriste', dieRequired: 4, targetCombo: 'parite', cost: 9, bonusType: 'force', bonusValue: 2, description: 'Ajoute +2 Force à la Combinaison Parité.' },
  { id: 'ap_4_6', name: 'Onguent d’Or Pur', dieRequired: 4, targetCombo: 'parite', cost: 5, bonusType: 'gold', bonusValue: 1, description: 'Ajoute +1 Or à la Combinaison Parité.' },

  // Die 5 (Full)
  { id: 'ap_5_1', name: 'Potion Puissante', dieRequired: 5, targetCombo: 'full', cost: 8, bonusType: 'force', bonusValue: 1, description: 'Ajoute +1 Force à la Combinaison Full.' },
  { id: 'ap_5_2', name: 'Panacée Alchimique', dieRequired: 5, targetCombo: 'full', cost: 10, bonusType: 'force_and_precision', bonusValue: 1, description: 'Ajoute +1 Force et +1 Précision au Full.' },
  { id: 'ap_5_3', name: 'Sérum de Clairvoyance', dieRequired: 5, targetCombo: 'full', cost: 7, bonusType: 'precision', bonusValue: 1, description: 'Ajoute +1 Précision à la Combinaison Full.' },
  { id: 'ap_5_4', name: 'Extrait de Titan', dieRequired: 5, targetCombo: 'full', cost: 11, bonusType: 'force', bonusValue: 2, description: 'Ajoute +2 Force à la Combinaison Full.' },
  { id: 'ap_5_5', name: 'Distillat d’Astre Solaire', dieRequired: 5, targetCombo: 'full', cost: 9, bonusType: 'precision', bonusValue: 2, description: 'Ajoute +2 Précision à la Combinaison Full.' },
  { id: 'ap_5_6', name: 'Cuve du Pactole', dieRequired: 5, targetCombo: 'full', cost: 6, bonusType: 'gold', bonusValue: 2, description: 'Ajoute +2 Or à la Combinaison Full.' },

  // Die 6 (Carré ou Quintuple)
  { id: 'ap_6_1', name: 'Élixir Fugace', dieRequired: 6, targetCombo: 'carre', cost: 1, bonusType: 'force', bonusValue: 1, description: 'Ajoute +1 Force à la Combinaison Carré.' },
  { id: 'ap_6_2', name: 'Essence du Quintuple Primordial', dieRequired: 6, targetCombo: 'quintuple', cost: 6, bonusType: 'force_and_precision', bonusValue: 1, description: 'Ajoute +1 Force et +1 Précision au Quintuple.' },
  { id: 'ap_6_3', name: 'Poudre d’Aiguillon Carré', dieRequired: 6, targetCombo: 'carre', cost: 5, bonusType: 'precision', bonusValue: 1, description: 'Ajoute +1 Précision à la Combinaison Carré.' },
  { id: 'ap_6_4', name: 'Larmes de Phénix Écarlates', dieRequired: 6, targetCombo: 'quintuple', cost: 8, bonusType: 'force', bonusValue: 2, description: 'Ajoute +2 Force au Quintuple.' },
  { id: 'ap_6_5', name: 'Eau-de-vie de Comète', dieRequired: 6, targetCombo: 'carre', cost: 7, bonusType: 'precision', bonusValue: 2, description: 'Ajoute +2 Précision au Carré.' },
  { id: 'ap_6_6', name: 'Teinture d’Opulence Suprême', dieRequired: 6, targetCombo: 'quintuple', cost: 5, bonusType: 'gold', bonusValue: 2, description: 'Ajoute +2 Or au Quintuple.' }
];

// 24 Manuscripts & Scrolls for Le Scribe Sans-Visage
export const SCRIBE_CATALOG: ScribeItem[] = [
  // Face 1
  { id: 'sc_1_1', name: 'Fragment Ancien', dieRequired: 1, targetFace: 1, cost: 6, bonusType: 'force', bonusValue: 1, description: 'Ajoute +1 Force à la Face 1.' },
  { id: 'sc_1_2', name: 'Manuscrit de l’Unité', dieRequired: 1, targetFace: 1, cost: 7, bonusType: 'precision', bonusValue: 1, description: 'Ajoute +1 Précision à la Face 1.' },
  { id: 'sc_1_3', name: 'Tract d’Orfèvre', dieRequired: 1, targetFace: 1, cost: 5, bonusType: 'gold', bonusValue: 1, description: 'Ajoute +1 Or à la Face 1.' },
  { id: 'sc_1_4', name: 'Glyphe d’Origine', dieRequired: 1, targetFace: 1, cost: 11, bonusType: 'force', bonusValue: 2, description: 'Ajoute +2 Force à la Face 1.' },

  // Face 2
  { id: 'sc_2_1', name: 'Enchantement Interdit', dieRequired: 2, targetFace: 2, cost: 13, bonusType: 'precision', bonusValue: 1, description: 'Ajoute +1 Précision à la Face 2.' },
  { id: 'sc_2_2', name: 'Chant des Gémeaux', dieRequired: 2, targetFace: 2, cost: 8, bonusType: 'force', bonusValue: 1, description: 'Ajoute +1 Force à la Face 2.' },
  { id: 'sc_2_3', name: 'Parchemin Mercantil', dieRequired: 2, targetFace: 2, cost: 6, bonusType: 'gold', bonusValue: 1, description: 'Ajoute +1 Or à la Face 2.' },
  { id: 'sc_2_4', name: 'Sceau de la Dualité', dieRequired: 2, targetFace: 2, cost: 12, bonusType: 'force', bonusValue: 2, description: 'Ajoute +2 Force à la Face 2.' },

  // Face 3
  { id: 'sc_3_1', name: 'Parchemin Ultime', dieRequired: 3, targetFace: 3, cost: 16, bonusType: 'force', bonusValue: 2, description: 'Ajoute +2 Force à la Face 3.' },
  { id: 'sc_3_2', name: 'Tome de la Trinité', dieRequired: 3, targetFace: 3, cost: 9, bonusType: 'precision', bonusValue: 1, description: 'Ajoute +1 Précision à la Face 3.' },
  { id: 'sc_3_3', name: 'Écrit du Sphinx', dieRequired: 3, targetFace: 3, cost: 7, bonusType: 'gold', bonusValue: 1, description: 'Ajoute +1 Or à la Face 3.' },
  { id: 'sc_3_4', name: 'Rune des Trois Flèches', dieRequired: 3, targetFace: 3, cost: 14, bonusType: 'precision', bonusValue: 2, description: 'Ajoute +2 Précision à la Face 3.' },

  // Face 4
  { id: 'sc_4_1', name: 'Vélin Oublié', dieRequired: 4, targetFace: 4, cost: 5, bonusType: 'precision', bonusValue: 1, description: 'Ajoute +1 Précision à la Face 4.' },
  { id: 'sc_4_2', name: 'Pacte des Quatre Piliers', dieRequired: 4, targetFace: 4, cost: 8, bonusType: 'force', bonusValue: 1, description: 'Ajoute +1 Force à la Face 4.' },
  { id: 'sc_4_3', name: 'Codex du Quadrant', dieRequired: 4, targetFace: 4, cost: 6, bonusType: 'gold', bonusValue: 1, description: 'Ajoute +1 Or à la Face 4.' },
  { id: 'sc_4_4', name: 'Gravure Tellurique', dieRequired: 4, targetFace: 4, cost: 10, bonusType: 'force', bonusValue: 2, description: 'Ajoute +2 Force à la Face 4.' },

  // Face 5
  { id: 'sc_5_1', name: 'Rouleau Primordial', dieRequired: 5, targetFace: 5, cost: 15, bonusType: 'force', bonusValue: 2, description: 'Ajoute +2 Force à la Face 5.' },
  { id: 'sc_5_2', name: 'Grimoire du Pentacle', dieRequired: 5, targetFace: 5, cost: 10, bonusType: 'precision', bonusValue: 1, description: 'Ajoute +1 Précision à la Face 5.' },
  { id: 'sc_5_3', name: 'Papyrus Doré', dieRequired: 5, targetFace: 5, cost: 7, bonusType: 'gold', bonusValue: 1, description: 'Ajoute +1 Or à la Face 5.' },
  { id: 'sc_5_4', name: 'Édit Céleste', dieRequired: 5, targetFace: 5, cost: 13, bonusType: 'precision', bonusValue: 2, description: 'Ajoute +2 Précision à la Face 5.' },

  // Face 6
  { id: 'sc_6_1', name: 'Sceau Occulte', dieRequired: 6, targetFace: 6, cost: 11, bonusType: 'precision', bonusValue: 1, description: 'Ajoute +1 Précision à la Face 6.' },
  { id: 'sc_6_2', name: 'Livre des Hexagones', dieRequired: 6, targetFace: 6, cost: 9, bonusType: 'force', bonusValue: 1, description: 'Ajoute +1 Force à la Face 6.' },
  { id: 'sc_6_3', name: 'Richesse du Maître', dieRequired: 6, targetFace: 6, cost: 8, bonusType: 'gold', bonusValue: 2, description: 'Ajoute +2 Or à la Face 6.' },
  { id: 'sc_6_4', name: 'Chronique Astrale Suprême', dieRequired: 6, targetFace: 6, cost: 16, bonusType: 'force', bonusValue: 2, description: 'Ajoute +2 Force à la Face 6.' }
];

// 6 Fioles Spéciales / Consommables Tactiques de l'Apothicaire
export const SPECIAL_POTIONS_CATALOG: SpecialPotion[] = [
  {
    id: 'sp_celerity',
    name: 'Fiole de Célérité',
    cost: 8,
    type: 'extra_rerolls',
    value: 2,
    effect: '+2 Relances immédiates pour ce combat.',
    description: 'Une décoction vive à base de plumes de faucon et de mercure distillé. Confère 2 relances supplémentaires gratuites.'
  },
  {
    id: 'sp_dragon_blood',
    name: 'Fiole de Sang de Dragon',
    cost: 12,
    type: 'dragon_blood',
    value: 5,
    effect: '+5 Force et ignore la règle d’arrondi à la dizaine dès 20.',
    description: 'Un fluide incandescent qui bouillonne dans sa fiole. Octroie une fureur brute et empêche tout arrondi vers le bas.'
  },
  {
    id: 'sp_astral_eye',
    name: 'Fiole de Vue Astrale',
    cost: 10,
    type: 'change_die',
    value: 1,
    effect: 'Permet de choisir la valeur exacte d’un dé de votre choix (1 à 6).',
    description: 'Une larme cristalline révélant les futurs possibles. Vous pouvez ajuster n’importe quel dé sur la face de votre choix.'
  },
  {
    id: 'sp_midas_transmute',
    name: 'Fiole de Transmutation Midas',
    cost: 7,
    type: 'double_gold',
    value: 2,
    effect: 'Double tout l’Or obtenu à l’issue de ce combat et ajoute +3 Précision.',
    description: 'Un précipité de poudre dorée qui bénit votre coup et enrichit considérablement votre Bourse.'
  },
  {
    id: 'sp_berserk_surge',
    name: 'Fiole de Résilience Berserk',
    cost: 14,
    type: 'clutch_power',
    value: 50,
    effect: 'Ajoute +50 de Puissance finale pour arracher la victoire.',
    description: 'L’élixir du désespoir. Déclenche une violente montée d’adrénaline ajoutant +50 points de Puissance.'
  },
  {
    id: 'sp_arcanic_purity',
    name: 'Élixir de Purité Arcanique',
    cost: 11,
    type: 'cancel_boss',
    value: 1,
    effect: 'Neutralise totalement le pouvoir néfaste du Boss adverse.',
    description: 'Une concoction sanctifiée qui brise les malédictions et annule l’entrave spéciale imposée par le Boss.'
  }
];

// Base values for Faces (1 to 6)
export const DEFAULT_FACE_VALUES: Record<number, FaceValue> = {
  1: { force: 1, precision: 0, gold: 1 },
  2: { force: 2, precision: 1, gold: 0 },
  3: { force: 1, precision: 2, gold: 1 },
  4: { force: 2, precision: 2, gold: 0 },
  5: { force: 3, precision: 1, gold: 2 },
  6: { force: 2, precision: 3, gold: 1 }
};

// Base values for Combos
export const DEFAULT_COMBO_VALUES: Record<CombinationType, ComboValue> = {
  paire: { force: 1, precision: 1, gold: 0 },
  double_paire: { force: 2, precision: 2, gold: 1 },
  brelan: { force: 2, precision: 3, gold: 1 },
  parite: { force: 3, precision: 3, gold: 2 },
  full: { force: 4, precision: 4, gold: 2 },
  carre: { force: 5, precision: 5, gold: 3 },
  quintuple: { force: 6, precision: 6, gold: 4 }
};

// Procedural Deterministic PRNG using Seed
function seededRandom(seedStr: string) {
  let h = 0x811c9dc5;
  for (let i = 0; i < seedStr.length; i++) {
    h ^= seedStr.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return function () {
    h = Math.imul(h ^ (h >>> 16), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return ((h ^= h >>> 16) >>> 0) / 4294967296;
  };
}

export function generateSeed(): string {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let seed = '';
  for (let i = 0; i < 28; i++) {
    seed += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return seed;
}

export function generateScenario(
  seed: string = generateSeed(),
  difficulty: 'Aventurier' | 'Expert' | 'Légendaire' | 'Cauchemar' = 'Aventurier',
  heroOverride?: Hero
): AdventureScenario {
  const rand = seededRandom(seed);

  const hero = heroOverride || HEROES_CATALOG[Math.floor(rand() * HEROES_CATALOG.length)];

  // Shuffle catalogs deterministically
  const shuffle = <T>(arr: T[]): T[] => {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  };

  const act1Bosses = shuffle(BOSSES_CATALOG.filter(b => b.act === 1));
  const act2Bosses = shuffle(BOSSES_CATALOG.filter(b => b.act === 2));
  const act3Bosses = shuffle(BOSSES_CATALOG.filter(b => b.act === 3));

  const act1Chests = shuffle(CHESTS_CATALOG.filter(c => c.act === 1));
  const act2Chests = shuffle(CHESTS_CATALOG.filter(c => c.act === 2));
  const act3Chests = shuffle(CHESTS_CATALOG.filter(c => c.act === 3));

  // Multiplier by difficulty
  const diffMultiplier = difficulty === 'Aventurier' ? 1.0 : difficulty === 'Expert' ? 1.25 : difficulty === 'Légendaire' ? 1.5 : 2.0;

  const act1Boss = {
    ...act1Bosses[0],
    powerThreshold: Math.round(act1Bosses[0].powerThreshold * diffMultiplier)
  };
  const act2Boss = {
    ...act2Bosses[0],
    powerThreshold: Math.round(act2Bosses[0].powerThreshold * diffMultiplier)
  };
  const act3Boss = {
    ...act3Bosses[0],
    powerThreshold: Math.round(act3Bosses[0].powerThreshold * diffMultiplier)
  };

  const act1Sbires = [
    { id: 's1_1', index: 1, act: 1 as const, powerThreshold: Math.round(25 * diffMultiplier), chest: act1Chests[0] },
    { id: 's1_2', index: 2, act: 1 as const, powerThreshold: Math.round(50 * diffMultiplier), chest: act1Chests[1] },
    { id: 's1_3', index: 3, act: 1 as const, powerThreshold: Math.round(75 * diffMultiplier), chest: act1Chests[2] }
  ];

  const act2Sbires = [
    { id: 's2_1', index: 1, act: 2 as const, powerThreshold: Math.round(200 * diffMultiplier), chest: act2Chests[0] },
    { id: 's2_2', index: 2, act: 2 as const, powerThreshold: Math.round(300 * diffMultiplier), chest: act2Chests[1] },
    { id: 's2_3', index: 3, act: 2 as const, powerThreshold: Math.round(400 * diffMultiplier), chest: act2Chests[2] }
  ];

  const act3Sbires = [
    { id: 's3_1', index: 1, act: 3 as const, powerThreshold: Math.round(800 * diffMultiplier), chest: act3Chests[0] },
    { id: 's3_2', index: 2, act: 3 as const, powerThreshold: Math.round(1100 * diffMultiplier), chest: act3Chests[1] },
    { id: 's3_3', index: 3, act: 3 as const, powerThreshold: Math.round(1400 * diffMultiplier), chest: act3Chests[2] }
  ];

  // Scribe Items: Select 1 item for each die value 1..6 from SCRIBE_CATALOG
  const scribeItems: ScribeItem[] = [1, 2, 3, 4, 5, 6].map(die => {
    const matching = SCRIBE_CATALOG.filter(s => s.dieRequired === die);
    const chosen = matching[Math.floor(rand() * matching.length)] || matching[0];
    return { ...chosen };
  });

  // Apothecary Items: Select 1 potion/fiole for each die value 1..6 from APOTHECARY_CATALOG
  const apothecaryItems: ApothecaryItem[] = [1, 2, 3, 4, 5, 6].map(die => {
    const matching = APOTHECARY_CATALOG.filter(a => a.dieRequired === die);
    const chosen = matching[Math.floor(rand() * matching.length)] || matching[0];
    return { ...chosen };
  });

  // Equipments for Marie-Agnès: 11 items for sums 2 to 12
  const equipments: Equipment[] = [];
  for (let sum = 2; sum <= 12; sum++) {
    const matching = EQUIPMENTS_CATALOG.filter(e => e.requiredSum === sum);
    const selected = matching[Math.floor(rand() * matching.length)] || matching[0];
    equipments.push(selected);
  }

  // Act titles generator
  const act1Themes = ['Échappée de la Champignonnière', 'Le Bosquet des Ombres', 'La Crypte des Gobelins', 'Les Marais Putrides'];
  const act2Themes = ['Chant Irrésistible de la Sirène', 'La Tour de Brume', 'Les Cavernes de Glace Vive', 'Les Abîmes Englouties'];
  const act3Themes = ['Convoitise du Dragon Cupide', 'La Cité Suspendue des Tempêtes', 'Le Sanctuaire du Néant', 'Le Volcan d’Obsidienne'];

  // Special Potions: Select 3 unique potions from SPECIAL_POTIONS_CATALOG for this adventure
  const shuffledSpecials = shuffle(SPECIAL_POTIONS_CATALOG);
  const specialPotions = shuffledSpecials.slice(0, 3);

  return {
    seed,
    difficulty,
    hero,
    act1: {
      title: act1Themes[Math.floor(rand() * act1Themes.length)],
      sbires: act1Sbires,
      boss: act1Boss
    },
    act2: {
      title: act2Themes[Math.floor(rand() * act2Themes.length)],
      sbires: act2Sbires,
      boss: act2Boss
    },
    act3: {
      title: act3Themes[Math.floor(rand() * act3Themes.length)],
      sbires: act3Sbires,
      boss: act3Boss
    },
    scribeItems,
    apothecaryItems,
    specialPotions,
    equipments
  };
}
