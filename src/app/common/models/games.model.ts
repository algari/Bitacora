import {Symbol} from "./symbol.model";
import {Strategie} from "./strategie.model";
/**
 * Created by agalvis on 20/10/2017.
 */
export class Games {
  bitacora_id?: number;
  date_in: string;
  quantity: number;
  type:string;
  price_in: number;
  time_frame: string;
  price_out: number;
  date_out: string;
  commission: number;
  comments: string;
  symbol:Symbol;
  strategie: Strategie;
  result:string;
  neto: number;
  netoCmm:number;
}
