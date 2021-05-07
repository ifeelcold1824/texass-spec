import { Rank } from '../rank';
import { RankType } from '../rank-type';
import { Hand } from '../hand';

export class StraightFlush implements Rank {
  rank = RankType.STRAIGHT_FLUSH;

  check(hand: Hand) {
    return hand.isStraight && hand.isFlush;
  }
}
