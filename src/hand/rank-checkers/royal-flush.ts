import { RankChecker } from '../rank-checker';
import { RankType } from '../rank-type';
import { Hand } from '../hand';

export class RoyalFlush extends RankChecker {
  protected rankType = RankType.ROYAL_FLUSH;

  protected checkFn(hand: Hand): boolean {
    return hand.isFlush && hand.isAceStraight;
  }
}
