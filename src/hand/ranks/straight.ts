import { Rank } from '../rank';
import { Hand } from '../hand';

export class Straight extends Rank {
  readonly value = 4;

  protected validateFn(hand: Hand): boolean {
    return hand.isStraight;
  }
}
