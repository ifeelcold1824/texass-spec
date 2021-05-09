import { CompareTo } from '../utils/compare-to';

export enum Suit {
  SPADES,
  CLUBS,
  HEARTS,
  DIAMONDS,
}

export type CardRank = number;

export class Card implements CompareTo {
  constructor(public readonly rank: CardRank, public readonly suit: Suit) {}

  compareTo(card: Card) {
    return this.rank - card.rank;
  }
}
