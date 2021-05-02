import { Player, PlayerId } from './player';
import { ActionType, ERROR_MSG, TexassRound } from './constant';

export interface TexassClientStatus {
  gameOver: boolean;
  round: TexassRound;
  waitingPlayers: Player[];
  players: Map<PlayerId, Player>;
  pool: Map<TexassRound, Map<PlayerId, number>>;
  currentBet: number;
}

export class Holdem {
  constructor(readonly status: TexassClientStatus) {}

  static initFromPlayers(...players: Player[]) {
    const status: TexassClientStatus = {
      gameOver: false,
      round: TexassRound.PRE_FLOP,
      waitingPlayers: [...players],
      players: new Map(players.map((player) => [player.id, player])),
      pool: Holdem.initPool(players),
      currentBet: 0,
    };
    return new Holdem(status);
  }

  get actionPlayer() {
    return this.status.waitingPlayers[0];
  }

  action(playerId: PlayerId, action: ActionType, amount?: number) {
    if (this.status.gameOver) {
      throw Error(ERROR_MSG.GAME_OVER);
    }

    if (this.status.waitingPlayers[0].id != playerId) {
      throw Error(ERROR_MSG.NOT_YOUR_TURN);
    }

    this.status.waitingPlayers.shift();
    const player = this.status.players.get(playerId);

    switch (action) {
      case ActionType.FOLD:
        player.status = 'OUT';
        break;
      case ActionType.CHECK:
        this.status.waitingPlayers.push(player);
        this.amendPayAndUpdatePool(player, 0);
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
        this.status.waitingPlayers.push(player);
        break;
      case ActionType.RAISE:
        if (typeof amount != 'number' || amount <= this.status.currentBet) {
          throw Error(ERROR_MSG.INVALID_BET_AMOUNT);
        }
        this.amendPayAndUpdatePool(player, amount);
        this.updateCurrentBetAndRotate(amount);
        this.status.waitingPlayers.push(player);
        break;
      case ActionType.ALL_IN:
        const allinAmount =
          this.status.pool.get(this.status.round).get(player.id) +
          player.balance;
        this.amendPayAndUpdatePool(player, allinAmount);
        this.updateCurrentBetAndRotate(allinAmount);
        player.status = 'ALLIN';
        break;
    }

    if (
      Array.from(this.status.pool.get(this.status.round).entries())
        .filter(([player]) =>
          this.status.waitingPlayers.map((it) => it.id).includes(player),
        )
        .filter(([, bet]) => bet < this.status.currentBet || !bet).length === 0
    ) {
      this.switchRound();
    }
    this.checkGameOver();
    return this.status;
  }

  private updateCurrentBetAndRotate(newBet: number) {
    if (newBet > this.status.currentBet) {
      this.status.currentBet = newBet;
    }
  }

  private amendPayAndUpdatePool(player: Player, amount: number) {
    const paid = this.status.pool.get(this.status.round).get(player.id);
    player.pay(amount - paid);
    this.status.pool.get(this.status.round).set(player.id, amount);
  }

  private checkGameOver() {
    const playerLeftLessThan1 = this.status.waitingPlayers.length <= 1;

    const AllPlayersAllin =
      Array.from(this.status.players.values()).filter(
        (it) => it.status !== 'ALLIN',
      ).length === 0;

    // this.status.allinPlayers.length === this.status.players.size;
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
    this.status.waitingPlayers = Array.from(
      this.status.players.values(),
    ).filter((it) => it.status === 'ACTIVE');
    this.status.currentBet = 0;
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
        new Map(players.map((player) => [player.id, null])),
      ]),
    );
  }
}
