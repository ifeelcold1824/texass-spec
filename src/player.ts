export interface Player {
  id: PlayerId;
  balance: number;
  blindBet?: number;
}

export type PlayerId = string;
