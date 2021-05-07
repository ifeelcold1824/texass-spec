export enum Suit {
  SPADES,
  CLUBS,
  HEARTS,
  DIAMONDS,
}

export type CardRank = number;

export class Card {
  constructor(public readonly rank: CardRank, public readonly suit: Suit) {}

  diff(card: Card) {
    return this.rank - card.rank;
  }
}
