import { Rank } from '../rank';
import { RankType } from '../rank-type';

export class HighCard implements Rank {
  rank = RankType.HIGH_CARD;

  check() {
    return true;
  }
}
