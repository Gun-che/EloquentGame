import { elt } from "../helpers"
import { State } from "../State";
import { drawActors, drawGrid } from "../drawFunctions";
import { Level } from "../Level";
import { scale } from "../consts";

export class DOMDisplay {
  dom: HTMLElement;
  actorLayer: any;

  constructor(parent: HTMLElement, level: Level) {
    this.dom = elt('div', { class: 'game' }, drawGrid(level));
    this.actorLayer = null;
    parent.appendChild(this.dom);
  }

  clear() { this.dom.remove(); }

  syncState(state: State) {
    this.actorLayer?.remove()
    this.actorLayer = drawActors(state.actors);
    this.dom.appendChild(this.actorLayer);
    this.dom.className = `game ${state.status}`;
    this.scrollPlayerIntoView(state);
  };

  scrollPlayerIntoView(state: State) {
    let width = this.dom.clientWidth;
    let height = this.dom.clientHeight;
    let margin = width / 3;

    let left = this.dom.scrollLeft;
    let right = left + width;

    let top = this.dom.scrollTop;
    let bottom = top + height;

    let player = state.player;
    let center = player.pos.plus(player.size.times(0.5))
      .times(scale);

    if (center.x < left + margin) {
      this.dom.scrollLeft = center.x - margin;

    } else if (center.x > right - margin) {
      this.dom.scrollLeft = center.x + margin - width;
    }

    if (center.y < top + margin) {
      this.dom.scrollTop = center.y - margin;

    } else if (center.x > bottom - margin) {
      this.dom.scrollTop = center.y + margin - height;
    }
  };
}