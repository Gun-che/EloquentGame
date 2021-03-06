import { gravity, jumpSpeed } from './../consts';
import { Vec } from '../Vec'
import { playerXSpeed } from '../consts';
import { State } from '../State';

export class Player {
  pos: Vec;
  speed: Vec;
  size: Vec;

  constructor(pos: Vec, speed: Vec) {
    this.pos = pos;
    this.speed = speed;
    this.size = new Vec(0.8, 1.5);
  }

  get type() { return 'player' }

  static create(pos: Vec) {
    return new Player(pos.plus(new Vec(0, -0.5)),
      new Vec(0, 0))
  }

  update(time: number, state: State, keys: any): Player {
    let xSpeed = 0;
    if (keys.ArrowLeft) {
      xSpeed -= playerXSpeed;
    }

    if (keys.ArrowRight) {
      xSpeed += playerXSpeed;
    }
    let pos = this.pos;
    let movedX = pos.plus(new Vec(xSpeed * time, 0));

    if (!state.level.touches(movedX, this.size, 'wall')) {
      pos = movedX;
    }

    let ySpeed = this.speed.y + time * gravity;
    let movedY = pos.plus(new Vec(0, ySpeed * time));

    if (!state.level.touches(movedY, this.size, 'wall')) {
      pos = movedY;

    } else if (keys.ArrowUp && ySpeed > 0) {
      ySpeed = -jumpSpeed;

    } else {
      ySpeed = 0;
    }
    return new Player(pos, new Vec(xSpeed, ySpeed));
  }
}