import { Round } from '../round';
import { Player } from '../player';
import { Action } from './action';

export class Raise extends Action {
  constructor(private readonly amount: number) {
    super();
  }

  protected executeFn(round: Round, player: Player) {
    round.betToPool(player, round.currentBet + this.amount);
    round.activePlayers.push(player);
  }

  protected validate(round: Round, player: Player) {
    return (
      this.amount > 0 &&
      player.has(round.currentBet + this.amount - round.getBidOfPlayer(player))
    );
  }
}
