import { Rank } from './rank';
import { RankType } from './rankType';
import { Hand } from '../hand';

export class Straight implements Rank {
  rank = RankType.STRAIGHT;

  evaluate(hand: Hand) {
    return hand.isStraight;
  }
}
