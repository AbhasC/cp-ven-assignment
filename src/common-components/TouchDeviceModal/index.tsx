import { useEffect, useState } from "react";
import { TOUCH_MODAL_KEY } from "./constants";

export const TouchDeviceModal = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hasShown = localStorage.getItem(TOUCH_MODAL_KEY);
    if (hasShown) return;
    const isTouchOnly =
      navigator.maxTouchPoints > 0 &&
      window.matchMedia("(pointer: coarse)").matches &&
      !window.matchMedia("(pointer: fine)").matches;
    if (!isTouchOnly) {
      localStorage.setItem(TOUCH_MODAL_KEY, "true");
      return;
    }
    localStorage.setItem(TOUCH_MODAL_KEY, "true");
    setVisible(true);
    const timeout = window.setTimeout(() => {
      setVisible(false);
    }, 3000);
    return () => window.clearTimeout(timeout);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-bg/70 px-5 backdrop-blur-md">
      <div className="relative flex h-62.5 w-[clamp(300px,70vw,450px)] flex-col justify-between border border-text/15 bg-bg p-7 shadow-2xl sm:p-9">
        <div className="flex items-start justify-between">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-text-muted sm:text-xs">
            INTERACTIVE EXPERIENCE
          </span>
          <svg
            viewBox="0 0 20 20"
            className="-rotate-90 h-5 w-5 text-text"
            aria-hidden="true"
          >
            <circle
              cx="10"
              cy="10"
              r="8"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeDasharray="50.27"
              className="touch-modal-timer"
            />
          </svg>
        </div>
        <p className="max-w-84 font-display text-[clamp(1.5rem,4vw,2.25rem)] font-medium leading-[0.95] tracking-tighter text-text">
          For the full interactive experience, visit this site on a laptop or
          desktop.
        </p>
        <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.24em] text-text-muted">
          CONTINUING SHORTLY
        </p>
      </div>
    </div>
  );
};
