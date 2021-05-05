import { resultsCalculator } from '../src/results';

describe('results test', () => {
  it('winner should takes all', () => {
    const pool = new Map([
      ['a', 1],
      ['b', 2],
      ['c', 3],
    ]);
    const handValue = new Map([
      ['a', 2],
      ['b', 2],
      ['c', 3],
    ]);

    const res = resultsCalculator(handValue, pool);
    expect(res).toEqual(
      new Map([
        ['a', 0],
        ['b', 0],
        ['c', 6],
      ]),
    );
  });

  it('multiple winners will share', () => {
    const pool = new Map([
      ['a', 3],
      ['b', 3],
      ['c', 3],
    ]);
    const handValue = new Map([
      ['a', 2],
      ['b', 2],
      ['c', 1],
    ]);

    const res = resultsCalculator(handValue, pool);
    expect(res).toEqual(
      new Map([
        ['a', 4.5],
        ['b', 4.5],
        ['c', 0],
      ]),
    );
  });

  it('winner will only take his bet amount * active player, the rest player will take the rest', () => {
    const pool = new Map([
      ['a', 1],
      ['b', 2],
      ['c', 3],
    ]);
    const handValue = new Map([
      ['a', 3],
      ['b', 2],
      ['c', 1],
    ]);

    const res = resultsCalculator(handValue, pool);
    expect(res).toEqual(
      new Map([
        ['a', 3],
        ['b', 2],
        ['c', 1],
      ]),
    );
  });
});
