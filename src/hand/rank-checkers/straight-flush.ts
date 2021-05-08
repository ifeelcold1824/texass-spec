import { RankChecker } from '../rank-checker';
import { RankType } from '../rank-type';
import { Hand } from '../hand';

export class StraightFlush extends RankChecker {
  protected rankType = RankType.STRAIGHT_FLUSH;

  protected checkFn(hand: Hand): boolean {
    return hand.isStraight && hand.isFlush;
  }
}
