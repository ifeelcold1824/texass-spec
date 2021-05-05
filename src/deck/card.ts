export enum Suit {
  SPADES,
  CLUBS,
  HEARTS,
  DIAMONDS,
}

export class Card {
  constructor(public readonly rank: number, public readonly suit: Suit) {}
}
