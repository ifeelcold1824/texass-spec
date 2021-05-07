import { Rank } from './rank';
import { RankType } from './rankType';
import { Hand } from '../hand';

export class FourOfAKind implements Rank {
  rank = RankType.FOUR_OF_A_KIND;

  evaluate(hand: Hand) {
    return (
      hand.cardRanks.size === 2 && Math.max(...hand.cardRanks.values()) === 4
    );
  }
}
