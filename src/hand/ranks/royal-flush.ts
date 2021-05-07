import { Rank } from './rank';
import { RankType } from './rankType';
import { Hand } from '../hand';

export class RoyalFlush implements Rank {
  rank = RankType.ROYAL_FLUSH;

  evaluate(hand: Hand) {
    return hand.isFlush && hand.isAceStraight;
  }
}
