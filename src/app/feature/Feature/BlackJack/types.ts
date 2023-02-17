import { SuitsTypeTextEnum, CardStateValuesEnum, RoundStateValuesEnum, ResultTypeValuesEnum } from 'app/core/enum/feature/BlackJack';

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

export interface Record {
  result: ResultTypeValuesEnum;
  bet: number;
  balance: number;
}
