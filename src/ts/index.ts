import { Vec } from './../Vec';
import { Lava } from './../actors/Lava';
import { Coin } from './../actors/Coin';
import { Player } from './../actors/Player';

export type ILavaCh = '=' | '|' | 'v';

export type ICh = '@' | '.' | '#' | '+' | 'o' | ILavaCh;

export type INameCh = 'wall' | Player | Coin | Lava | 'empty' | 'lava'

export type PLC = Player | Coin | Lava;

export interface IActor {
  create(pos: Vec, ch: string): Lava | Player | Coin;
  size: any;
  type: any;
  pos: any;
}