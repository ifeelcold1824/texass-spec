import { Round } from '../round';
import { Player } from '../player';
import { Action } from './action';

export class Fold extends Action {
  protected executeFn(round: Round, player: Player) {
    player.inactive();
  }

  protected validate() {
    return true;
  }
}
