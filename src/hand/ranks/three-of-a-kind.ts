import { Hand } from '../hand';
import { Rank } from '../rank';

export class ThreeOfAKind extends Rank {
  readonly value = 3;

  protected validateFn(hand: Hand): boolean {
    return hand.distinctCardRanks.length === 3 && hand.maxCardOccur === 3;
  }
}
