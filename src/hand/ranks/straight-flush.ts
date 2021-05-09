import { Rank } from '../rank';
import { Hand } from '../hand';

export class StraightFlush extends Rank {
  readonly value = 8;

  protected validateFn(hand: Hand): boolean {
    return hand.isStraight && hand.isFlush;
  }
}
