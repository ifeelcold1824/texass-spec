import { Hand } from '../../src/hand/hand';
import { Card } from '../../src/deck/card';
import { RankType } from '../../src/hand/rank-type';

describe('hand test', () => {
  it('should throw error when not give 5 cards', () => {
    expect(() => {
      new Hand([]);
    }).toThrowError();
  });

  describe('hand rank test', () => {
    it('T J Q K A with same suit should be Royal flush', () => {
      const hand = new Hand([
        new Card(10, 0),
        new Card(11, 0),
        new Card(12, 0),
        new Card(13, 0),
        new Card(1, 0),
      ]);
      expect(hand.rank).toEqual(RankType.ROYAL_FLUSH);
    });

    it('9 T J Q K with same suit should be Straight flush', () => {
      const hand = new Hand([
        new Card(9, 0),
        new Card(10, 0),
        new Card(11, 0),
        new Card(12, 0),
        new Card(13, 0),
      ]);
      expect(hand.rank).toEqual(RankType.STRAIGHT_FLUSH);
    });

    it('9 K K K K should be Four of a kind', () => {
      const hand = new Hand([
        new Card(9, 0),
        new Card(13, 0),
        new Card(13, 1),
        new Card(13, 2),
        new Card(13, 3),
      ]);
      expect(hand.rank).toEqual(RankType.FOUR_OF_A_KIND);
    });

    it('9 9 K K K should be Full house', () => {
      const hand = new Hand([
        new Card(9, 0),
        new Card(9, 0),
        new Card(13, 1),
        new Card(13, 2),
        new Card(13, 3),
      ]);
      expect(hand.rank).toEqual(RankType.FULL_HOUSE);
    });

    it('same suit should be Flush', () => {
      const hand = new Hand([
        new Card(1, 0),
        new Card(9, 0),
        new Card(13, 0),
        new Card(13, 0),
        new Card(13, 0),
      ]);
      expect(hand.rank).toEqual(RankType.FLUSH);
    });

    it('T J Q K A with different suit should be Straight', () => {
      const hand = new Hand([
        new Card(10, 1),
        new Card(11, 0),
        new Card(12, 0),
        new Card(13, 0),
        new Card(1, 0),
      ]);
      expect(hand.rank).toEqual(RankType.STRAIGHT);
    });

    it('8 9 K K K should be Three of a kind', () => {
      const hand = new Hand([
        new Card(8, 0),
        new Card(9, 0),
        new Card(13, 1),
        new Card(13, 2),
        new Card(13, 3),
      ]);
      expect(hand.rank).toEqual(RankType.THREE_OF_A_KIND);
    });

    it('8 9 9 K K should be Two pairs', () => {
      const hand = new Hand([
        new Card(8, 0),
        new Card(9, 0),
        new Card(9, 1),
        new Card(13, 2),
        new Card(13, 3),
      ]);
      expect(hand.rank).toEqual(RankType.TWO_PAIRS);
    });

    it('8 9 T K K should be Pairs', () => {
      const hand = new Hand([
        new Card(8, 0),
        new Card(9, 0),
        new Card(10, 1),
        new Card(13, 2),
        new Card(13, 3),
      ]);
      expect(hand.rank).toEqual(RankType.PAIR);
    });

    it('8 9 T Q K should be high card', () => {
      const hand = new Hand([
        new Card(8, 0),
        new Card(9, 0),
        new Card(10, 1),
        new Card(12, 2),
        new Card(13, 3),
      ]);
      expect(hand.rank).toEqual(RankType.HIGH_CARD);
    });
  });

  describe('diff test', () => {
    it('diff of hand should be the diff of hand rank if their hand ranks is different ', () => {
      const royalFlush = new Hand([
        new Card(10, 0),
        new Card(11, 0),
        new Card(12, 0),
        new Card(13, 0),
        new Card(1, 0),
      ]);
      expect(royalFlush.rank).toEqual(RankType.ROYAL_FLUSH);

      const flush = new Hand([
        new Card(1, 0),
        new Card(9, 0),
        new Card(13, 0),
        new Card(13, 0),
        new Card(13, 0),
      ]);
      expect(flush.rank).toEqual(RankType.FLUSH);

      expect(royalFlush.diffRank(flush)).toEqual(
        RankType.ROYAL_FLUSH - RankType.FLUSH,
      );
    });

    it('diff of hand should be the diff of card rank if their hand ranks is the same ', () => {
      const hand1 = new Hand([
        new Card(2, 0),
        new Card(3, 0),
        new Card(4, 1),
        new Card(13, 2),
        new Card(13, 3),
      ]);
      expect(hand1.rank).toEqual(RankType.PAIR);
      const hand2 = new Hand([
        new Card(6, 0),
        new Card(7, 0),
        new Card(8, 1),
        new Card(13, 2),
        new Card(13, 3),
      ]);
      expect(hand2.rank).toEqual(RankType.PAIR);
      expect(hand1.diffRank(hand2)).toEqual(4 - 8);
    });

    it('diff should be 0 if hand rank and card rank all the same', () => {
      const hand1 = new Hand([
        new Card(2, 1),
        new Card(3, 1),
        new Card(4, 1),
        new Card(13, 2),
        new Card(13, 3),
      ]);
      expect(hand1.rank).toEqual(RankType.PAIR);
      const hand2 = new Hand([
        new Card(2, 0),
        new Card(3, 0),
        new Card(4, 1),
        new Card(13, 2),
        new Card(13, 3),
      ]);
      expect(hand1.diffRank(hand2)).toEqual(0);
    });
  });
});
