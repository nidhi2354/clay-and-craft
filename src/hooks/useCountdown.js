import { useEffect, useState } from "react";

/**
 * Live countdown to a target timestamp.
 *
 * Returns padded strings so the caller renders digits directly, plus
 * `isOver` once the deadline passes. The interval is cleared on unmount
 * and stops ticking at zero rather than counting into negatives.
 *
 * @param {number|Date} target  Deadline as a timestamp or Date.
 */
const pad = (n) => String(Math.max(0, n)).padStart(2, "0");

const useCountdown = (target) => {
  const deadline = target instanceof Date ? target.getTime() : target;

  const compute = () => {
    const remaining = deadline - Date.now();

    if (remaining <= 0) {
      return { hours: "00", minutes: "00", seconds: "00", isOver: true };
    }

    const totalSeconds = Math.floor(remaining / 1000);

    return {
      hours: pad(Math.floor(totalSeconds / 3600)),
      minutes: pad(Math.floor((totalSeconds % 3600) / 60)),
      seconds: pad(totalSeconds % 60),
      isOver: false,
    };
  };

  const [time, setTime] = useState(compute);

  useEffect(() => {
    const id = setInterval(() => {
      const next = compute();
      setTime(next);
      if (next.isOver) clearInterval(id);
    }, 1000);

    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deadline]);

  return time;
};

export default useCountdown;
