import { Hand } from '../hand';
import { Rank } from '../rank';

export class TwoPairs extends Rank {
  readonly value = 2;

  protected validateFn(hand: Hand): boolean {
    return hand.distinctCardRanks.length === 3 && hand.maxCardOccur === 2;
  }
}
