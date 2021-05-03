import { Player, PlayerId } from './player';
import { ActionType, ERROR_MSG, HoldemRound } from './constant';

export class Holdem {
  gameOver = false;
  round: HoldemRound = HoldemRound.PRE_FLOP;
  waitingPlayers: Player[];
  players: Player[];
  pool: Map<HoldemRound, Map<PlayerId, number>> = new Map();
  currentBet = 0;

  constructor(...players: Player[]) {
    this.players = players;
    this.initRound();
  }

  get actionPlayer() {
    return this.waitingPlayers[0];
  }

  action(action: ActionType, amount?: number) {
    if (this.gameOver) {
      throw Error(ERROR_MSG.GAME_OVER);
    }

    const player = this.waitingPlayers.shift();
    let bet: number = this.currentBet;

    switch (action) {
      case ActionType.FOLD:
        bet = 0;
        player.status = 'OUT';
        break;
      case ActionType.CHECK:
        bet = 0;
        this.waitingPlayers.push(player);
        break;
      case ActionType.CALL:
        if (player.blindBet) {
          bet = player.blindBet;
          delete player.blindBet;
        } else {
          if (this.currentBet === 0) {
            if (amount < 0) {
              throw new Error(ERROR_MSG.INVALID_BET_AMOUNT);
            }
            bet = amount;
          }
        }
        this.waitingPlayers.push(player);
        break;
      case ActionType.RAISE:
        if (typeof amount != 'number' || amount < 0) {
          throw Error(ERROR_MSG.INVALID_BET_AMOUNT);
        }
        bet = amount + this.currentBet;
        this.waitingPlayers.push(player);
        break;
      case ActionType.ALL_IN:
        bet = this.pool.get(this.round).get(player.id) + player.balance;
        player.status = 'ALLIN';
        break;
    }

    this.amendPayAndUpdatePool(player, bet);
    this.updateCurrentBet(bet);

    this.checkGameOver();
    if (this.roundOver) {
      this.switchRound();
    }
    return this;
  }

  private get roundOver() {
    return (
      Array.from(this.pool.get(this.round).entries())
        .filter(([player]) =>
          this.waitingPlayers.map((it) => it.id).includes(player),
        )
        .filter(([, bet]) => bet < this.currentBet || !bet).length === 0
    );
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
    this.gameOver = this.waitingPlayers.length <= 1;
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
    this.waitingPlayers = this.players.filter((it) => it.status === 'ACTIVE');
    this.currentBet = 0;
    this.pool.set(
      this.round,
      new Map(this.waitingPlayers.map((it) => [it.id, null])),
    );
  }
}
