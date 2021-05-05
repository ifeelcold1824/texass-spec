import { Deck } from '../src/deck/deck';
import { Card } from '../src/deck/card';

describe('deck test', () => {
  let deck: Deck;

  beforeEach(() => {
    deck = new Deck();
  });

  it('can draw card', () => {
    const res = deck.draw();
    expect(res).toBeInstanceOf(Card);
  });

  it('should never draw 2 same card', () => {
    const card1 = deck.draw();
    const card2 = deck.draw();
    expect(card1).not.toEqual(card2);
  });

  it('should throw error when draw cards if no card in deck', () => {
    draw52Cards(deck);
    expect(() => {
      deck.draw();
    }).toThrowError('Empty deck');
  });

  it('2 deck should draw different cards', () => {
    const deckA = new Deck();
    const deckB = new Deck();
    expect(draw52Cards(deckA)).not.toEqual(draw52Cards(deckB));
  });

  const draw52Cards = (deck: Deck) => {
    const cards: Card[] = new Array(52);
    for (let i = 0; i < 52; i++) {
      cards[i] = deck.draw();
    }
    return cards;
  };
});
