import { RankChecker } from '../rank-checker';
import { RankType } from '../rank-type';
import { Hand } from '../hand';

export class Pair extends RankChecker {
  protected rankType = RankType.PAIR;

  protected checkFn(hand: Hand): boolean {
    return (
      hand.cardRanks.size === 4 && Math.max(...hand.cardRanks.values()) === 2
    );
  }
}
