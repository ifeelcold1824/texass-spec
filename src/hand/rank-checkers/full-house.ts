import { RankChecker } from '../rank-checker';
import { RankType } from '../rank-type';
import { Hand } from '../hand';

export class FullHouse extends RankChecker {
  protected rankType = RankType.FULL_HOUSE;

  protected checkFn(hand: Hand): boolean {
    return (
      hand.cardRanks.size === 2 && Math.max(...hand.cardRanks.values()) === 3
    );
  }
}
