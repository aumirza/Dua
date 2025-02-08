export function waitUntil(
  condition: () => boolean,
  timeout: number = 10000,
  interval: number = 100
) {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();
    const check = () => {
      if (condition()) {
        resolve(true);
      } else if (Date.now() - startTime > timeout) {
        reject(new Error("Timeout"));
      } else {
        setTimeout(check, interval);
      }
    };
    check();
  });
}

export async function waitFor(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
