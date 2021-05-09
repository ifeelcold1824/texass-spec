import { Card, CardRank } from '../deck/card';
import {
  byCardRankDec,
  cardLargerThanNextBy1Rank,
  cardSuitEqualTo,
  toGetTheLargest,
} from '../utils/compare-fn';
import { Rank } from './rank';
import { HighCard } from './ranks/high-card';
import { AVAILABLE_RANKS } from './available-ranks';
import { CompareTo } from '../utils/compare-to';

export class Hand implements CompareTo {
  readonly isFlush: boolean;
  readonly isAceStraight: boolean;
  readonly isStraight: boolean;
  readonly maxCardOccur: number;
  readonly distinctCardRanks: CardRank[];
  readonly rank: Rank;

  constructor(readonly cards: Card[]) {
    if (this.cards.length !== 5) {
      throw new Error('a hand must be 5 this.cards');
    }
    this.cards = this.cards.sort(byCardRankDec);
    const isNormalStraight = this.cards.every(cardLargerThanNextBy1Rank);

    this.isFlush = this.cards.every(cardSuitEqualTo(this.cards[0].suit));
    this.isAceStraight =
      this.cards[4].rank === 1 &&
      this.cards[3].rank === 10 &&
      this.cards.slice(0, 4).every(cardLargerThanNextBy1Rank);
    this.isStraight = isNormalStraight || this.isAceStraight;
    const cardRanks = this.cards.reduce(
      (map, card) => map.set(card.rank, (map.get(card.rank) || 0) + 1),
      new Map<CardRank, number>(),
    );
    this.distinctCardRanks = [...cardRanks.keys()];
    this.maxCardOccur = Math.max(...cardRanks.values());
    this.rank =
      [...AVAILABLE_RANKS]
        .map((it) => new it(this))
        .filter((rank) => rank.isValid())
        .reduce(toGetTheLargest) || new HighCard(this);
  }

  compareTo(hand: Hand): number {
    return this.rank.compareTo(hand.rank);
  }
}
