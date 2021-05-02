import { TexassClientStatus } from './holdem';
import { resultsCalculator } from './results';
import { Player } from './player';
import { TexassRound } from './constant';

describe('results test', () => {
  let playerA: Player;
  let playerB: Player;
  let playerC: Player;

  beforeEach(() => {
    playerA = buildMockPlayer('a', 40, 10, false);
    playerB = buildMockPlayer('b', 100, 20, false);
    playerC = buildMockPlayer('c');
  });
  it('should return correct result given status and hand value', () => {
    const status = {
      gameOver: true,
      players: new Map([
        [playerA.id, playerA],
        [playerB.id, playerB],
        [playerC.id, playerC],
      ]),
      pool: new Map([
        [
          TexassRound.PRE_FLOP,
          new Map([
            ['a', 1],
            ['b', 1],
            ['c', 1],
          ]),
        ],
        [
          TexassRound.FLOP,
          new Map([
            ['a', 2],
            ['b', 2],
            ['c', 2],
          ]),
        ],
        [
          TexassRound.TURN,
          new Map([
            ['a', 3],
            ['b', 3],
            ['c', 0],
          ]),
        ],
        [
          TexassRound.RIVER,
          new Map([
            ['a', 4],
            ['b', 4],
            ['c', 0],
          ]),
        ],
      ]),
    } as TexassClientStatus;
    const handValue = new Map([
      ['a', 2],
      ['b', 2],
      ['c', 3],
    ]);

    const res = resultsCalculator(status, handValue);
    expect(res).toEqual(
      new Map([
        ['a', 7],
        ['b', 7],
        ['c', 9],
      ]),
    );
  });

  const buildMockPlayer = (
    id: string,
    balance = 100,
    blindBet = undefined,
    isAllin = undefined,
  ) => {
    const player = new Player();
    player.id = id;
    player.balance = balance;
    player.blindBet = blindBet;
    player.isAllin = isAllin;
    return player;
  };
});
