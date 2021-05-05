import { Round } from '../round';
import { Player } from '../player';
import { Action } from './action';

export class AllIn extends Action {
  protected executeFn(round: Round, player: Player) {
    round.betToPool(player, player.balance + round.pool.get(player));
    player.status = 'ALLIN';
  }

  protected validate() {
    return true;
  }
}
