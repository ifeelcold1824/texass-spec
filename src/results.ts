import { Player } from './player';

export const buildSplitPool = (flatPool: Map<Player, number>) => {
  const splitPool: Map<number, Player[]> = new Map();
  let largerThan0 = [...flatPool.values()].filter((v) => v > 0);
  while (largerThan0.length > 0) {
    let sum = 0;
    const playerInPool: Player[] = [];
    const minValue = Math.min(...largerThan0);
    flatPool.forEach((value, player) => {
      if (value != 0) {
        flatPool.set(player, value - minValue);
        sum += minValue;
        playerInPool.push(player);
      }
    });
    splitPool.set(sum, playerInPool);
    largerThan0 = [...flatPool.values()].filter((v) => v > 0);
  }
  return splitPool;
};
