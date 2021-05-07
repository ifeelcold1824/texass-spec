import {RankEvaluator} from "./rank-evaluator";
import {Rank} from "./rank";
import {Hand} from "../hand";

export class FullHouse implements RankEvaluator {
  rank = Rank.FULL_HOUSE

  evaluate(hand: Hand) {
    return hand.cardRanks.size === 2 && Math.max(...hand.cardRanks.values()) === 3
  }
}
