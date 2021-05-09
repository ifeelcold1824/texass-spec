import { Rank } from '../rank';
import { Hand } from '../hand';

export class RoyalFlush extends Rank {
  readonly value = 9;

  protected validateFn(hand: Hand): boolean {
    return hand.isFlush && hand.isAceStraight;
  }
}
