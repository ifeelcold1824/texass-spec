import { RankChecker } from '../rank-checker';
import { RankType } from '../rank-type';
import { Hand } from '../hand';

export class ThreeOfAKind extends RankChecker {
  protected rankType = RankType.THREE_OF_A_KIND;

  protected checkFn(hand: Hand): boolean {
    return (
      hand.cardRanks.size === 3 && Math.max(...hand.cardRanks.values()) === 3
    );
  }
}
