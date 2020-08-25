import { Level } from "./Level";
import { DOMDisplay } from "./Displays/DOMDisplay";
import { State } from "./State";
import { trackKeys } from './Listener'
import { CanvasDisplay } from "./Displays/CanvasDisplay";


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

export function runLevel(level: Level, Display: typeof DOMDisplay | typeof CanvasDisplay) {
  let display = new Display(document.body, level);
  let state = State.start(level);
  let ending = 1;
  let running: 'yes' | 'no' | 'pausing' = 'yes'
  const arrowKeys = trackKeys(['ArrowLeft', 'ArrowRight', 'ArrowUp']);

  return new Promise(resolve => {
    function escHandler(event: KeyboardEvent) {

      if (event.key !== 'Escape') return;
      event.preventDefault();

      if (running === 'no') {
        running = 'yes';
        runAnimation(frame);

      } else if (running = 'yes') {
        running = 'pausing';

      } else {
        running = 'yes'
      }
    }
    window.addEventListener('keydown', escHandler)

    function frame(time: number) {

      if (running === 'pausing') {
        running = 'no';
        return false;

      }
      state = state.update(time, arrowKeys);
      display.syncState(state);

      if (state.status === 'playing') {
        return true;

      } else if (ending > 0) {
        ending -= time;
        return true;

      } else {
        display.clear();
        window.removeEventListener('keydown', escHandler);
        arrowKeys.unregister();
        resolve(state.status);
        return false;
      }

    }

    runAnimation(frame);
  });
}

export async function runGame(plans: string[], Display: typeof DOMDisplay | typeof CanvasDisplay) {
  let lives = 5;
  for (let level = 0; level < plans.length;) {
    let status = await runLevel(new Level(plans[level]), Display);
    if (status === 'won') level++;
    if (status === 'lost') {
      console.log(`${--lives} жизней`);
      if (lives === 0) {
        console.log('ты проиграл');
        level = 0;
        lives = 5;
      }
    }
  }
  console.log('ты победил!');
}
