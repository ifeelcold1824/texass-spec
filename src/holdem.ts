import { Player } from './player';
import { HoldemRound, Round } from './round';
import { Action } from './action';

export class Holdem {
  gameOver = false;
  rounds: Round[];

  constructor(public players: Player[]) {
    this.rounds = [new Round(this.players, HoldemRound.PRE_FLOP)];
  }

  execute(action: Action) {
    this.currentRound.execute(action);

    if (this.currentRound.isRoundOver) {
      this.nextRound();
    }
    this.checkGameOver();
  }

  get currentRound() {
    return this.rounds[0];
  }

  get pool() {
    return this.rounds
      .map((it) => it.pool)
      .reduce((accumulator, current) => {
        [...current.entries()].map(([player, bid]) => {
          accumulator.set(player, (accumulator.get(player) || 0) + bid);
        });
        return accumulator;
      });
  }

  private checkGameOver() {
    this.gameOver = this.isPlayerLeftLessThan1 || this.isInvalidRound;
  }

  private nextRound() {
    this.rounds.unshift(new Round(this.players, this.currentRound.roundId + 1));
  }

  private get isPlayerLeftLessThan1() {
    return this.currentRound.activePlayers.length <= 1;
  }

  private get isInvalidRound() {
    return this.currentRound.roundId > 4;
  }
}
