import { Player } from './player';
import { Action } from './action/action';

export class Round {
  pool: Map<Player, number> = new Map();
  currentBet = 0;
  activePlayers: Player[];

  constructor(private players: Player[], public roundId: HoldemRound) {
    this.initRound();
  }

  execute(action: Action) {
    const player = this.activePlayers.shift();
    action.execute(this, player);
    player.actedInRound = true;
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
        .filter(([player, bet]) =>
          player.actedInRound ? bet < this.currentBet : true,
        ).length === 0
    );
  }

  get isFinalRound() {
    return this.roundId === HoldemRound.RIVER;
  }

  private initRound() {
    this.activePlayers = this.players.filter((player) => player.isActive);
    this.activePlayers.forEach((player) => (player.actedInRound = false));
    this.currentBet = 0;
    this.pool = new Map(this.activePlayers.map((player) => [player, 0]));
  }
}

export enum HoldemRound {
  PRE_FLOP = 1,
  FLOP = 2,
  TURN = 3,
  RIVER = 4,
}
