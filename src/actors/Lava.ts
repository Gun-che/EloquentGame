import { Vec } from '../Vec'
import { State } from '../State'
import { ILavaCh } from '../ts'

export class Lava {
  pos: Vec;
  speed: Vec;
  reset?: Vec;
  size: Vec;

  constructor(pos: Vec, speed: Vec, reset?: Vec) {
    this.speed = speed;
    this.pos = pos;
    this.reset = reset;
    this.size = new Vec(1, 1);
  }

  get type() {
    return 'lava';
  }

  static create(pos: Vec, ch: ILavaCh) {
    switch (ch) {
      case '=':
        return new Lava(pos, new Vec(2, 0));
      case '|':
        return new Lava(pos, new Vec(0, 2));
      case 'v':
        return new Lava(pos, new Vec(0, 3), pos);
    }
  }

  collide(state: State): State {
    return new State(state.level, state.actors, 'lost');
  };

  update(time: number, state: State): Lava {
    let newPos = this.pos.plus(this.speed.times(time));
    if (!state.level.touches(newPos, this.size, 'wall')) {
      return new Lava(newPos, this.speed, this.reset);

    } else if (this.reset) {
      return new Lava(this.reset, this.speed, this.reset);

    } else {
      return new Lava(this.pos, this.speed.times(-1));
    }
  }
}
