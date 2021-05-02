import { ERROR_MSG } from './constant';

export class Player {
  id: PlayerId;
  balance: number;
  blindBet?: number;
  isAllin?: boolean;

  constructor(id: PlayerId) {
    this.id = id;
  }

  pay(amount: number) {
    if (this.balance < amount) {
      throw Error(ERROR_MSG.GAME_OVER);
    }
    this.balance -= amount;
  }
}

export type PlayerId = string;
