import { RankType } from './rankType';
import { Hand } from '../hand';

export interface Rank {
  rank: RankType;

  evaluate(hand: Hand): boolean;
}
