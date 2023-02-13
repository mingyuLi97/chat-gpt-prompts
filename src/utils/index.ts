export function throttle(fn: (...args: any[]) => any, time: number) {
  let pre = new Date().getTime();
  let timer: NodeJS.Timer;
  return function (...args: any[]) {
    const now = new Date().getTime();
    if (now >= pre + time) {
      // @ts-ignore
      fn.apply(this, args);
      pre = now;
    } else {
      timer && clearTimeout(timer);
      timer = setTimeout(() => {
        // @ts-ignore
        fn.apply(this, args);
      }, time);
    }
  };
}
