import { Rank } from '../rank';
import { Hand } from '../hand';

export class Pair extends Rank {
  readonly value = 1;
  protected validateFn(hand: Hand): boolean {
    return hand.distinctCardRanks.length === 4 && hand.maxCardOccur === 2;
  }
}
