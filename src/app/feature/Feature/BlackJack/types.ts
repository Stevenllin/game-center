import { SuitsTypeTextEnum, CardStateValuesEnum, RoundStateValuesEnum } from 'app/core/enum/feature/BlackJack';

export interface Player {
  balance: number;
  bet: number;
}

export interface PokerCard {
  value: string;
  suit: string | SuitsTypeTextEnum;
  state: CardStateValuesEnum;
}

export interface FormValues {
  bet: string;
}

export interface GameState {
  round: RoundStateValuesEnum;
  playerCards: PokerCard[],
  dealerCards: PokerCard[]
}

export interface History {
  result: string;
  bet: number;
}
