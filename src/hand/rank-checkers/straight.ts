import { RankChecker } from '../rank-checker';
import { RankType } from '../rank-type';
import { Hand } from '../hand';

export class Straight extends RankChecker {
  protected rankType = RankType.STRAIGHT;

  protected checkFn(hand: Hand): boolean {
    return hand.isStraight;
  }
}
