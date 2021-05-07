import { Card, Suit } from '../deck/card';

export const byCardRankDec = (a: Card, b: Card) => b.diff(a);

export const cardLargerThanNextBy1Rank = (
  card: Card,
  index: number,
  cards: Card[],
) => (cards[index + 1] ? card.diff(cards[index + 1]) === 1 : true);

export const cardSuitEqualTo = (suit: Suit) => (card: Card) =>
  card.suit === suit;

export const sortMapByValueDsc = <T>(map: Map<T, number>) =>
  new Map([...map.entries()].sort(([, valueA], [, valueB]) => valueB - valueA));
