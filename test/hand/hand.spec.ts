import { Hand } from '../../src/hand/hand';
import { Card } from '../../src/deck/card';
import { ThreeOfAKind } from '../../src/hand/ranks/three-of-a-kind';
import { FullHouse } from '../../src/hand/ranks/full-house';
import { FourOfAKind } from '../../src/hand/ranks/four-of-a-kind';
import { RoyalFlush } from '../../src/hand/ranks/royal-flush';
import { Flush } from '../../src/hand/ranks/flush';
import { TwoPairs } from '../../src/hand/ranks/two-pairs';
import { StraightFlush } from '../../src/hand/ranks/straight-flush';
import { HighCard } from '../../src/hand/ranks/high-card';
import { Straight } from '../../src/hand/ranks/straight';
import { Pair } from '../../src/hand/ranks/pair';

describe('hand test', () => {
  it('should throw error when not give 5 cards', () => {
    expect(() => {
      new Hand([]);
    }).toThrowError();
  });

  describe('hand rankType test', () => {
    it('T J Q K A with same suit should be Royal flush', () => {
      const hand = new Hand([
        new Card(10, 0),
        new Card(11, 0),
        new Card(12, 0),
        new Card(13, 0),
        new Card(1, 0),
      ]);
      expect(hand.rank).toBeInstanceOf(RoyalFlush);
    });

    it('9 T J Q K with same suit should be Straight flush', () => {
      const hand = new Hand([
        new Card(9, 0),
        new Card(10, 0),
        new Card(11, 0),
        new Card(12, 0),
        new Card(13, 0),
      ]);
      expect(hand.rank).toBeInstanceOf(StraightFlush);
    });

    it('9 K K K K should be Four of a kind', () => {
      const hand = new Hand([
        new Card(9, 0),
        new Card(13, 0),
        new Card(13, 1),
        new Card(13, 2),
        new Card(13, 3),
      ]);
      expect(hand.rank).toBeInstanceOf(FourOfAKind);
    });

    it('9 9 K K K should be Full house', () => {
      const hand = new Hand([
        new Card(9, 0),
        new Card(9, 0),
        new Card(13, 1),
        new Card(13, 2),
        new Card(13, 3),
      ]);
      expect(hand.rank).toBeInstanceOf(FullHouse);
    });

    it('same suit should be Flush', () => {
      const hand = new Hand([
        new Card(1, 0),
        new Card(9, 0),
        new Card(13, 0),
        new Card(13, 0),
        new Card(13, 0),
      ]);
      expect(hand.rank).toBeInstanceOf(Flush);
    });

    it('T J Q K A with different suit should be Straight', () => {
      const hand = new Hand([
        new Card(10, 1),
        new Card(11, 0),
        new Card(12, 0),
        new Card(13, 0),
        new Card(1, 0),
      ]);
      expect(hand.rank).toBeInstanceOf(Straight);
    });

    it('8 9 K K K should be Three of a kind', () => {
      const hand = new Hand([
        new Card(8, 0),
        new Card(9, 0),
        new Card(13, 1),
        new Card(13, 2),
        new Card(13, 3),
      ]);
      expect(hand.rank).toBeInstanceOf(ThreeOfAKind);
    });

    it('8 9 9 K K should be Two pairs', () => {
      const hand = new Hand([
        new Card(8, 0),
        new Card(9, 0),
        new Card(9, 1),
        new Card(13, 2),
        new Card(13, 3),
      ]);
      expect(hand.rank).toBeInstanceOf(TwoPairs);
    });

    it('8 9 T K K should be Pairs', () => {
      const hand = new Hand([
        new Card(8, 0),
        new Card(9, 0),
        new Card(10, 1),
        new Card(13, 2),
        new Card(13, 3),
      ]);
      expect(hand.rank).toBeInstanceOf(Pair);
    });

    it('8 9 T Q K should be high card', () => {
      const hand = new Hand([
        new Card(8, 0),
        new Card(9, 0),
        new Card(10, 1),
        new Card(12, 2),
        new Card(13, 3),
      ]);
      expect(hand.rank).toBeInstanceOf(HighCard);
    });
  });

  describe('diff test', () => {
    it('diff of hand should be the diff of hand rankType if their hand ranks is different ', () => {
      const royalFlushHand = new Hand([
        new Card(10, 0),
        new Card(11, 0),
        new Card(12, 0),
        new Card(13, 0),
        new Card(1, 0),
      ]);
      expect(royalFlushHand.rank).toBeInstanceOf(RoyalFlush);

      const flushHand = new Hand([
        new Card(1, 0),
        new Card(9, 0),
        new Card(13, 0),
        new Card(13, 0),
        new Card(13, 0),
      ]);
      expect(flushHand.rank).toBeInstanceOf(Flush);

      expect(royalFlushHand.rank.compareTo(flushHand.rank)).toEqual(
        royalFlushHand.rank.value - flushHand.rank.value,
      );
    });

    it('diff of hand should be the diff of card rankType if their hand ranks is the same ', () => {
      const hand1 = new Hand([
        new Card(2, 0),
        new Card(3, 0),
        new Card(4, 1),
        new Card(13, 2),
        new Card(13, 3),
      ]);
      expect(hand1.rank).toBeInstanceOf(Pair);
      const hand2 = new Hand([
        new Card(6, 0),
        new Card(7, 0),
        new Card(8, 1),
        new Card(13, 2),
        new Card(13, 3),
      ]);
      expect(hand2.rank).toBeInstanceOf(Pair);
      expect(hand1.rank.compareTo(hand2.rank)).toEqual(4 - 8);
    });

    it('diff should be 0 if hand rankType and card rankType all the same', () => {
      const hand1 = new Hand([
        new Card(2, 1),
        new Card(3, 1),
        new Card(4, 1),
        new Card(13, 2),
        new Card(13, 3),
      ]);
      expect(hand1.rank).toBeInstanceOf(Pair);
      const hand2 = new Hand([
        new Card(2, 0),
        new Card(3, 0),
        new Card(4, 1),
        new Card(13, 2),
        new Card(13, 3),
      ]);
      expect(hand1.rank.compareTo(hand2.rank)).toEqual(0);
    });
  });
});
