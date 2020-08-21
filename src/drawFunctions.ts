import { IActor } from './ts/index';
import { elt } from "./helpers";
import { Level } from "./Level";
import { scale } from "./consts";

export function drawGrid(level: Level) {
  return elt('table', {
    class: 'background',
    style: `width: ${level.width * scale}px`
  }, ...level.rows.map(row => elt('tr', { style: `height: ${scale}px` },
    ...row.map(type => elt('td', { class: type })))))
}

export function drawActors(actors: IActor[]) {
  return elt('div', {}, ...actors.map(actor => {
    let rect = elt('div', { class: `actor ${actor.type}` });
    rect.style.width = `${actor.size.x * scale}px`
    rect.style.height = `${actor.size.y * scale}px`
    rect.style.left = `${actor.pos.x * scale}px`
    rect.style.top = `${actor.pos.y * scale}px`
    return rect;
  }));
}
