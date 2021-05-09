import { Card } from './deck/card';
import { Hand } from './hand/hand';
import { toGetTheLargest } from './utils/compare-fn';
import { getAllCombinations } from './utils/array';

export class Player {
  id: PlayerId;
  holeCards: Card[] = [];
  balance: number;
  status: PlayerStatus;
  actedInRound = false;

  constructor(id: PlayerId, status: PlayerStatus = 'ACTIVE', balance = 0) {
    this.id = id;
    this.status = status;
    this.balance = balance;
  }

  get isActive() {
    return this.status === 'ACTIVE';
  }

  get isOut() {
    return this.status === 'OUT';
  }

  has(amount: number) {
    return this.balance >= amount;
  }

  pay(amount: number) {
    this.balance -= amount;
  }

  inactive() {
    this.status = 'OUT';
  }

  getMaxHand(communityCards: Card[]) {
    return getAllCombinations([...communityCards, ...this.holeCards], 5)
      .map((cards) => new Hand(cards))
      .reduce(toGetTheLargest);
  }
}

export type PlayerStatus = 'ACTIVE' | 'ALLIN' | 'OUT';
export type PlayerId = string;
