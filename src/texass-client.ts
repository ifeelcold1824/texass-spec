import { Player } from './player.interface';
import { ERROR_MSG, Round } from './constant';

export class TexassClient {
  players: Player[];
  round: Round;

  constructor(players: Player[]) {
    if (players.length < 2 || players.length > 10) {
      throw Error(ERROR_MSG.INVALID_PLAYER_NUMBER);
    }
    this.players = players;
    this.round = Round.PRE_FLOP;
  }
}
