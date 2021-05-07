import {Card} from "./deck/card";

export class Hand {
  readonly isFlush: boolean
  private readonly isAceStraight: boolean
  readonly isStraight: boolean
  private readonly ranks: Map<number, number>

  constructor(private readonly cards: Card[]) {
    if (this.cards.length !== 5) {
      throw new Error("a hand must be 5 this.cards")
    }
    this.cards = this.cards.sort((a, b) => a.rank - b.rank)
    const isNormalStraight = this.cards.slice(0, 4).every((card, index) => this.cards[index + 1].rank - card.rank === 1)

    this.isFlush = this.cards.every(card => card.suit === this.cards[0].suit)
    this.isAceStraight = this.cards[0].rank === 1 && this.cards[1].rank === 10 && this.cards.slice(1, 4).every((card, index) => this.cards[index + 2].rank - card.rank === 1)
    this.isStraight = isNormalStraight || this.isAceStraight
    this.ranks = this.cards.reduce((map, card) => map.set(card.rank, (map.get(card.rank) || 0) + 1), new Map<number, number>())
  }

  get isRoyalFlush() {
    return this.isFlush && this.isAceStraight
  }

  get isStraightFlush() {
    return this.isStraight && this.isFlush
  }

  get isFourOfAKind() {
    return this.ranks.size === 2 && Math.max(...this.ranks.values()) === 4
  }

  get isFullHouse() {
    return this.ranks.size === 2 && Math.max(...this.ranks.values()) === 3
  }

  get isThreeOfAKind() {
    return this.ranks.size === 3 && Math.max(...this.ranks.values()) === 3
  }

  get isTwoPairs() {
    return this.ranks.size === 3 && Math.max(...this.ranks.values()) === 2
  }

  get isPair() {
    return this.ranks.size === 4 && Math.max(...this.ranks.values()) === 2
  }

  get isHighCard() {
    return true
  }
}
