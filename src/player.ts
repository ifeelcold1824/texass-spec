import { Card } from './deck/card';
import { Hand } from './hand/hand';

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

  get isActiveInRound() {
    return this.status === 'ACTIVE';
  }

  get isActive() {
    return this.status !== 'OUT';
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

  getHighestHandRank(communityCards: Card[]) {
    return this.getAllHandCombinations([
      ...communityCards,
      ...this.holeCards,
    ]).reduce((pre, cur) => (pre.rank.diff(cur.rank) > 0 ? pre : cur)).rank;
  }

  private getAllHandCombinations(cards: Card[]) {
    const res: Hand[] = [];
    const recur = (currentCards: Card[], cards: Card[]) => {
      for (let i = 0; i < cards.length; i++) {
        if (currentCards.length === 4) {
          res.push(new Hand([cards[i], ...currentCards]));
        }
        recur([...currentCards, cards[i]], cards.slice(i + 1));
      }
    };
    recur([], cards);
    return res;
  }
}

export type PlayerStatus = 'ACTIVE' | 'ALLIN' | 'OUT';
export type PlayerId = string;
