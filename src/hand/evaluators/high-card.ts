import { RankEvaluator } from './rank-evaluator';
import { Rank } from './rank';

export class HighCard implements RankEvaluator {
  rank = Rank.HIGH_CARD;

  evaluate() {
    return true;
  }
}
