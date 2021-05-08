import { RankChecker } from '../rank-checker';
import { RankType } from '../rank-type';
import { Hand } from '../hand';

export class FourOfAKind extends RankChecker {
  protected rankType = RankType.FOUR_OF_A_KIND;

  protected checkFn(hand: Hand): boolean {
    return (
      hand.cardRanks.size === 2 && Math.max(...hand.cardRanks.values()) === 4
    );
  }
}
