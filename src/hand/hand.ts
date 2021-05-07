import { Card } from '../deck/card';
import { RoyalFlush } from './ranks/royal-flush';
import { StraightFlush } from './ranks/straight-flush';
import { FourOfAKind } from './ranks/four-of-a-kind';
import { FullHouse } from './ranks/full-house';
import { Flush } from './ranks/flush';
import { Straight } from './ranks/straight';
import { ThreeOfAKind } from './ranks/three-of-a-kind';
import { TwoPairs } from './ranks/two-pairs';
import { Pair } from './ranks/pair';
import { HighCard } from './ranks/high-card';
import { Rank } from './ranks/rank';

export class Hand {
  readonly isFlush: boolean;
  readonly isAceStraight: boolean;
  readonly isStraight: boolean;
  readonly cardRanks: Map<number, number>;
  private readonly ranks: Rank[] = [
    new RoyalFlush(),
    new StraightFlush(),
    new FourOfAKind(),
    new FullHouse(),
    new Flush(),
    new Straight(),
    new ThreeOfAKind(),
    new TwoPairs(),
    new Pair(),
    new HighCard(),
  ];

  constructor(private readonly cards: Card[]) {
    if (this.cards.length !== 5) {
      throw new Error('a hand must be 5 this.cards');
    }
    this.cards = this.cards.sort((a, b) => a.rank - b.rank);
    const isNormalStraight = this.cards
      .slice(0, 4)
      .every((card, index) => this.cards[index + 1].rank - card.rank === 1);

    this.isFlush = this.cards.every((card) => card.suit === this.cards[0].suit);
    this.isAceStraight =
      this.cards[0].rank === 1 &&
      this.cards[1].rank === 10 &&
      this.cards
        .slice(1, 4)
        .every((card, index) => this.cards[index + 2].rank - card.rank === 1);
    this.isStraight = isNormalStraight || this.isAceStraight;
    this.cardRanks = this.cards.reduce(
      (map, card) => map.set(card.rank, (map.get(card.rank) || 0) + 1),
      new Map<number, number>(),
    );
  }

  get rank() {
    return this.ranks.find((rank) => (rank.evaluate(this) ? rank : undefined))
      .rank;
  }
}
