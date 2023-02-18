import { OXOValuesEnum } from "app/core/enum/feature/OXO";

export interface OXOBoard {
  round: OXOValuesEnum;
  status: string[];
  isEnd: boolean;
  winner: string;
}

export interface Record {
  OPlayer: number;
  XPlayer: number; 
}
