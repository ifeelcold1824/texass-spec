import {RankEvaluator} from "./rank-evaluator";
import {Rank} from "./rank";
import {Hand} from "../hand";

export class Flush implements RankEvaluator {
  rank = Rank.FLUSH

  evaluate(hand: Hand) {
    return hand.isFlush
  }
}
