import { Rank } from './rank';
import { RankType } from './rankType';
import { Hand } from '../hand';

export class FullHouse implements Rank {
  rank = RankType.FULL_HOUSE;

  evaluate(hand: Hand) {
    return (
      hand.cardRanks.size === 2 && Math.max(...hand.cardRanks.values()) === 3
    );
  }
}
