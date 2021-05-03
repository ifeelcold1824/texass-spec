import { Player } from './player';

export class Round {
  pool: Map<Player, number> = new Map();
  currentBet = 0;
  activePlayers: Player[];

  constructor(private players: Player[], public name: HoldemRound) {
    this.initRound();
  }

  get actionPlayer() {
    return this.activePlayers[0];
  }

  get isLastRound() {
    return this.name === HoldemRound.RIVER;
  }

  get minWager() {
    return 10;
  }

  fold() {
    const player = this.actionPlayer;

    player.status = 'OUT';

    this.activePlayers.shift();
  }

  check() {
    const player = this.actionPlayer;

    this.activePlayers.push(player);
    this.activePlayers.shift();
  }

  bet() {
    const player = this.actionPlayer;

    const bid = this.currentBet ? this.currentBet : this.minWager;
    player.pay(bid - this.pool.get(player));
    this.pool.set(player, bid);
    this.currentBet = bid;

    this.activePlayers.push(player);
    this.activePlayers.shift();
  }

  raise(amount: number) {
    const player = this.actionPlayer;

    const bid = this.currentBet + amount;
    player.pay(bid - this.pool.get(player));
    this.pool.set(player, bid);
    this.currentBet = bid;

    this.activePlayers.push(player);
    this.activePlayers.shift();
  }

  private initRound() {
    this.activePlayers = this.players.filter((it) => it.status === 'ACTIVE');
    this.currentBet = 0;
    this.pool = new Map(this.activePlayers.map((it) => [it, null]));
  }
}

export enum HoldemRound {
  PRE_FLOP = 1,
  FLOP = 2,
  TURN = 3,
  RIVER = 4,
}
