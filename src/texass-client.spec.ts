import { TexassClient } from './texass-client';
import { Player } from './player.interface';
import { ERROR_MSG } from './constant';

describe('Texass-client test', () => {
  describe('init game', () => {
    it('should be created given players', () => {
      const players = buildMockPlayers(2);
      const client = new TexassClient(players);
      expect(client).toBeDefined();
      expect(client.players).toEqual(players);
    });

    it('should thrown error given player less than 2', () => {
      expect(() => {
        new TexassClient(buildMockPlayers(1));
      }).toThrowError(ERROR_MSG.INVALID_PLAYER_NUMBER);
    });

    it('should thrown error given player greater than 10', () => {
      expect(() => {
        new TexassClient(buildMockPlayers(11));
      }).toThrowError(ERROR_MSG.INVALID_PLAYER_NUMBER);
    });
  });

  const buildMockPlayers = (playerCount: number) => {
    const players = [];
    for (let i = 0; i < playerCount; i++) {
      players.push(buildMockPlayer());
    }
    return players;
  };

  const buildMockPlayer = () => ({} as Player);
});
