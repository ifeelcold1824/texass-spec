import { Holdem } from './holdem';
import { Player } from './player';

describe('Texass-client test', () => {
  describe('init game', () => {
    it('first player should be action player when init game', () => {
      const client = Holdem.initFromPlayers(new Player('a'));
      expect(client).toBeDefined();
      expect(client.actionPlayer).toEqual('a');
    });
  });
});
