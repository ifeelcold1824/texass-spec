import { Hand } from "../src/hand"
import {Card} from "../src/deck/card";

describe("hand test", () => {

  it('should throw error when not give 5 cards', () => {
    expect(() => {
      new Hand([])
    }).toThrowError()
  })

  it("T J Q K A with same suit should be Royal flush", () => {
    const hand = new Hand(
      [new Card(10, 0), new Card(11, 0), new Card(12, 0), new Card(13, 0), new Card(1, 0)]
    )
    expect(hand.isRoyalFlush).toBeTruthy()
  })

  it("9 T J Q K with same suit should be Straight flush", () => {
    const hand = new Hand(
      [new Card(9, 0), new Card(10, 0), new Card(11, 0), new Card(12, 0), new Card(13, 0)]
    )
    expect(hand.isStraightFlush).toBeTruthy()
    expect(hand.isRoyalFlush).toBeFalsy()
  })

  it("9 K K K K should be Four of a kind", () => {
    const hand = new Hand(
      [new Card(9, 0), new Card(13, 0), new Card(13, 1), new Card(13, 2), new Card(13, 3)]
    )
    expect(hand.isFourOfAKind).toBeTruthy()
    expect(hand.isStraightFlush).toBeFalsy()
    expect(hand.isRoyalFlush).toBeFalsy()
  })

  it("9 9 K K K should be Full house", () => {
    const hand = new Hand(
      [new Card(9, 0), new Card(9, 0), new Card(13, 1), new Card(13, 2), new Card(13, 3)]
    )
    expect(hand.isFullHouse).toBeTruthy()
    expect(hand.isFourOfAKind).toBeFalsy()
    expect(hand.isStraightFlush).toBeFalsy()
    expect(hand.isRoyalFlush).toBeFalsy()
  })

  it("same suit should be Flush", () => {
    const hand = new Hand(
      [new Card(1, 0), new Card(9, 0), new Card(13, 0), new Card(13, 0), new Card(13, 0)]
    )
    expect(hand.isFlush).toBeTruthy()
    expect(hand.isFullHouse).toBeFalsy()
    expect(hand.isFourOfAKind).toBeFalsy()
    expect(hand.isStraightFlush).toBeFalsy()
    expect(hand.isRoyalFlush).toBeFalsy()
  })

  it("T J Q K A with different suit should be Straight", () => {
    const hand = new Hand(
      [new Card(10, 1), new Card(11, 0), new Card(12, 0), new Card(13, 0), new Card(1, 0)]
    )
    expect(hand.isStraight).toBeTruthy()
    expect(hand.isFlush).toBeFalsy()
    expect(hand.isFullHouse).toBeFalsy()
    expect(hand.isFourOfAKind).toBeFalsy()
    expect(hand.isStraightFlush).toBeFalsy()
    expect(hand.isRoyalFlush).toBeFalsy()
  })

  it("8 9 K K K should be Three of a kind", () => {
    const hand = new Hand(
      [new Card(8, 0),new Card(9, 0),new Card(13, 1),new Card(13, 2),new Card(13, 3)]
    )
    expect(hand.isThreeOfAKind).toBeTruthy()
    expect(hand.isStraight).toBeFalsy()
    expect(hand.isFlush).toBeFalsy()
    expect(hand.isFullHouse).toBeFalsy()
    expect(hand.isFourOfAKind).toBeFalsy()
    expect(hand.isStraightFlush).toBeFalsy()
    expect(hand.isRoyalFlush).toBeFalsy()
  })

  it("8 9 9 K K should be Two pairs", () => {
    const hand = new Hand(
      [new Card(8, 0),new Card(9, 0),new Card(9, 1),new Card(13, 2),new Card(13, 3)]
    )
    expect(hand.isTwoPairs).toBeTruthy()
    expect(hand.isThreeOfAKind).toBeFalsy()
    expect(hand.isStraight).toBeFalsy()
    expect(hand.isFlush).toBeFalsy()
    expect(hand.isFullHouse).toBeFalsy()
    expect(hand.isFourOfAKind).toBeFalsy()
    expect(hand.isStraightFlush).toBeFalsy()
    expect(hand.isRoyalFlush).toBeFalsy()
  })

  it("8 9 T K K should be Pairs", () => {
    const hand = new Hand(
      [new Card(8, 0),new Card(9, 0),new Card(10, 1),new Card(13, 2),new Card(13, 3)]
    )
    expect(hand.isPair).toBeTruthy()
    expect(hand.isTwoPairs).toBeFalsy()
    expect(hand.isThreeOfAKind).toBeFalsy()
    expect(hand.isStraight).toBeFalsy()
    expect(hand.isFlush).toBeFalsy()
    expect(hand.isFullHouse).toBeFalsy()
    expect(hand.isFourOfAKind).toBeFalsy()
    expect(hand.isStraightFlush).toBeFalsy()
    expect(hand.isRoyalFlush).toBeFalsy()
  })

  it("8 9 T Q K should be high card", () => {
    const hand = new Hand(
      [new Card(8, 0),new Card(9, 0),new Card(10, 1),new Card(12, 2),new Card(13, 3)]
    )
    expect(hand.isHighCard).toBeTruthy()
    expect(hand.isPair).toBeFalsy()
    expect(hand.isTwoPairs).toBeFalsy()
    expect(hand.isThreeOfAKind).toBeFalsy()
    expect(hand.isStraight).toBeFalsy()
    expect(hand.isFlush).toBeFalsy()
    expect(hand.isFullHouse).toBeFalsy()
    expect(hand.isFourOfAKind).toBeFalsy()
    expect(hand.isStraightFlush).toBeFalsy()
    expect(hand.isRoyalFlush).toBeFalsy()
  })
})
