import { Holdem } from './holdem';
import { Player } from './player';
import { HoldemRound } from './constant';

describe('Texass-client test', () => {
  describe('init game', () => {
    it('first player should be action player when init game', () => {
      const client = new Holdem(new Player('a'));
      expect(client).toBeDefined();
      expect(client.actionPlayer.id).toEqual('a');
      expect(client.round).toEqual(HoldemRound.PRE_FLOP);
    });
  });
});
