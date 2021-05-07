import { RankType } from './rank-type';
import { Hand } from './hand';

export interface Rank {
  rank: RankType;

  check(hand: Hand): boolean;
}
