import { Rank } from '../rank';
import { RankType } from '../rank-type';
import { Hand } from '../hand';

export class Flush implements Rank {
  rank = RankType.FLUSH;

  check(hand: Hand) {
    return hand.isFlush;
  }
}
