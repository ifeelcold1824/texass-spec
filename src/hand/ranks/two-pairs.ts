import { Rank } from './rank';
import { RankType } from './rankType';
import { Hand } from '../hand';

export class TwoPairs implements Rank {
  rank = RankType.TWO_PAIRS;

  evaluate(hand: Hand) {
    return (
      hand.cardRanks.size === 3 && Math.max(...hand.cardRanks.values()) === 2
    );
  }
}
