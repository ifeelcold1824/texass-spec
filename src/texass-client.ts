import { Player } from './player.interface';
import { ERROR_MSG } from './constant';

export class TexassClient {
  players: Player[];

  constructor(players: Player[]) {
    if (players.length < 2 || players.length > 10) {
      throw Error(ERROR_MSG.INVALID_PLAYER_NUMBER);
    }
    this.players = players;
  }
}
