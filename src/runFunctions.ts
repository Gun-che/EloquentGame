import { Level } from "./Level";
import { DOMDisplay } from "./Displays/DOMDisplay";
import { State } from "./State";
import { trackKeys } from './Listener'

const arrowKeys = trackKeys(['ArrowLeft', 'ArrowRight', 'ArrowUp']);

export function runAnimation(frameFunc: any) {
  let lastTime = null;
  function frame(time: number) {
    if (lastTime !== null) {
      let timeStep = Math.min(time - lastTime, 100) / 1000;
      if (frameFunc(timeStep) === false) return;
    }
    lastTime = time;
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
};

export function runLevel(level: Level, Display: typeof DOMDisplay) {
  let display = new Display(document.body, level);
  let state = State.start(level);
  let ending = 1;
  return new Promise(resolve => {
    runAnimation(time => {
      state = state.update(time, arrowKeys);
      display.syncState(state);

      if (state.status === 'playing') {
        return true;

      } else if (ending > 0) {
        ending -= time;
        return true;

      } else {
        display.clear();
        resolve(state.status);
        return false;
      }
    });
  });
}

export async function runGame(plans: string[], Display: typeof DOMDisplay) {
  let lifes = 5;
  for (let level = 0; level < plans.length;) {
    let status = await runLevel(new Level(plans[level]), Display);
    if (status === 'won') level++;
    if (status === 'lost') {
      console.log(`${--lifes} жизней`);
      if (lifes === 0) {
        console.log('ты проиграл');
        level = 0;
        lifes = 5;
      }
    }
  }
  console.log('ты победил!');
}
