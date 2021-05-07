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

export const HAND_RANKS = [
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
