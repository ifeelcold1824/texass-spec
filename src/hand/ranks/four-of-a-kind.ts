import { Rank } from '../rank';
import { Hand } from '../hand';

export class FourOfAKind extends Rank {
  readonly value = 7;
  protected validateFn(hand: Hand): boolean {
    return hand.distinctCardRanks.length === 2 && hand.maxCardOccur === 4;
  }
}
