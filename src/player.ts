import { ERROR_MSG } from './constant';

export class Player {
  id: PlayerId;
  balance: number;
  blindBet?: number;
  isAllin?: boolean;
  status: PlayerStatus;

  constructor(id: PlayerId, status: PlayerStatus = 'ACTIVE', balance = 0) {
    this.id = id;
    this.status = status;
    this.balance = balance;
  }

  pay(amount: number) {
    if (this.balance < amount) {
      throw Error(ERROR_MSG.GAME_OVER);
    }
    this.balance -= amount;
  }
}

export type PlayerStatus = 'ACTIVE' | 'ALLIN' | 'OUT';
export type PlayerId = string;
