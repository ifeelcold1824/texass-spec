import { resultsCalculator } from './results';
import { HoldemRound } from './round';

describe('results test', () => {
  it('should return correct result given status and hand value', () => {
    const pool = new Map([
      [
        HoldemRound.PRE_FLOP,
        new Map([
          ['a', 1],
          ['b', 1],
          ['c', 1],
        ]),
      ],
      [
        HoldemRound.FLOP,
        new Map([
          ['a', 2],
          ['b', 2],
          ['c', 2],
        ]),
      ],
      [
        HoldemRound.TURN,
        new Map([
          ['a', 3],
          ['b', 3],
          ['c', 0],
        ]),
      ],
      [
        HoldemRound.RIVER,
        new Map([
          ['a', 4],
          ['b', 4],
          ['c', 0],
        ]),
      ],
    ]);
    const handValue = new Map([
      ['a', 2],
      ['b', 2],
      ['c', 3],
    ]);

    const res = resultsCalculator(handValue, pool);
    expect(res).toEqual(
      new Map([
        ['a', 7],
        ['b', 7],
        ['c', 9],
      ]),
    );
  });
});
