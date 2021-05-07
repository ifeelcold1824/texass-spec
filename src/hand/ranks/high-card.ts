import { Rank } from './rank';
import { RankType } from './rankType';

export class HighCard implements Rank {
  rank = RankType.HIGH_CARD;

  evaluate() {
    return true;
  }
}
