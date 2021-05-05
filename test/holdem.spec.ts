import { Holdem } from '../src/holdem';
import { Player } from '../src/player';
import { HoldemRound } from '../src/round';
import { Bet, Fold } from '../src/action';

describe('Texass-client test', () => {
  let playerA: Player;
  let playerB: Player;
  let playerC: Player;

  beforeEach(() => {
    playerA = new Player('a', 'OUT', 100);
    playerB = new Player('b', 'ACTIVE', 100);
    playerC = new Player('c', 'ACTIVE', 100);
  });

  describe('init game', () => {
    it('first player should be action player when init game', () => {
      const client = new Holdem([playerA, playerB, playerC]);
      expect(client).toBeDefined();
      expect(client.currentRound.actionPlayer).toEqual(playerB);
      expect(client.currentRound.roundId).toEqual(HoldemRound.PRE_FLOP);
    });
  });

  it('should reduce pool in each round to a combined pool', () => {
    const client = new Holdem([playerA, playerB, playerC]);
    client.execute(new Bet());
    client.execute(new Bet());
    client.execute(new Bet());
    client.execute(new Fold());
    expect(client.pool).toEqual(
      new Map([
        [playerB, 20],
        [playerC, 10],
      ]),
    );
  });
});
