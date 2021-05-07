import {RankEvaluator} from "./rank-evaluator";
import {Rank} from "./rank";
import {Hand} from "../hand";

export class ThreeOfAKind implements RankEvaluator {
  rank = Rank.THREE_OF_A_KIND

  evaluate(hand: Hand) {
    return hand.cardRanks.size === 3 && Math.max(...hand.cardRanks.values()) === 3
  }
}
