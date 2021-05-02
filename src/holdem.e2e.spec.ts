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
    const client = new Holdem(playerA, playerB, playerC);
    expect(client.round).toEqual(TexassRound.PRE_FLOP);
    expect(client.actionPlayer.id).toEqual('a');

    // A small blind
    client.action(ActionType.CALL);
    // B big blind
    client.action(ActionType.CALL);
    // C call
    client.action(ActionType.CALL);
    // A call
    client.action(ActionType.CALL);
    expect(client.round).toEqual(TexassRound.FLOP);

    client.action(ActionType.ALL_IN);
    client.action(ActionType.CALL);
    client.action(ActionType.CALL);
    expect(client.round).toEqual(TexassRound.TURN);

    client.action(ActionType.CALL, 10);
    client.action(ActionType.RAISE, 10);
    client.action(ActionType.CALL);
    expect(client.round).toEqual(TexassRound.RIVER);

    client.action(ActionType.CHECK);
    client.action(ActionType.CALL, 10);
    client.action(ActionType.CALL);
    expect(client.gameOver).toBeTruthy();
    const handValue = new Map([
      ['a', 2],
      ['b', 2],
      ['c', 3],
    ]);

    expect(resultsCalculator(client, handValue)).toEqual(
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
