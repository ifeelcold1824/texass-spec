import { HoldemRound, Round } from '../src/round';
import { Player } from '../src/player';
import { Fold } from '../src/action/fold';
import { Check } from '../src/action/check';
import { Bet } from '../src/action/bet';
import { Raise } from '../src/action/raise';

describe('Round test', () => {
  let playerA: Player;
  let playerB: Player;
  let playerC: Player;

  beforeEach(() => {
    playerA = new Player('a', 'OUT', 100);
    playerB = new Player('b', 'ACTIVE', 100);
    playerC = new Player('c', 'ACTIVE', 100);
  });

  it('action player should be the first active player after init round', () => {
    const round = new Round([playerA, playerB, playerC], HoldemRound.PRE_FLOP);

    expect(round.activePlayers.length).toEqual(2);
    expect(round.actionPlayer.id).toEqual('b');
  });

  it('should init pool with null and init bet with 0 after init round', () => {
    const round = new Round([playerA, playerB, playerC], HoldemRound.PRE_FLOP);

    expect(round.currentBet).toEqual(0);
    expect(round.pool).toEqual(
      new Map([
        [playerB, 0],
        [playerC, 0],
      ]),
    );
  });

  it('fold will be mark as OUT and removed from active player', () => {
    const round = new Round([playerA, playerB, playerC], HoldemRound.PRE_FLOP);

    expect(round.actionPlayer.id).toEqual('b');
    round.execute(new Fold());

    expect(playerB.status).toEqual('OUT');
    expect(round.activePlayers).toHaveLength(1);
    expect(round.activePlayers).not.toEqual(
      expect.arrayContaining([expect.objectContaining({ id: 'b' })]),
    );
  });

  it('check will append action player to the bottom of active players', () => {
    const round = new Round([playerA, playerB, playerC], HoldemRound.PRE_FLOP);

    expect(round.actionPlayer.id).toEqual('b');
    round.execute(new Check());

    expect(playerB.status).toEqual('ACTIVE');
    expect(round.activePlayers).toHaveLength(2);
    expect(round.activePlayers[1].id).toEqual('b');
  });

  it('bet amount should be min wager if current bet is 0', () => {
    const round = new Round([playerA, playerB, playerC], HoldemRound.PRE_FLOP);

    expect(round.actionPlayer).toEqual(playerB);
    const originalBet = round.pool.get(playerB);
    const originalBalance = playerB.balance;
    round.currentBet = 0;
    round.execute(new Bet());

    expect(round.pool.get(playerB) - originalBet).toEqual(round.minWager);
    expect(originalBalance - playerB.balance).toEqual(round.minWager);
    expect(playerB.status).toEqual('ACTIVE');
    expect(round.activePlayers).toHaveLength(2);
    expect(round.activePlayers[1].id).toEqual('b');
  });

  it('bet amount should be the same to current be if current bet is not 0', () => {
    const round = new Round([playerA, playerB, playerC], HoldemRound.PRE_FLOP);

    expect(round.actionPlayer).toEqual(playerB);
    const originalBet = round.pool.get(playerB);
    const originalBalance = playerB.balance;
    const currentBet = 20;
    round.currentBet = currentBet;
    round.execute(new Bet());

    expect(round.pool.get(playerB) - originalBet).toEqual(currentBet);
    expect(originalBalance - playerB.balance).toEqual(currentBet);
    expect(playerB.status).toEqual('ACTIVE');
    expect(round.activePlayers).toHaveLength(2);
    expect(round.activePlayers[1].id).toEqual('b');
  });

  it('raise should update current bet', () => {
    const round = new Round([playerA, playerB, playerC], HoldemRound.PRE_FLOP);

    expect(round.actionPlayer).toEqual(playerB);
    const originalBet = round.pool.get(playerB);
    const originalBalance = playerB.balance;
    const currentBet = 20;
    const raiseAmount = 10;
    round.currentBet = currentBet;
    round.execute(new Raise(raiseAmount));

    expect(round.pool.get(playerB) - originalBet).toEqual(
      currentBet + raiseAmount,
    );
    expect(originalBalance - playerB.balance).toEqual(currentBet + raiseAmount);
    expect(playerB.status).toEqual('ACTIVE');
    expect(round.activePlayers).toHaveLength(2);
    expect(round.activePlayers[1].id).toEqual('b');
    expect(round.currentBet).toEqual(currentBet + raiseAmount);
  });
});
