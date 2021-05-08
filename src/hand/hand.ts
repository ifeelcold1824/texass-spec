import { Card, CardRank } from '../deck/card';
import { RankChecker } from './rank-checker';
import { HAND_RANK_CHECKERS } from './hand-ranks';
import {
  byCardRankDec,
  cardLargerThanNextBy1Rank,
  cardSuitEqualTo,
  sortMapByValueDsc,
} from '../utils/compare-fn';
import { RankType } from './rank-type';
import { Rank } from './rank';

export class Hand {
  private readonly rankCheckers: RankChecker[] = HAND_RANK_CHECKERS;
  readonly isFlush: boolean;
  readonly isAceStraight: boolean;
  readonly isStraight: boolean;
  readonly cardRanks: Map<CardRank, number>;
  readonly rank: Rank;

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
    this.rank = this.checkRank();
  }

  private checkRank() {
    let rank: Rank = new Rank(RankType.HIGH_CARD, [...this.cardRanks.keys()]);
    for (let i = 0; i < this.rankCheckers.length; i++) {
      const res = this.rankCheckers[i].check(this);
      if (res) {
        rank = res;
        break;
      }
    }
    return rank;
  }
}
