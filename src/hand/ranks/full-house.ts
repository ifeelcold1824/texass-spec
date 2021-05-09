import { Rank } from '../rank';
import { Hand } from '../hand';

export class FullHouse extends Rank {
  readonly value = 6;
  protected validateFn(hand: Hand): boolean {
    return hand.distinctCardRanks.length === 2 && hand.maxCardOccur === 3;
  }
}
