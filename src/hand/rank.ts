import { CardRank } from '../deck/card';
import { Hand } from './hand';
import { CompareTo } from '../utils/compare-to';
import { deepCompareNumericArray } from '../utils/array';

export type RankValue = number;

export abstract class Rank implements CompareTo {
  scoringCardRanks: CardRank[] = [];
  abstract readonly value: RankValue;
  constructor(private readonly hand: Hand) {}

  protected abstract validateFn(hand: Hand): boolean;

  isValid() {
    if (this.validateFn(this.hand)) {
      this.scoringCardRanks = this.hand.distinctCardRanks;
      return true;
    }
    return false;
  }

  compareTo(rank: Rank) {
    if (this.value !== rank.value) {
      return this.value - rank.value;
    }
    return deepCompareNumericArray(
      this.scoringCardRanks,
      rank.scoringCardRanks,
    );
  }
}
