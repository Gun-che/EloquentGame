import { wobbleDist, wobbleSpeed } from './../consts';
import { Vec } from '../Vec'
import { State } from '../State'

export class Coin {
  pos: Vec;
  basePos: Vec;
  wobble: number;
  size: Vec;

  constructor(pos: Vec, basePos: Vec, wobble: number) {
    this.pos = pos;
    this.basePos = basePos;
    this.wobble = wobble;
    this.size = new Vec(0.6, 0.6);
  }

  get type() {
    return 'coin';
  }

  static create(pos: Vec) {
    let basePos = pos.plus(new Vec(0.2, 0.1));
    return new Coin(basePos, basePos, Math.random() * Math.PI * 2)
  }

  collide(state: State): State {
    let filtred = state.actors.filter(a => a !== this);
    let status = state.status;

    if (!filtred.some(a => a.type === 'coin')) {
      status = 'won';
    }
    return new State(state.level, filtred, status);
  }

  update(time: number) {
    let wobble = this.wobble + time * wobbleSpeed;
    let wobblePos = Math.sin(wobble) * wobbleDist;

    return new Coin(this.basePos.plus(new Vec(0, wobblePos)), this.basePos, wobble);
  };
}
