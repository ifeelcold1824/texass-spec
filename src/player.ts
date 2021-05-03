export class Player {
  id: PlayerId;
  balance: number;
  status: PlayerStatus;

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
