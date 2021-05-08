import { RoyalFlush } from './rank-checkers/royal-flush';
import { StraightFlush } from './rank-checkers/straight-flush';
import { FourOfAKind } from './rank-checkers/four-of-a-kind';
import { FullHouse } from './rank-checkers/full-house';
import { Flush } from './rank-checkers/flush';
import { Straight } from './rank-checkers/straight';
import { ThreeOfAKind } from './rank-checkers/three-of-a-kind';
import { TwoPairs } from './rank-checkers/two-pairs';
import { Pair } from './rank-checkers/pair';
import { HighCard } from './rank-checkers/high-card';

export const HAND_RANK_CHECKERS = [
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
