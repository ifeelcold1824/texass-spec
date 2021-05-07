import {RankEvaluator} from "./rank-evaluator";
import {Rank} from "./rank";
import {Hand} from "../hand";

export class Straight implements RankEvaluator {
  rank = Rank.STRAIGHT

  evaluate(hand: Hand) {
    return hand.isStraight
  }
}
