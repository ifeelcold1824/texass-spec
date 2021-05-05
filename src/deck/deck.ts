import { Card } from './card';
import { shuffle } from '../utils/shuffle';

export class Deck {
  private readonly cards: Card[];

  constructor() {
    this.cards = [];
    for (let suit = 0; suit < 4; suit++) {
      for (let rank = 1; rank <= 13; rank++) {
        this.cards.push(new Card(rank, suit));
      }
    }
    shuffle(this.cards);
  }

  draw() {
    if (!this.cards.length) {
      throw new Error('Empty deck');
    }
    return this.cards.shift();
  }
}
