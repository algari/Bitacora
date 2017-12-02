import {Entry} from "./entry.model";
import {Exit} from "./exit.model";
import {Tag} from "./tag";
/**
 * Created by agalvis on 20/10/2017.
 */
export class Games {
  _id?:any;
  username:string;
  ticker:string;
  type:string;
  time_frame: string;
  strategy: string;
  source:string;
  commission: number;
  comments: string;
  result:string;
  neto: number;
  netoCmm:number;
  r: number;
  netoR:number;
  percentCaptured:number;
  aon:number;
  aonr:number;
  chart:string;
  maxMove:number;
  tags:String[];
  entries:Entry[] = [];
  exits:Exit[] = [];
  status:string;
}
