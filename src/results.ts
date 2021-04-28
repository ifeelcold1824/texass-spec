import { TexassClientStatus } from './texass-client';
import { ERROR_MSG } from './constant';
import { PlayerId } from './player';

export const resultsCalculator = (
  status: TexassClientStatus,
  handValues: Map<PlayerId, number>,
) => {
  if (status.gameOver != true) {
    throw Error(ERROR_MSG.GAME_IS_RUNNING);
  }

  const sortedHandValue = buildSortedHandValueMap(handValues);
  const flatPool = buildFlatPool(status);
  const splitPool = buildSplitPool(flatPool);
  return assignPrize(splitPool, sortedHandValue, status);
};

const assignPrize = (
  splitPool: Map<number, PlayerId[]>,
  sortedHandValueMap: PlayerId[][],
  status: TexassClientStatus,
) => {
  const prizePool = new Map(
    [...status.players.keys()].map((playerId) => [playerId, 0]),
  );
  splitPool.forEach((playersCanShare, amount) => {
    let sharePlayers = [];
    let index = 0;
    while (sharePlayers.length === 0 && index < sortedHandValueMap.length) {
      const winPlayer = sortedHandValueMap[index];
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

const buildFlatPool = (status: TexassClientStatus) => {
  const flatPool = new Map(
    [...status.players.keys()].map((playerId) => [playerId, 0]),
  );
  status.pool.forEach((roundPool) => {
    roundPool.forEach((value, player) => {
      flatPool.set(player, flatPool.get(player) + value);
    });
  });

  return flatPool;
};

const buildSortedHandValueMap = (handValues: Map<PlayerId, number>) => {
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
