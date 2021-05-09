import { Rank } from '../rank';

export class HighCard extends Rank {
  readonly value = 0;
  protected validateFn() {
    return true;
  }
}
