export const ERROR_MSG = {
  GAME_OVER: 'GAME_OVER',
  INVALID_ACTION: 'INVALID_ACTION',
  BALANCE_INSUFFICIENT: 'BALANCE_INSUFFICIENT',
  INVALID_BET_AMOUNT: 'INVALID_BET_AMOUNT',
  INVALID_RAISE_AMOUNT: 'INVALID_RAISE_AMOUNT',
  GAME_IS_RUNNING: 'GAME_IS_RUNNING',
};

export enum HoldemRound {
  PRE_FLOP = 1,
  FLOP = 2,
  TURN = 3,
  RIVER = 4,
}

export enum ActionType {
  FOLD = 'FOLD',
  CHECK = 'CHECK',
  CALL = 'CALL',
  RAISE = 'RAISE',
  ALL_IN = 'ALL_IN',
}
