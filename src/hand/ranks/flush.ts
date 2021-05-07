import { Rank } from './rank';
import { RankType } from './rankType';
import { Hand } from '../hand';

export class Flush implements Rank {
  rank = RankType.FLUSH;

  evaluate(hand: Hand) {
    return hand.isFlush;
  }
}
