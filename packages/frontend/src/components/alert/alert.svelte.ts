import type { AlertOptions } from "./types";

let alert = $state<AlertOptions | null>(null);
let timer: ReturnType<typeof setTimeout> | null = null;

export function getAlert() {
  return {
    get current() {
      return alert;
    },
  };
}

/**
 * Usage example
 * ```typescript
 * const { sendAlert } = useAlert();
 *
 * sendAlert({
 *   message: "Profile saved successfully!",
 *   type: "success",
 *   duration: 3000
 * });
 * ```
 */
export function sendAlert(options: AlertOptions) {
  _clearTimer();

  alert = options;

  timer = setTimeout(
    () => {
      alert = null;
    },
    (options.duration ?? 1000) + 300,
  );
}

export function clearAlert() {
  alert = null;
  _clearTimer();
}

function _clearTimer() {
  if (timer) {
    clearTimeout(timer);
    timer = null;
  }
}
