import {RankEvaluator} from "./rank-evaluator";
import {Rank} from "./rank";
import {Hand} from "../hand";

export class StraightFlush implements RankEvaluator {
  rank = Rank.STRAIGHT_FLUSH

  evaluate(hand: Hand) {
    return hand.isStraight && hand.isFlush
  }
}
