import { Round } from './round';
import { Player } from './player';

export interface Action {
  execute(round: Round, player: Player);
}

export class Fold implements Action {
  execute(round: Round, player: Player) {
    player.inactive();
  }
}

export class Check implements Action {
  execute(round: Round, player: Player) {
    round.activePlayers.push(player);
  }
}

export class Bet implements Action {
  execute(round: Round, player: Player) {
    round.betToPool(
      player,
      round.currentBet ? round.currentBet : round.minWager,
    );
    round.activePlayers.push(player);
  }
}

export class Raise implements Action {
  constructor(private readonly amount: number) {}
  execute(round: Round, player: Player) {
    round.betToPool(player, round.currentBet + this.amount);
    round.activePlayers.push(player);
  }
}
