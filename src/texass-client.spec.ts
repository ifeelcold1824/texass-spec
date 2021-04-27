import { TexassClient } from './texass-client';
import { Player } from './player.interface';
import { ERROR_MSG, TexassStatus } from './constant';

describe('Texass-client test', () => {
  describe('init game', () => {
    it('should be created given players', () => {
      const players = buildMockPlayers(2);
      const client = new TexassClient(players);
      expect(client).toBeDefined();
    });

    it('should thrown error given player less than 2', () => {
      expect(() => {
        new TexassClient(buildMockPlayers(1));
      }).toThrowError(ERROR_MSG.INVALID_PLAYER_COUNT);
    });

    it('should thrown error given player greater than 10', () => {
      expect(() => {
        new TexassClient(buildMockPlayers(11));
      }).toThrowError(ERROR_MSG.INVALID_PLAYER_COUNT);
    });

    it('players can not take action when round is END', () => {
      const players = buildMockPlayers(2);
      const client = new TexassClient(players);
      client.round = TexassStatus.END;
      expect(() => {
        client.activePlayerAction();
      }).toThrowError(ERROR_MSG.GAME_OVER);
    });

    it('should move to next round when no active player left after action', () => {
      const players = buildMockPlayers(2);
      const client = new TexassClient(players);
      client.round = TexassStatus.RIVER;
      client.activePlayerAction();
      client.activePlayerAction();
      expect(client.round).toEqual(TexassStatus.END);
    });
  });

  const buildMockPlayers = (playerCount: number) => {
    const players = [];
    for (let i = 0; i < playerCount; i++) {
      players.push(buildMockPlayer());
    }
    return players;
  };

  const buildMockPlayer = () => ({ balance: 100 } as Player);
});
