import { Round } from '../round';
import { Player } from '../player';
import { Action } from './action';

export class Bet extends Action {
  protected executeFn(round: Round, player: Player) {
    round.betToPool(
      player,
      round.currentBet ? round.currentBet : round.minWager,
    );
    round.activePlayers.push(player);
  }

  protected validate(round: Round, player: Player) {
    return player.has(round.currentBet - round.getBidOfPlayer(player));
  }
}
