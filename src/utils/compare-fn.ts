import { Card, Suit } from '../deck/card';
import { CompareTo } from './compare-to';

export const byCardRankDec = (a: Card, b: Card) => b.compareTo(a);

export const cardLargerThanNextBy1Rank = (
  card: Card,
  index: number,
  cards: Card[],
) => (cards[index + 1] ? card.compareTo(cards[index + 1]) === 1 : true);

export const cardSuitEqualTo = (suit: Suit) => (card: Card) =>
  card.suit === suit;

export const sortMapByValueDsc = <T>(map: Map<T, number>) =>
  new Map([...map.entries()].sort(([, valueA], [, valueB]) => valueB - valueA));

export const toGetTheLargest = <T extends CompareTo>(a: T, b: T) =>
  a.compareTo(b) > 0 ? a : b;
