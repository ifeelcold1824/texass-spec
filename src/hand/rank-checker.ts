import { RankType } from './rank-type';
import { Hand } from './hand';
import { Rank } from './rank';

export abstract class RankChecker {
  protected abstract rankType: RankType;

  protected abstract checkFn(hand: Hand): boolean;

  check(hand: Hand) {
    if (this.checkFn(hand)) {
      return new Rank(this.rankType, [...hand.cardRanks.keys()]);
    }
    return undefined;
  }
}
