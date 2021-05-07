import { Rank } from '../rank';
import { RankType } from '../rank-type';
import { Hand } from '../hand';

export class RoyalFlush implements Rank {
  rank = RankType.ROYAL_FLUSH;

  check(hand: Hand) {
    return hand.isFlush && hand.isAceStraight;
  }
}
