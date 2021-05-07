import { Rank } from '../rank';
import { RankType } from '../rank-type';
import { Hand } from '../hand';

export class Straight implements Rank {
  rank = RankType.STRAIGHT;

  check(hand: Hand) {
    return hand.isStraight;
  }
}
