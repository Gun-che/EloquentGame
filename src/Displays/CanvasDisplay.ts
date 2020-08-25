import { IActor } from './../ts/index';
import { Player } from './../actors/Player';
import { State } from './../State';
import { Level } from "../Level";
import { scale, playerXOverlap } from "../consts";

export class CanvasDisplay {
  canvas: HTMLCanvasElement;
  cx: CanvasRenderingContext2D;
  flipPlayer: boolean;
  viewport: {
    left: number;
    top: number;
    width: number;
    height: number;
  };
  otherSprites: HTMLImageElement;
  playerSprites: HTMLImageElement;

  constructor(parent: HTMLElement, level: Level) {
    this.canvas = document.createElement('canvas');
    this.canvas.width = Math.min(600, level.width * scale);
    this.canvas.height = Math.min(450, level.height * scale);
    parent.appendChild(this.canvas);

    this.cx = this.canvas.getContext('2d');
    this.flipPlayer = false;
    this.viewport = {
      left: 0,
      top: 0,
      width: this.canvas.width / scale,
      height: this.canvas.height / scale,
    };

    this.otherSprites = document.createElement('img');
    this.otherSprites.src = 'sprites.png';
    this.playerSprites = document.createElement('img');
    this.playerSprites.src = 'player.png';
  }

  clear() {
    this.canvas.remove();
  }

  syncState(state: State) {
    this.updateViewport(state);
    this.clearDisplay(state.status);
    this.drawBackground(state.level);
    this.drawActors(state.actors);
  };

  updateViewport(state: State) {
    let view = this.viewport,
      margin = view.width / 3,
      player = state.player,
      center = player.pos.plus(player.size.times(0.5));

    if (center.x < view.left + margin) {
      view.left = Math.max(center.x - margin, 0);

    } else if (center.x > view.left + view.width - margin) {
      view.left = Math.min(center.x + margin - view.width,
        state.level.width - view.width);
    }

    if (center.y < view.top + margin) {
      view.top = Math.max(center.y - margin, 0);

    } else if (center.y > view.top + view.height - margin) {
      view.top = Math.min(center.y + margin - view.height,
        state.level.height - view.height);
    }
  };

  clearDisplay(status: string) {
    switch (status) {
      case 'won':
        this.cx.fillStyle = 'rgb(68, 190, 255)';
        break;

      case 'lost':
        this.cx.fillStyle = 'rgb(44, 130, 215)';
        break;

      default:
        this.cx.fillStyle = 'rgb(52, 166, 250)';
        break;
    }
    this.cx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  };

  drawBackground(level: Level) {
    let { left, top, width, height } = this.viewport;
    let xStart = Math.floor(left);
    let xEnd = Math.ceil(left + width);
    let yStart = Math.floor(top);
    let yEnd = Math.ceil(top + height);

    for (let y = yStart; y < yEnd; y++) {
      for (let x = xStart; x < xEnd; x++) {
        let tile = level.rows[y][x];
        if (tile === 'empty') continue;
        let screenX = (x - left) * scale;
        let screenY = (y - top) * scale;
        let tileX = tile === 'lava' ? scale : 0;
        this.cx.drawImage(this.otherSprites,
          tileX,
          0,
          scale,
          scale,
          screenX,
          screenY,
          scale,
          scale);
      }
    }
  }

  drawPlayer(player: Player, x: number, y: number, width: number, height: number) {
    width += playerXOverlap * 2;
    x -= playerXOverlap;

    if (player.speed.x !== 0) {
      this.flipPlayer = player.speed.x < 0;
    }

    let tile = 8;
    if (player.speed.y !== 0) {
      tile = 9;

    } else if (player.speed.x !== 0) {
      tile = Math.floor(Date.now() / 60) % 8;
    }

    this.cx.save();

    if (this.flipPlayer) {
      this.flipHorizontally(this.cx, x + width / 2);
    }

    let tileX = tile * width;
    this.cx.drawImage(this.playerSprites,
      tileX,
      0,
      width,
      height,
      x,
      y,
      width,
      height);
    this.cx.restore();
  }

  drawActors(actors: any[]) {
    for (let actor of actors) {
      let width = actor.size.x * scale;
      let height = actor.size.y * scale;
      let x = (actor.pos.x - this.viewport.left) * scale;
      let y = (actor.pos.y - this.viewport.top) * scale;

      if (actor.type === 'player') {
        this.drawPlayer((actor as Player), x, y, width, height);

      } else {
        let tileX = (actor.type === 'coin' ? 2 : 1) * scale;
        this.cx.drawImage(this.otherSprites,
          tileX,
          0,
          width,
          height,
          x,
          y,
          width,
          height);
      }
    }
  };

  flipHorizontally(context: CanvasRenderingContext2D, around: number) {
    context.translate(around, 0);
    context.scale(-1, 1);
    context.translate(-around, 0)
  }
}

