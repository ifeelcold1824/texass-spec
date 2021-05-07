import { Rank } from '../rank';
import { RankType } from '../rank-type';
import { Hand } from '../hand';

export class TwoPairs implements Rank {
  rank = RankType.TWO_PAIRS;

  check(hand: Hand) {
    return (
      hand.cardRanks.size === 3 && Math.max(...hand.cardRanks.values()) === 2
    );
  }
}
