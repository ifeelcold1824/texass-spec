import { Player } from './player';
import { HoldemRound, Round } from './round';
import { Deck } from './deck/deck';
import { Card } from './deck/card';
import { Action } from './action/action';
import { Hand } from './hand/hand';

export class Holdem {
  private readonly deck = new Deck();
  rounds: Round[];
  communityCards: Card[] = [];

  constructor(public players: Player[]) {
    this.rounds = [new Round(this.players, HoldemRound.PRE_FLOP)];
    this.dealCards();
  }

  execute(action: Action) {
    if (this.gameOver) {
      throw new Error('can not take action when game over');
    }
    this.currentRound.execute(action);

    if (this.shouldSwitchRound) {
      this.nextRound();
    }
  }

  get sortedActivePlayerHandRanks() {
    return this.players
      .filter((player) => !player.isOut)
      .map((player): [Player, Hand] => [
        player,
        player.getMaxHand(this.communityCards),
      ])
      .reduce((pre, [curPlayer, curRank]) => {
        for (let i = 0; i <= pre.length; i++) {
          if (i === pre.length) {
            pre.push([curRank, [curPlayer]]);
            break;
          }
          const diff = curRank.compareTo(pre[i][0]);
          if (diff > 0) {
            pre.unshift([curRank, [curPlayer]]);
            break;
          }
          if (diff === 0) {
            pre[i][1].push(curPlayer);
            break;
          }
        }
        return pre;
      }, new Array<[Hand, Player[]]>());
  }

  get currentRound() {
    return this.rounds[0];
  }

  get pool() {
    return this.rounds
      .map((it) => it.pool)
      .reduce((accumulator, current) => {
        [...current.entries()].map(([player, bid]) => {
          accumulator.set(player, (accumulator.get(player) || 0) + bid);
        });
        return accumulator;
      });
  }

  get gameOver() {
    return this.isEndOfFinalRound || this.isPlayerLeftLessThan1;
  }

  private get isEndOfFinalRound() {
    return this.currentRound.isRoundOver && this.currentRound.isFinalRound;
  }

  private get isPlayerLeftLessThan1() {
    return this.currentRound.activePlayers.length <= 1;
  }

  private get shouldSwitchRound() {
    return this.currentRound.isRoundOver && !this.currentRound.isFinalRound;
  }

  private nextRound() {
    this.rounds.unshift(new Round(this.players, this.currentRound.roundId + 1));
  }

  private dealCards() {
    this.players.forEach((player) => {
      player.holeCards = this.deck.draw(2);
    });
    this.communityCards = this.deck.draw(3);
  }
}
