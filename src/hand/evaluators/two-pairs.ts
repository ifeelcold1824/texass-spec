import { RankEvaluator } from './rank-evaluator';
import { Rank } from './rank';
import { Hand } from '../hand';

export class TwoPairs implements RankEvaluator {
  rank = Rank.TWO_PAIRS;

  evaluate(hand: Hand) {
    return (
      hand.cardRanks.size === 3 && Math.max(...hand.cardRanks.values()) === 2
    );
  }
}
