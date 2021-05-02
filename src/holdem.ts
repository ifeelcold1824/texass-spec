import { Player, PlayerId } from './player';
import { ActionType, ERROR_MSG, TexassRound } from './constant';

export interface TexassClientStatus {
  gameOver: boolean;
  round: TexassRound;
  waitingPlayers: PlayerId[];
  actedPlayers: PlayerId[];
  actionPlayer: PlayerId;
  exitPlayers: PlayerId[];
  allinPlayers: PlayerId[];
  players: Map<PlayerId, Player>;
  availableActions: Map<ActionType, boolean>;
  pool: Map<TexassRound, Map<PlayerId, number>>;
  currentBet: number;
}

export class Holdem {
  constructor(readonly status: TexassClientStatus) {}

  static initFromPlayers(players: Player[]) {
    const splitPlayers: Player[] = [...players];
    const firstPlayer = splitPlayers.shift();
    const status: TexassClientStatus = {
      gameOver: false,
      round: TexassRound.PRE_FLOP,
      waitingPlayers: splitPlayers.map(({ id }) => id),
      actedPlayers: [],
      actionPlayer: firstPlayer.id,
      exitPlayers: [],
      allinPlayers: [],
      players: new Map(players.map((player) => [player.id, player])),
      availableActions: Holdem.buildAvailableActions(
        false,
        false,
        true,
        false,
        false,
      ),
      pool: Holdem.initPool(players),
      currentBet: 0,
    };
    return new Holdem(status);
  }

  action(playerId: PlayerId, action: ActionType, amount?: number) {
    if (this.status.gameOver) {
      throw Error(ERROR_MSG.GAME_OVER);
    }

    if (this.status.actionPlayer != playerId) {
      throw Error(ERROR_MSG.NOT_YOUR_TURN);
    }

    if (!this.status.availableActions.get(action)) {
      throw Error(ERROR_MSG.INVALID_ACTION);
    }
    const player = this.status.players.get(playerId);

    switch (action) {
      case ActionType.FOLD:
        this.status.exitPlayers.push(player.id);
        break;
      case ActionType.CHECK:
        this.status.actedPlayers.push(player.id);
        break;
      case ActionType.CALL:
        let callAmount = this.status.currentBet;
        if (player.blindBet) {
          callAmount = player.blindBet;
          delete player.blindBet;
        } else {
          if (this.status.currentBet === 0) {
            if (amount < 0) {
              throw new Error(ERROR_MSG.INVALID_BET_AMOUNT);
            }
            callAmount = amount;
          }
        }
        this.amendPayAndUpdatePool(player, callAmount);
        this.updateCurrentBetAndRotate(callAmount);
        this.status.actedPlayers.push(player.id);
        break;
      case ActionType.RAISE:
        if (typeof amount != 'number' || amount <= this.status.currentBet) {
          throw Error(ERROR_MSG.INVALID_BET_AMOUNT);
        }
        this.amendPayAndUpdatePool(player, amount);
        this.updateCurrentBetAndRotate(amount);
        this.status.actedPlayers.push(player.id);
        break;
      case ActionType.ALL_IN:
        const allinAmount =
          this.status.pool.get(this.status.round).get(player.id) +
          player.balance;
        this.amendPayAndUpdatePool(player, allinAmount);
        this.updateCurrentBetAndRotate(allinAmount);
        this.status.allinPlayers.push(player.id);
        break;
    }

    this.status.actionPlayer = this.status.waitingPlayers.shift();
    if (this.status.actionPlayer) {
      this.refreshAvailableActions(
        this.status.players.get(this.status.actionPlayer),
      );
    } else {
      this.switchRound();
    }
    this.checkGameOver();
    return this.status;
  }

  private updateCurrentBetAndRotate(newBet: number) {
    if (newBet > this.status.currentBet) {
      this.status.waitingPlayers = [
        ...this.status.waitingPlayers,
        ...this.status.actedPlayers,
      ];
      this.status.actedPlayers = [];
      this.status.currentBet = newBet;
    }
  }

  private refreshAvailableActions(player: Player) {
    if (player.blindBet) {
      this.status.availableActions = Holdem.buildAvailableActions(
        false,
        false,
        true,
        false,
        false,
      );
    } else {
      this.status.availableActions = Holdem.buildAvailableActions(
        true,
        this.status.currentBet === 0,
        player.balance > this.status.currentBet,
        player.balance > this.status.currentBet,
        true,
      );
    }
  }

  private amendPayAndUpdatePool(player: Player, amount: number) {
    const paid = this.status.pool.get(this.status.round).get(player.id);
    player.pay(amount - paid);
    this.status.pool.get(this.status.round).set(player.id, amount);
  }

  private checkGameOver() {
    const playerLeftLessThan1 =
      this.status.players.size - this.status.exitPlayers.length <= 1;

    const AllPlayersAllin =
      this.status.allinPlayers.length === this.status.players.size;
    if (playerLeftLessThan1 || AllPlayersAllin) {
      this.status.gameOver = true;
    }
  }

  private switchRound() {
    this.status.round += 1;
    if (this.status.round < 5) {
      this.refreshStatusOnRoundChange();
    } else {
      this.status.gameOver = true;
    }
  }

  private refreshStatusOnRoundChange() {
    const remainingPlayers = Array.from(this.status.players, (item) => item[0])
      .filter((p) => !this.status.exitPlayers.includes(p))
      .filter((p) => !this.status.allinPlayers.includes(p));
    this.status.actionPlayer = remainingPlayers.shift();
    this.status.waitingPlayers = remainingPlayers;
    this.status.actedPlayers = [];
    this.status.currentBet = 0;
    this.status.availableActions = Holdem.buildAvailableActions(
      true,
      true,
      true,
      false,
      true,
    );
  }

  private static buildAvailableActions(
    canFold: boolean,
    canCheck: boolean,
    canCall: boolean,
    canRaise: boolean,
    canAllin: boolean,
  ) {
    return new Map([
      [ActionType.FOLD, canFold],
      [ActionType.CHECK, canCheck],
      [ActionType.CALL, canCall],
      [ActionType.RAISE, canRaise],
      [ActionType.ALL_IN, canAllin],
    ]);
  }

  private static initPool(players: Player[]) {
    const rounds = [
      TexassRound.PRE_FLOP,
      TexassRound.FLOP,
      TexassRound.TURN,
      TexassRound.RIVER,
    ];
    return new Map(
      rounds.map((round) => [
        round,
        new Map(players.map((player) => [player.id, 0])),
      ]),
    );
  }
}
