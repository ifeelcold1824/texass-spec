import { RankType } from './rank-type';
import { CardRank } from '../deck/card';

export class Rank {
  constructor(readonly type: RankType, readonly scoringCardRanks: CardRank[]) {}

  diff(rank: Rank) {
    if (this.type !== rank.type) {
      return this.type - rank.type;
    }
    return this.diffCardArrayRecur(
      this.scoringCardRanks,
      rank.scoringCardRanks,
    );
  }

  private diffCardArrayRecur(a: CardRank[], b: CardRank[], index = 0): number {
    if (index > a.length) {
      return 0;
    }
    if (a[index] !== b[index]) {
      return a[index] - b[index];
    }
    return this.diffCardArrayRecur(a, b, index + 1);
  }
}
