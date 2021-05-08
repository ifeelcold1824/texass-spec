import { RankChecker } from '../rank-checker';
import { RankType } from '../rank-type';
import { Hand } from '../hand';

export class TwoPairs extends RankChecker {
  protected rankType = RankType.TWO_PAIRS;

  protected checkFn(hand: Hand): boolean {
    return (
      hand.cardRanks.size === 3 && Math.max(...hand.cardRanks.values()) === 2
    );
  }
}
