import { Player } from './player';
import { Action } from './action/action';

export class Round {
  pool: Map<Player, number> = new Map();
  currentBet = 0;
  activePlayers: Player[] = [];

  constructor(private players: Player[], public roundId: HoldemRound) {
    this.initRound();
  }

  execute(action: Action) {
    const player = this.actionPlayer;
    this.activePlayers.shift();
    action.execute(this, player);
    player.actedInRound = true;
  }

  betToPool(player: Player, bid: number) {
    player.pay(bid - this.getBidOfPlayer(player));
    this.pool.set(player, bid);
    this.currentBet = bid;
  }

  getBidOfPlayer(player: Player) {
    return this.pool.get(player) || 0;
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
        .filter(([player]) => player.isActiveInRound)
        .filter(([player, bet]) =>
          player.actedInRound ? bet < this.currentBet : true,
        ).length === 0
    );
  }

  get isFinalRound() {
    return this.roundId === HoldemRound.RIVER;
  }

  private initRound() {
    this.activePlayers = this.players.filter(
      (player) => player.isActiveInRound,
    );
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
