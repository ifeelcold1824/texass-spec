import { Rank } from './rank';
import { RankType } from './rankType';
import { Hand } from '../hand';

export class Pair implements Rank {
  rank = RankType.PAIR;

  evaluate(hand: Hand) {
    return (
      hand.cardRanks.size === 4 && Math.max(...hand.cardRanks.values()) === 2
    );
  }
}
