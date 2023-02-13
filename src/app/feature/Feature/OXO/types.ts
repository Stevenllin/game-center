import { OXOValuesEnum } from "app/core/enum/feature/OXO";

export interface OXOBoard {
  round: OXOValuesEnum;
  status: string[];
  isEnd: boolean;
  winner: string;
}
