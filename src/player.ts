import { Card } from './deck/card';

export class Player {
  id: PlayerId;
  holeCards: Card[];
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

  pay(amount: number) {
    this.balance -= amount;
  }

  inactive() {
    this.status = 'OUT';
  }
}

export type PlayerStatus = 'ACTIVE' | 'ALLIN' | 'OUT';
export type PlayerId = string;
