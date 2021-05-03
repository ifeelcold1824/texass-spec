import { PlayerId } from './player';
import { TexassRound } from './constant';

export const resultsCalculator = (
  handValues: Map<PlayerId, number>,
  pool: Map<TexassRound, Map<PlayerId, number>>,
) => {
  const flatPool = buildFlatPool(pool);
  const splitPool = buildSplitPool(flatPool);
  return assignPrize(splitPool, handValues);
};

const assignPrize = (
  splitPool: Map<number, PlayerId[]>,
  handValues: Map<PlayerId, number>,
) => {
  const prizePool = new Map([...handValues.entries()].map(([id]) => [id, 0]));
  const sortedHandValue = buildSortedHandValue(handValues);

  splitPool.forEach((playersCanShare, amount) => {
    let sharePlayers = [];
    let index = 0;
    while (sharePlayers.length === 0 && index < sortedHandValue.length) {
      const winPlayer = sortedHandValue[index];
      sharePlayers = playersCanShare.filter((p) => winPlayer.includes(p));
      index += 1;
    }
    const eachShare = amount / sharePlayers.length;
    sharePlayers.forEach((p) => {
      prizePool.set(p, prizePool.get(p) + eachShare);
    });
  });

  return prizePool;
};

const buildSplitPool = (flatPool: Map<PlayerId, number>) => {
  const splitPool: Map<number, PlayerId[]> = new Map();
  flatPool.forEach((value, key) => {
    if (value === 0) {
      flatPool.delete(key);
    }
  });
  let largerThan0 = [...flatPool.values()].filter((v) => v > 0);
  while (largerThan0.length > 0) {
    let sum = 0;
    const playerInPool = [];
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

const buildFlatPool = (pool: Map<TexassRound, Map<PlayerId, number>>) => {
  const flatPool = new Map<PlayerId, number>();
  pool.forEach((roundPool) => {
    roundPool.forEach((value, player) => {
      flatPool.set(
        player,
        (flatPool.get(player) ? flatPool.get(player) : 0) + value,
      );
    });
  });

  return flatPool;
};

const buildSortedHandValue = (handValues: Map<PlayerId, number>) => {
  const handValueMap: Map<number, PlayerId[]> = new Map();
  handValues.forEach((value, playId) => {
    if (handValueMap.has(value)) {
      handValueMap.get(value).push(playId);
    } else {
      handValueMap.set(value, [playId]);
    }
  });
  return [...handValueMap.entries()]
    .sort((a, b) => b[0] - a[0])
    .map((it) => it[1]);
};
