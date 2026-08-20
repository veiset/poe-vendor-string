import { useEffect, useRef } from 'react';

const ONE_HOUR_IN_MS = 60 * 60 * 1000;
const TWELVE_HOURS_IN_MS = 12 * 60 * 60 * 1000;

export const useRefreshOnFocus = (timeout = ONE_HOUR_IN_MS) => {
  const lastFocusTime = useRef(Date.now());

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        const now = Date.now();
        const timeElapsed = now - lastFocusTime.current;

        if (timeElapsed > timeout) {
          // Refresh the page
          window.location.reload();
        } else {
          // Update the timestamp so the 2-hour window starts fresh
          lastFocusTime.current = now;
        }
      }
    };

    window.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [timeout]);
};


export const useRefreshFromInitialLoad = (timeout = TWELVE_HOURS_IN_MS) => {
  // Captured once when the component mounts
  const mountTime = useRef(Date.now());

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        const now = Date.now();
        const timeSinceLoad = now - mountTime.current;

        if (timeSinceLoad > timeout) {
          window.location.reload();
        }
      }
    };

    window.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [timeout]);
};