export const deepCompareNumericArray = (
  a: number[],
  b: number[],
  index = 0,
): number => {
  if (index > a.length) {
    return 0;
  }
  if (a[index] !== b[index]) {
    return a[index] - b[index];
  }
  return deepCompareNumericArray(a, b, index + 1);
};

export const getAllCombinations = <T>(array: T[], length: number) => {
  const res: T[][] = [];
  const recur = (currentCards: T[], cards: T[]) => {
    for (let i = 0; i < cards.length; i++) {
      if (currentCards.length === length - 1) {
        res.push([cards[i], ...currentCards]);
      }
      recur([...currentCards, cards[i]], cards.slice(i + 1));
    }
  };
  recur([], array);
  return res;
};
