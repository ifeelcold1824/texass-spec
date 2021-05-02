import { Holdem } from './holdem';
import { Player } from './player';
import { ActionType, TexassRound } from './constant';
import { resultsCalculator } from './results';

describe('Texass-client test', () => {
  let playerA: Player;
  let playerB: Player;
  let playerC: Player;

  beforeEach(() => {
    playerA = buildMockPlayer('a', 40, 10, false);
    playerB = buildMockPlayer('b', 100, 20, false);
    playerC = buildMockPlayer('c');
  });

  it('game should proceed as expected', () => {
    const client = Holdem.initFromPlayers(playerA, playerB, playerC);
    expect(client.status.round).toEqual(TexassRound.PRE_FLOP);
    expect(client.actionPlayer).toEqual('a');

    // A small blind
    client.action('a', ActionType.CALL);
    // B big blind
    client.action('b', ActionType.CALL);
    // C call
    client.action('c', ActionType.CALL);
    // A call
    client.action('a', ActionType.CALL);
    expect(client.status.round).toEqual(TexassRound.FLOP);

    client.action('a', ActionType.ALL_IN);
    client.action('b', ActionType.CALL);
    client.action('c', ActionType.CALL);
    expect(client.status.round).toEqual(TexassRound.TURN);

    client.action('b', ActionType.CALL, 10);
    client.action('c', ActionType.RAISE, 20);
    client.action('b', ActionType.CALL);
    expect(client.status.round).toEqual(TexassRound.RIVER);

    client.action('b', ActionType.CHECK);
    client.action('c', ActionType.CALL, 10);
    client.action('b', ActionType.CALL);
    expect(client.status.gameOver).toBeTruthy();
    const handValue = new Map([
      ['a', 2],
      ['b', 2],
      ['c', 3],
    ]);

    expect(resultsCalculator(client.status, handValue)).toEqual(
      new Map([
        ['a', 0],
        ['b', 0],
        ['c', 180],
      ]),
    );
  });

  const buildMockPlayer = (
    id: string,
    balance = 100,
    blindBet = undefined,
    isAllin = undefined,
  ) => {
    const player = new Player(id);
    player.balance = balance;
    player.blindBet = blindBet;
    player.isAllin = isAllin;
    return player;
  };
});
