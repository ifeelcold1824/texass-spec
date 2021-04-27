import { Player, PlayerId } from './player';
import { ERROR_MSG, TexassRound } from './constant';
import { ActionType } from './ActionType';

export interface TexassClientStatus {
  gameOver: boolean;
  round: TexassRound;
  waitingPlayers: PlayerId[];
  actedPlayers: PlayerId[];
  actionPlayer: PlayerId;
  remainingPlayers: PlayerId[];
  players: Player[];
  availableActions: ActionType[];
  pool: Map<TexassRound, Map<PlayerId, number>>;
}

export interface TexassClientSettings {
  bigBlind: number;
  smallBlind: number;
}

export const defaultSetting = {
  bigBlind: 20,
  smallBlind: 10,
};

export class TexassClient {
  constructor(
    readonly status: TexassClientStatus,
    private readonly settings: TexassClientSettings = defaultSetting,
  ) {}

  activePlayerAction(action: ActionType, amount?: number) {
    if (this.status.gameOver) {
      throw Error(ERROR_MSG.GAME_OVER);
    }

    if (!this.status.availableActions.includes(action)) {
      throw Error(ERROR_MSG.INVALID_ACTION);
    }

    switch (action) {
      case ActionType.FOLD:
        this.status.remainingPlayers = this.status.remainingPlayers.filter(
          (i) => i != this.status.actionPlayer,
        );
        break;
      case ActionType.BET:
        break;
      case ActionType.CALL:
        this.status.actedPlayers.push(this.status.actionPlayer);
        break;
      case ActionType.CHECK:
        this.status.actedPlayers.push(this.status.actionPlayer);
        break;
      case ActionType.RAISE:
        this.status.actedPlayers.push(this.status.actionPlayer);
        break;
      case ActionType.ALL_IN:
        this.status.actedPlayers.push(this.status.actionPlayer);
        break;
    }

    this.status.actionPlayer = this.status.waitingPlayers.shift();
    this.checkGameOver();
    this.checkAndSwitchRound();
    return this.status;
  }

  private checkGameOver() {
    if (this.status.remainingPlayers.length <= 1) {
      this.status.gameOver = true;
    }
  }

  private checkAndSwitchRound() {
    if (!this.status.actionPlayer) {
      this.status.round += 1;
      if (this.status.round < 5) {
        this.refreshStatusOnRoundChange();
      } else {
        this.status.gameOver = true;
      }
    }
  }

  private refreshStatusOnRoundChange() {
    const players = [...this.status.remainingPlayers];
    this.status.actionPlayer = players.shift();
    this.status.waitingPlayers = players;
    this.status.actedPlayers = [];
  }
}
