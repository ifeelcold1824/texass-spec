import { Rank } from './rank';
import { RankType } from './rankType';
import { Hand } from '../hand';

export class StraightFlush implements Rank {
  rank = RankType.STRAIGHT_FLUSH;

  evaluate(hand: Hand) {
    return hand.isStraight && hand.isFlush;
  }
}
