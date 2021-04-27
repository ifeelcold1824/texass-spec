import { TexassClient, TexassClientStatus } from './texass-client';
import { ERROR_MSG, TexassRound } from './constant';
import { ActionType } from './ActionType';

describe('Texass-client test', () => {
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
        actionPlayer: 'a',
        waitingPlayers: [],
        actedPlayers: ['b', 'c'],
        remainingPlayers: ['a', 'b', 'c'],
        availableActions: [ActionType.FOLD],
      } as TexassClientStatus);
      client.activePlayerAction(ActionType.FOLD);
      expect(client.status.gameOver).toBeTruthy();
    });

    it('should game over when less than 1 player left', () => {
      const client = new TexassClient({
        gameOver: false,
        round: TexassRound.PRE_FLOP,
        actionPlayer: 'a',
        waitingPlayers: [],
        actedPlayers: ['b'],
        remainingPlayers: ['a', 'b'],
        availableActions: [ActionType.FOLD],
      } as TexassClientStatus);
      client.activePlayerAction(ActionType.FOLD);
      expect(client.status.gameOver).toBeTruthy();
    });

    it('players can not take action when game over', () => {
      const client = new TexassClient({
        gameOver: true,
      } as TexassClientStatus);
      expect(() => {
        client.activePlayerAction(ActionType.FOLD);
      }).toThrowError(ERROR_MSG.GAME_OVER);
    });
  });

  describe('round', () => {
    it('should move to next round when no active player left after action', () => {
      const client = new TexassClient({
        round: TexassRound.PRE_FLOP,
        actionPlayer: 'a',
        waitingPlayers: [],
        actedPlayers: ['b', 'c'],
        remainingPlayers: ['a', 'b', 'c'],
        availableActions: [ActionType.FOLD],
      } as TexassClientStatus);
      client.activePlayerAction(ActionType.FOLD);
      expect(client.status.round).toEqual(TexassRound.FLOP);
    });
  });

  describe('action', () => {
    it('should throw error when action is not in availableActions', () => {
      const client = new TexassClient({
        round: TexassRound.PRE_FLOP,
        actionPlayer: 'a',
        waitingPlayers: [],
        actedPlayers: ['b', 'c'],
        remainingPlayers: ['a', 'b', 'c'],
        availableActions: [],
      } as TexassClientStatus);
      expect(() => {
        client.activePlayerAction(ActionType.FOLD);
      }).toThrowError(ERROR_MSG.INVALID_ACTION);
    });
  });
});
