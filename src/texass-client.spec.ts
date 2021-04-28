import { TexassClient, TexassClientStatus } from './texass-client';
import { ActionType, ERROR_MSG, TexassRound } from './constant';
import { Player } from './player';

describe('Texass-client test', () => {
  let playerA: Player;
  let playerB: Player;
  let playerC: Player;

  beforeEach(() => {
    playerA = buildMockPlayer('a');
    playerB = buildMockPlayer('b');
    playerC = buildMockPlayer('c');
  });

  describe('init game', () => {
    it('should be created given status', () => {
      const client = new TexassClient({} as TexassClientStatus);
      expect(client).toBeDefined();
    });
  });

  describe('end game', () => {
    it('should game over after RIVER round', () => {
      const client = new TexassClient({
        gameOver: false,
        round: TexassRound.RIVER,
        actionPlayer: playerA.id,
        waitingPlayers: [],
        exitPlayers: [],
        actedPlayers: [playerB.id, playerC.id],
        players: new Map([
          [playerA.id, playerA],
          [playerB.id, playerB],
          [playerC.id, playerC],
        ]),
        availableActions: new Map([[ActionType.FOLD, true]]),
      } as TexassClientStatus);
      client.action(playerA.id, ActionType.FOLD);
      expect(client.status.gameOver).toBeTruthy();
    });

    it('should game over when less than 1 player left', () => {
      const client = new TexassClient({
        gameOver: false,
        round: TexassRound.PRE_FLOP,
        actionPlayer: playerA.id,
        waitingPlayers: [],
        exitPlayers: [],
        actedPlayers: [playerB.id],
        players: new Map([
          [playerA.id, playerA],
          [playerB.id, playerB],
        ]),
        availableActions: new Map([[ActionType.FOLD, true]]),
      } as TexassClientStatus);
      client.action(playerA.id, ActionType.FOLD);
      expect(client.status.gameOver).toBeTruthy();
    });

    it('players can not take action when game over', () => {
      const client = new TexassClient({
        gameOver: true,
      } as TexassClientStatus);
      expect(() => {
        client.action(playerA.id, ActionType.FOLD);
      }).toThrowError(ERROR_MSG.GAME_OVER);
    });
  });

  describe('round', () => {
    it('should move to next round when no active player left after action', () => {
      const client = new TexassClient({
        round: TexassRound.PRE_FLOP,
        actionPlayer: playerA.id,
        waitingPlayers: [],
        exitPlayers: [],
        actedPlayers: [playerB.id, playerC.id],
        players: new Map([
          [playerA.id, playerA],
          [playerB.id, playerB],
          [playerC.id, playerC],
        ]),
        availableActions: new Map([[ActionType.FOLD, true]]),
      } as TexassClientStatus);
      client.action(playerA.id, ActionType.FOLD);
      expect(client.status.round).toEqual(TexassRound.FLOP);
    });
  });

  describe('action', () => {
    it('should throw error when action is not in availableActions', () => {
      const client = new TexassClient({
        round: TexassRound.PRE_FLOP,
        actionPlayer: playerA.id,
        waitingPlayers: [],
        exitPlayers: [],
        actedPlayers: [playerB.id, playerC.id],
        players: new Map([
          [playerA.id, playerA],
          [playerB.id, playerB],
          [playerC.id, playerC],
        ]),
        availableActions: new Map(),
      } as TexassClientStatus);
      expect(() => {
        client.action(playerA.id, ActionType.FOLD);
      }).toThrowError(ERROR_MSG.INVALID_ACTION);
    });
  });

  const buildMockPlayer = (
    id = 'a',
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
