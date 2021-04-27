import { Player } from './player.interface';
import { ERROR_MSG, TexassStatus } from './constant';

export class TexassClient {
  round: TexassStatus = TexassStatus.PRE_FLOP;
  waitingPlayers: Player[];
  playersActed: Player[];
  actionPlayer: Player;

  constructor(private readonly players: Player[]) {
    if (players.length < 2 || players.length > 10) {
      throw Error(ERROR_MSG.INVALID_PLAYER_COUNT);
    }
    this.initRound();
  }

  activePlayerAction() {
    if (this.round === TexassStatus.END) {
      throw Error(ERROR_MSG.GAME_OVER);
    }

    this.playersActed.push(this.actionPlayer);
    this.actionPlayer = this.waitingPlayers.shift();
    this.checkAndSwitchRound();
  }

  private checkAndSwitchRound() {
    if (!this.actionPlayer) {
      this.round += 1;
      this.initRound();
    }
  }

  private initRound() {
    const players = [...this.players];
    this.actionPlayer = players.shift();
    this.waitingPlayers = players;
    this.playersActed = [];
  }
}
