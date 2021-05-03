import { resultsCalculator } from './results';

describe('results test', () => {
  it('should return correct result given status and hand value', () => {
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
});
