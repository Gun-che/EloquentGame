import { Vec } from './../Vec';
import { State } from '../State';
import { monsterSpeed } from '../consts';


export class Monster {
  pos: Vec;
  size: Vec;
  constructor(pos: Vec) {
    this.pos = pos;
    this.size = new Vec(1.2, 2);
  }

  get type() {
    return 'monster';
  }

  static create(pos: Vec): Monster {
    return new Monster(pos.plus(new Vec(0, -1)));
  }

  update(time: number, state: State): Monster {
    let player = state.player;
    let speed = (player.pos.x < this.pos.x ? -1 : 1) * time * monsterSpeed;
    let newPos = new Vec(this.pos.x + speed, this.pos.y);

    if (state.level.touches(newPos, this.size, 'wall')) {
      return this;

    } else {
      return new Monster(newPos)
    }
  }

  collide(state: State) {
    let player = state.player;
    if (player.pos.y + player.size.y < this.pos.y + 0.5) {
      let filtered = state.actors.filter(a => a != this);
      return new State(state.level, filtered, state.status);

    } else {
      return new State(state.level, state.actors, 'lost')
    }
  }
}