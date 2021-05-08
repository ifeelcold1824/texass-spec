import { PlayerId } from './player';

export const resultsCalculator = (
  handValues: Map<PlayerId, number>,
  pool: Map<PlayerId, number>,
) => {
  const splitPool = buildSplitPool(pool);
  return assignPrize(splitPool, handValues);
};

const assignPrize = (
  splitPool: Map<number, PlayerId[]>,
  handValues: Map<PlayerId, number>,
) => {
  const prizePool = new Map([...handValues.entries()].map(([id]) => [id, 0]));
  const sortedHandValue = buildSortedHandValue(handValues);

  splitPool.forEach((playersCanShare, amount) => {
    let sharePlayers: PlayerId[] = [];
    let index = 0;
    while (sharePlayers.length === 0 && index < sortedHandValue.length) {
      const winPlayer = sortedHandValue[index];
      sharePlayers = playersCanShare.filter((p) => winPlayer.includes(p));
      index += 1;
    }
    const eachShare = amount / sharePlayers.length;
    sharePlayers.forEach((p) => {
      prizePool.set(p, (prizePool.get(p) || 0) + eachShare);
    });
  });

  return prizePool;
};

const buildSplitPool = (flatPool: Map<PlayerId, number>) => {
  const splitPool: Map<number, PlayerId[]> = new Map();
  let largerThan0 = [...flatPool.values()].filter((v) => v > 0);
  while (largerThan0.length > 0) {
    let sum = 0;
    const playerInPool: PlayerId[] = [];
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

const buildSortedHandValue = (handValues: Map<PlayerId, number>) => {
  const handValueMap: Map<number, PlayerId[]> = new Map();
  handValues.forEach((value, playId) => {
    const playerList = handValueMap.get(value) || [];
    playerList.push(playId);
    handValueMap.set(value, playerList);
  });
  return [...handValueMap.entries()]
    .sort((a, b) => b[0] - a[0])
    .map((it) => it[1]);
};
