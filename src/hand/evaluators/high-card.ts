import {RankEvaluator} from "./rank-evaluator";
import {Rank} from "./rank";
import {Hand} from "../hand";

export class HighCard implements RankEvaluator {
  rank = Rank.HIGH_CARD

  evaluate(hand: Hand) {
    return true
  }
}
