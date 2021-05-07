import { Hand } from '../src/hand/hand';
import { Card } from '../src/deck/card';
import { Rank } from '../src/hand/evaluators/rank';

describe('hand test', () => {
  it('should throw error when not give 5 cards', () => {
    expect(() => {
      new Hand([]);
    }).toThrowError();
  });

  it('T J Q K A with same suit should be Royal flush', () => {
    const hand = new Hand([
      new Card(10, 0),
      new Card(11, 0),
      new Card(12, 0),
      new Card(13, 0),
      new Card(1, 0),
    ]);
    expect(hand.rank).toEqual(Rank.ROYAL_FLUSH);
  });

  it('9 T J Q K with same suit should be Straight flush', () => {
    const hand = new Hand([
      new Card(9, 0),
      new Card(10, 0),
      new Card(11, 0),
      new Card(12, 0),
      new Card(13, 0),
    ]);
    expect(hand.rank).toEqual(Rank.STRAIGHT_FLUSH);
  });

  it('9 K K K K should be Four of a kind', () => {
    const hand = new Hand([
      new Card(9, 0),
      new Card(13, 0),
      new Card(13, 1),
      new Card(13, 2),
      new Card(13, 3),
    ]);
    expect(hand.rank).toEqual(Rank.FOUR_OF_A_KIND);
  });

  it('9 9 K K K should be Full house', () => {
    const hand = new Hand([
      new Card(9, 0),
      new Card(9, 0),
      new Card(13, 1),
      new Card(13, 2),
      new Card(13, 3),
    ]);
    expect(hand.rank).toEqual(Rank.FULL_HOUSE);
  });

  it('same suit should be Flush', () => {
    const hand = new Hand([
      new Card(1, 0),
      new Card(9, 0),
      new Card(13, 0),
      new Card(13, 0),
      new Card(13, 0),
    ]);
    expect(hand.rank).toEqual(Rank.FLUSH);
  });

  it('T J Q K A with different suit should be Straight', () => {
    const hand = new Hand([
      new Card(10, 1),
      new Card(11, 0),
      new Card(12, 0),
      new Card(13, 0),
      new Card(1, 0),
    ]);
    expect(hand.rank).toEqual(Rank.STRAIGHT);
  });

  it('8 9 K K K should be Three of a kind', () => {
    const hand = new Hand([
      new Card(8, 0),
      new Card(9, 0),
      new Card(13, 1),
      new Card(13, 2),
      new Card(13, 3),
    ]);
    expect(hand.rank).toEqual(Rank.THREE_OF_A_KIND);
  });

  it('8 9 9 K K should be Two pairs', () => {
    const hand = new Hand([
      new Card(8, 0),
      new Card(9, 0),
      new Card(9, 1),
      new Card(13, 2),
      new Card(13, 3),
    ]);
    expect(hand.rank).toEqual(Rank.TWO_PAIRS);
  });

  it('8 9 T K K should be Pairs', () => {
    const hand = new Hand([
      new Card(8, 0),
      new Card(9, 0),
      new Card(10, 1),
      new Card(13, 2),
      new Card(13, 3),
    ]);
    expect(hand.rank).toEqual(Rank.PAIR);
  });

  it('8 9 T Q K should be high card', () => {
    const hand = new Hand([
      new Card(8, 0),
      new Card(9, 0),
      new Card(10, 1),
      new Card(12, 2),
      new Card(13, 3),
    ]);
    expect(hand.rank).toEqual(Rank.HIGH_CARD);
  });
});
