import { RankEvaluator } from './rank-evaluator';
import { Rank } from './rank';
import { Hand } from '../hand';

export class RoyalFlush implements RankEvaluator {
  rank = Rank.ROYAL_FLUSH;

  evaluate(hand: Hand) {
    return hand.isFlush && hand.isAceStraight;
  }
}
