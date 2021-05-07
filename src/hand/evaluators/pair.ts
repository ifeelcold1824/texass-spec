import { RankEvaluator } from './rank-evaluator';
import { Rank } from './rank';
import { Hand } from '../hand';

export class Pair implements RankEvaluator {
  rank = Rank.PAIR;

  evaluate(hand: Hand) {
    return (
      hand.cardRanks.size === 4 && Math.max(...hand.cardRanks.values()) === 2
    );
  }
}
