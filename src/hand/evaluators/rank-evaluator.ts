import {Rank} from "./rank";
import {Hand} from "../hand";

export interface RankEvaluator{
  rank: Rank

  evaluate(hand: Hand): boolean
}
