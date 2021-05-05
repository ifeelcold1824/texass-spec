import { Round } from '../round';
import { Player } from '../player';
import { Action } from './action';

export class Check extends Action {
  protected executeFn(round: Round, player: Player) {
    round.activePlayers.push(player);
  }

  protected validate(round: Round) {
    return round.currentBet === 0;
  }
}
