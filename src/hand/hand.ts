import { Card, CardRank } from '../deck/card';
import { Rank } from './rank';
import { HAND_RANKS } from './hand-ranks';
import {
  byCardRankDec,
  cardLargerThanNextBy1Rank,
  cardSuitEqualTo,
  sortMapByValueDsc,
} from '../utils/compare-fn';
import { RankType } from './rank-type';

export class Hand {
  private readonly handRanks: Rank[] = HAND_RANKS;
  readonly isFlush: boolean;
  readonly isAceStraight: boolean;
  readonly isStraight: boolean;
  readonly cardRanks: Map<CardRank, number>;
  readonly rank: RankType;
  readonly scoringCardRanks: CardRank[];

  constructor(cards: Card[]) {
    if (cards.length !== 5) {
      throw new Error('a hand must be 5 cards');
    }
    cards = cards.sort(byCardRankDec);
    const isNormalStraight = cards.every(cardLargerThanNextBy1Rank);

    this.isFlush = cards.every(cardSuitEqualTo(cards[0].suit));
    this.isAceStraight =
      cards[4].rank === 1 &&
      cards[3].rank === 10 &&
      cards.slice(0, 4).every(cardLargerThanNextBy1Rank);
    this.isStraight = isNormalStraight || this.isAceStraight;
    this.cardRanks = sortMapByValueDsc(
      cards.reduce(
        (map, card) => map.set(card.rank, (map.get(card.rank) || 0) + 1),
        new Map<CardRank, number>(),
      ),
    );
    const rank = this.handRanks.find((rank) =>
      rank.check(this) ? rank : undefined,
    );
    this.rank = rank ? rank.rank : RankType.HIGH_CARD;
    this.scoringCardRanks = [...this.cardRanks.keys()];
  }

  diffRank(hand: Hand) {
    if (this.rank !== hand.rank) {
      return this.rank - hand.rank;
    }
    return this.diffCardArray(this.scoringCardRanks, hand.scoringCardRanks);
  }

  private diffCardArray(a: CardRank[], b: CardRank[], index = 0): number {
    if (index > a.length) {
      return 0;
    }
    if (a[index] !== b[index]) {
      return a[index] - b[index];
    }
    return this.diffCardArray(a, b, index + 1);
  }
}
