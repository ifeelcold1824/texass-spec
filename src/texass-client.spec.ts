import { TexassClient, TexassClientStatus } from './texass-client';
import { Player } from './player';
import { ERROR_MSG, TexassRound } from './constant';
import { ActionType } from './ActionType';

describe('Texass-client test', () => {
  let mockPlayer1: Player;
  let mockPlayer2: Player;
  let mockPlayer3: Player;

  beforeEach(() => {
    mockPlayer1 = { id: '1', balance: 100 };
    mockPlayer2 = { id: '2', balance: 100 };
    mockPlayer3 = { id: '3', balance: 100 };
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
        actionPlayer: mockPlayer1,
        waitingPlayers: [],
        actedPlayers: [mockPlayer2, mockPlayer3],
        remainingPlayers: [mockPlayer1, mockPlayer2, mockPlayer3],
      } as TexassClientStatus);
      client.activePlayerAction(ActionType.FOLD);
      expect(client.status.gameOver).toBeTruthy();
    });

    it('should game over when less than 1 player left', () => {
      const client = new TexassClient({
        gameOver: false,
        round: TexassRound.PRE_FLOP,
        actionPlayer: mockPlayer1,
        waitingPlayers: [],
        actedPlayers: [mockPlayer2],
        remainingPlayers: [mockPlayer1, mockPlayer2],
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
        actionPlayer: mockPlayer1,
        waitingPlayers: [],
        actedPlayers: [mockPlayer2, mockPlayer3],
        remainingPlayers: [mockPlayer1, mockPlayer2, mockPlayer3],
      } as TexassClientStatus);
      client.activePlayerAction(ActionType.FOLD);
      expect(client.status.round).toEqual(TexassRound.FLOP);
    });
  });
});
