import {Card} from "../deck/card";
import {RoyalFlush} from "./evaluators/royal-flush";
import {StraightFlush} from "./evaluators/straight-flush";
import {FourOfAKind} from "./evaluators/four-of-a-kind";
import {FullHouse} from "./evaluators/full-house";
import {Flush} from "./evaluators/flush";
import {Straight} from "./evaluators/straight";
import {ThreeOfAKind} from "./evaluators/three-of-a-kind";
import {TwoPairs} from "./evaluators/two-pairs";
import {Pair} from "./evaluators/pair";
import {HighCard} from "./evaluators/high-card";
import {RankEvaluator} from "./evaluators/rank-evaluator";

export class Hand {
  readonly isFlush: boolean
  readonly isAceStraight: boolean
  readonly isStraight: boolean
  readonly cardRanks: Map<number, number>
  private readonly evaluators: RankEvaluator[] = [
    new RoyalFlush(), new StraightFlush(), new FourOfAKind(), new FullHouse(), new Flush(), new Straight(), new ThreeOfAKind(), new TwoPairs(), new Pair(), new HighCard()
  ]

  constructor(private readonly cards: Card[]) {
    if (this.cards.length !== 5) {
      throw new Error("a hand must be 5 this.cards")
    }
    this.cards = this.cards.sort((a, b) => a.rank - b.rank)
    const isNormalStraight = this.cards.slice(0, 4).every((card, index) => this.cards[index + 1].rank - card.rank === 1)

    this.isFlush = this.cards.every(card => card.suit === this.cards[0].suit)
    this.isAceStraight = this.cards[0].rank === 1 && this.cards[1].rank === 10 && this.cards.slice(1, 4).every((card, index) => this.cards[index + 2].rank - card.rank === 1)
    this.isStraight = isNormalStraight || this.isAceStraight
    this.cardRanks = this.cards.reduce((map, card) => map.set(card.rank, (map.get(card.rank) || 0) + 1), new Map<number, number>())
  }

  get rank() {
    return this.evaluators.find((evaluator) => evaluator.evaluate(this)? evaluator : undefined).rank
  }
}
