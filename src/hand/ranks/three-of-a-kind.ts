import { Rank } from './rank';
import { RankType } from './rankType';
import { Hand } from '../hand';

export class ThreeOfAKind implements Rank {
  rank = RankType.THREE_OF_A_KIND;

  evaluate(hand: Hand) {
    return (
      hand.cardRanks.size === 3 && Math.max(...hand.cardRanks.values()) === 3
    );
  }
}
