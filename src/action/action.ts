import { Round } from '../round';
import { Player } from '../player';

export abstract class Action {
  execute(round: Round, player: Player) {
    if (!this.validate(round, player)) {
      throw new Error('Invalid action');
    }
    this.executeFn(round, player);
  }

  protected abstract validate(round: Round, player: Player): boolean;

  protected abstract executeFn(round: Round, player: Player);
}
