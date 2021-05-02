import { Player, PlayerId } from './player';
import { ActionType, ERROR_MSG, TexassRound } from './constant';

export class Holdem {
  gameOver = false;
  round: TexassRound = TexassRound.PRE_FLOP;
  waitingPlayers: Player[];
  players: Map<PlayerId, Player>;
  pool: Map<TexassRound, Map<PlayerId, number>> = new Map();
  currentBet = 0;

  constructor(...players: Player[]) {
    this.players = new Map(players.map((player) => [player.id, player]));
    this.initRound();
  }

  get actionPlayer() {
    return this.waitingPlayers[0];
  }

  action(action: ActionType, amount?: number) {
    if (this.gameOver) {
      throw Error(ERROR_MSG.GAME_OVER);
    }

    const player = this.actionPlayer;
    this.waitingPlayers.shift();

    switch (action) {
      case ActionType.FOLD:
        player.status = 'OUT';
        break;
      case ActionType.CHECK:
        this.waitingPlayers.push(player);
        this.amendPayAndUpdatePool(player, 0);
        break;
      case ActionType.CALL:
        let callAmount = this.currentBet;
        if (player.blindBet) {
          callAmount = player.blindBet;
          delete player.blindBet;
        } else {
          if (this.currentBet === 0) {
            if (amount < 0) {
              throw new Error(ERROR_MSG.INVALID_BET_AMOUNT);
            }
            callAmount = amount;
          }
        }
        this.amendPayAndUpdatePool(player, callAmount);
        this.updateCurrentBet(callAmount);
        this.waitingPlayers.push(player);
        break;
      case ActionType.RAISE:
        if (typeof amount != 'number' || amount <= this.currentBet) {
          throw Error(ERROR_MSG.INVALID_BET_AMOUNT);
        }
        this.amendPayAndUpdatePool(player, amount);
        this.updateCurrentBet(amount);
        this.waitingPlayers.push(player);
        break;
      case ActionType.ALL_IN:
        const allinAmount =
          this.pool.get(this.round).get(player.id) + player.balance;
        this.amendPayAndUpdatePool(player, allinAmount);
        this.updateCurrentBet(allinAmount);
        player.status = 'ALLIN';
        break;
    }

    if (
      Array.from(this.pool.get(this.round).entries())
        .filter(([player]) =>
          this.waitingPlayers.map((it) => it.id).includes(player),
        )
        .filter(([, bet]) => bet < this.currentBet || !bet).length === 0
    ) {
      this.switchRound();
    }
    this.checkGameOver();
    return this;
  }

  private updateCurrentBet(newBet: number) {
    if (newBet > this.currentBet) {
      this.currentBet = newBet;
    }
  }

  private amendPayAndUpdatePool(player: Player, amount: number) {
    const paid = this.pool.get(this.round).get(player.id);
    player.pay(amount - paid);
    this.pool.get(this.round).set(player.id, amount);
  }

  private checkGameOver() {
    const playerLeftLessThan1 = this.waitingPlayers.length <= 1;
    if (playerLeftLessThan1) {
      this.gameOver = true;
    }
  }

  private switchRound() {
    this.round += 1;
    if (this.round < 5) {
      this.initRound();
    } else {
      this.gameOver = true;
    }
  }

  private initRound() {
    this.waitingPlayers = Array.from(this.players.values()).filter(
      (it) => it.status === 'ACTIVE',
    );
    this.currentBet = 0;
    this.pool.set(
      this.round,
      new Map(this.waitingPlayers.map((it) => [it.id, null])),
    );
  }
}
