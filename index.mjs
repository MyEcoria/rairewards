import lunchReward from './start/reward.mjs';

// Fonction pour lancer lunchReward
const runLunchReward = () => {
  console.log('Lancement de lunchReward.');
  lunchReward();
};

// Lancer la fonction immédiatement
runLunchReward();

// Planifier l'exécution toutes les 24 heures
const interval = 24 * 60 * 60 * 1000; // 24 heures en millisecondes
setInterval(runLunchReward, interval);