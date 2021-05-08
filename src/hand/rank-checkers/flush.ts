import { RankChecker } from '../rank-checker';
import { RankType } from '../rank-type';
import { Hand } from '../hand';

export class Flush extends RankChecker {
  protected rankType = RankType.FLUSH;

  protected checkFn(hand: Hand): boolean {
    return hand.isFlush;
  }
}
