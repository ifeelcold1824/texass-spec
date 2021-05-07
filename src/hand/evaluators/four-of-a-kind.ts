import {RankEvaluator} from "./rank-evaluator";
import {Rank} from "./rank";
import {Hand} from "../hand";

export
class FourOfAKind implements RankEvaluator {
  rank = Rank.FOUR_OF_A_KIND

  evaluate(hand: Hand) {
    return hand.cardRanks.size === 2 && Math.max(...hand.cardRanks.values()) === 4
  }
}
