type IDown = {
  [key in 'ArrowLeft' | 'ArrowRight' | 'ArrowUp']: boolean;
} & {
  unregister(): void;
};

export function trackKeys(keys: string[]) {
  let down: IDown = Object.create(null);
  function track(event: KeyboardEvent) {
    if (keys.includes(event.key)) {
      down[event.key] = event.type === 'keydown';
      event.preventDefault();
    }
  }
  window.addEventListener('keydown', track);
  window.addEventListener('keyup', track);

  down.unregister = () => {
    window.removeEventListener('keydown', track);
    window.removeEventListener('keyup', track);
  }

  return down;
}