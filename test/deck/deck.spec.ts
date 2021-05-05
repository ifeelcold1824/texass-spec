import { Deck } from '../../src/deck/deck';
import { Card } from '../../src/deck/card';

describe('deck test', () => {
  let deck: Deck;

  beforeEach(() => {
    deck = new Deck();
  });

  it('can draw card', () => {
    const res = deck.draw();
    expect(res[0]).toBeInstanceOf(Card);
  });

  it('should never draw 2 same card', () => {
    const card1 = deck.draw();
    const card2 = deck.draw();
    expect(card1).not.toEqual(card2);
  });

  it('should throw error when draw cards if no card in deck', () => {
    deck.draw(52);
    expect(() => {
      deck.draw();
    }).toThrowError('Cards in deck not enough');
  });

  it('2 deck should draw different cards', () => {
    const deckA = new Deck();
    const deckB = new Deck();
    expect(deckA.draw(52)).not.toEqual(deckB.draw(52));
  });
});
