import { Player } from './player';
import { ActionType, ERROR_MSG } from './constant';
import { HoldemRound, Round } from './round';

export class Holdem {
  gameOver = false;
  rounds: Round[];

  constructor(public players: Player[]) {
    this.rounds = [new Round(this.players, HoldemRound.PRE_FLOP)];
  }
  get round() {
    return this.rounds[0];
  }
  get pool() {
    return new Map(this.rounds.map((it) => [it.name, it.pool]));
  }

  get actionPlayer() {
    return this.round.activePlayers[0];
  }

  action(action: ActionType, amount?: number) {
    if (this.gameOver) {
      throw Error(ERROR_MSG.GAME_OVER);
    }
    switch (action) {
      case ActionType.FOLD:
        this.round.fold();
        break;
      case ActionType.CHECK:
        this.round.check();
        break;
      case ActionType.BET:
        this.round.bet();
        break;
      case ActionType.RAISE:
        this.round.raise(amount);
        break;
    }

    this.checkGameOver();
    if (this.roundOver) {
      this.switchRound();
    }
    return this;
  }

  private get roundOver() {
    return (
      Array.from(this.round.pool.entries())
        .filter(([player]) => this.round.activePlayers.includes(player))
        .filter(([, bet]) => bet < this.round.currentBet || !bet).length === 0
    );
  }

  private checkGameOver() {
    this.gameOver = this.round.activePlayers.length <= 1;
  }

  private switchRound() {
    if (this.round.isLastRound) {
      this.gameOver = true;
    } else {
      this.rounds.unshift(new Round(this.players, this.round.name + 1));
    }
  }
}
