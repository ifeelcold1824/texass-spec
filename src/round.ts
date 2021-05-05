import { Player } from './player';
import { Action } from './action';

export class Round {
  pool: Map<Player, number> = new Map();
  currentBet = 0;
  activePlayers: Player[];

  constructor(private players: Player[], public roundId: HoldemRound) {
    this.initRound();
  }

  execute(action: Action) {
    action.execute(this, this.activePlayers.shift());
  }

  betToPool(player: Player, bid: number) {
    player.pay(bid - this.pool.get(player));
    this.pool.set(player, bid);
    this.currentBet = bid;
  }

  get actionPlayer() {
    return this.activePlayers[0];
  }

  get minWager() {
    return 10;
  }

  get isRoundOver() {
    return (
      Array.from(this.pool.entries())
        .filter(([player]) => player.isActive)
        .filter(([, bet]) => bet < this.currentBet).length === 0
    );
  }

  get isFinalRound() {
    return this.roundId === HoldemRound.TURN;
  }

  private initRound() {
    this.activePlayers = this.players.filter((player) => player.isActive);
    this.currentBet = 0;
    this.pool = new Map(this.activePlayers.map((player) => [player, null]));
  }
}

export enum HoldemRound {
  PRE_FLOP = 1,
  FLOP = 2,
  TURN = 3,
  RIVER = 4,
}
