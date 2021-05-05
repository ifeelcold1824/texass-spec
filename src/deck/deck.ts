import { Card } from './card';
import { shuffle } from '../utils/shuffle';

export class Deck {
  private cards: Card[];

  constructor() {
    this.cards = [];
    for (let suit = 0; suit < 4; suit++) {
      for (let rank = 1; rank <= 13; rank++) {
        this.cards.push(new Card(rank, suit));
      }
    }
    shuffle(this.cards);
  }

  draw(number = 1) {
    if (this.cards.length < number) {
      throw new Error('Cards in deck not enough');
    }
    const cards = this.cards.slice(0, number);
    this.cards = this.cards.slice(number, this.cards.length);
    return cards;
  }
}
