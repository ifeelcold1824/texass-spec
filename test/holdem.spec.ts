import { Holdem } from '../src/holdem';
import { Player } from '../src/player';
import { HoldemRound } from '../src/round';
import { Fold } from '../src/action/fold';
import { Check } from '../src/action/check';
import { Bet } from '../src/action/bet';
import { Card } from '../src/deck/card';

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

  describe('game over', () => {
    it('should game over when active player less than 1', () => {
      const client = new Holdem([playerA, playerB, playerC]);
      expect(client.currentRound.actionPlayer).toEqual(playerB);
      client.execute(new Fold());
      expect(client.currentRound.activePlayers.length).toEqual(1);
      expect(client.gameOver).toBeTruthy();
    });

    it('should game over when RIVER round is over', () => {
      const client = new Holdem([playerA, playerB, playerC]);
      client.execute(new Check());
      client.execute(new Check());
      client.execute(new Check());
      client.execute(new Check());
      client.execute(new Check());
      client.execute(new Check());
      client.execute(new Check());
      client.execute(new Check());
      expect(client.currentRound.roundId).toEqual(HoldemRound.RIVER);
      expect(client.currentRound.isRoundOver).toBeTruthy();
      expect(client.gameOver).toBeTruthy();
    });

    it('should throw error when action on game over', () => {
      const client = new Holdem([playerA, playerB, playerC]);
      client.execute(new Fold());
      expect(client.gameOver).toBeTruthy();
      expect(() => {
        client.execute(new Fold());
      }).toThrowError('can not take action when game over');
    });
  });

  it('should sum pool in each round to a combined pool', () => {
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

  it('winner will takes all when only 1 player left', () => {
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
    expect(client.gameOver).toBeTruthy();
    expect(client.results).toEqual(
      new Map([
        [playerA, 0],
        [playerB, 30],
        [playerC, 0],
      ]),
    );
  });

  it('winners will share all when theirs multiple winners', () => {
    const client = new Holdem([playerA, playerB, playerC]);
    client.execute(new Bet());
    client.execute(new Bet());

    client.execute(new Bet());
    client.execute(new Bet());

    client.execute(new Bet());
    client.execute(new Bet());

    client.execute(new Bet());
    client.execute(new Bet());
    expect(client.pool).toEqual(
      new Map([
        [playerB, 40],
        [playerC, 40],
      ]),
    );
    expect(client.gameOver).toBeTruthy();
    const mockCommunityCards = [
      new Card(1, 1),
      new Card(2, 0),
      new Card(3, 1),
      new Card(5, 0),
      new Card(6, 1),
    ];
    client.communityCards = mockCommunityCards;
    playerB.holeCards = [new Card(10, 2), new Card(9, 3)];
    playerC.holeCards = [new Card(10, 3), new Card(9, 2)];
    expect(
      playerB
        .getMaxHand(mockCommunityCards)
        .compareTo(playerC.getMaxHand(mockCommunityCards)),
    ).toEqual(0);
    expect(client.results).toEqual(
      new Map([
        [playerA, 0],
        [playerB, 40],
        [playerC, 40],
      ]),
    );
  });
});
