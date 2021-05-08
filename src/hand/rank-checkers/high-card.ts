import { RankChecker } from '../rank-checker';
import { RankType } from '../rank-type';

export class HighCard extends RankChecker {
  protected rankType = RankType.HIGH_CARD;

  protected checkFn() {
    return true;
  }
}
