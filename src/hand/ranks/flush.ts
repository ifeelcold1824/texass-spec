import { Rank } from '../rank';
import { Hand } from '../hand';

export class Flush extends Rank {
  readonly value = 5;
  protected validateFn(hand: Hand): boolean {
    return hand.isFlush;
  }
}
