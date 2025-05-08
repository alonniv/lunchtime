import { flushSync } from "react-dom";
import { useState, useEffect } from "react";
import "./index.css";

function getCurrentTime() {
  const date = new Date();
  return {
    minutes: date.getMinutes(),
    hours: date.getHours(),
  };
}

function getDescription(time: ReturnType<typeof getCurrentTime>) {
  if (time.hours === 12) {
    return "Lunchtime!";
  }
  if (time.hours === 11 && time.minutes >= 30) {
    return "It's nearly lunchtime";
  }
  if (time.hours === 15 && time.minutes <= 30) {
    return "It's coffee time ☕";
  }
  if (time.hours >= 15) {
    return "Past last coffee, go home"
  }
  if (time.hours > 12) {
    return "It's past lunchtime";
  }
  return "You should be thinking about lunchtime";
}

export function App() {
  const [time, setTime] = useState(() => getCurrentTime());
  useEffect(() => {
    const interval = setInterval(() => {
      document.startViewTransition(() =>
        flushSync(() => setTime(getCurrentTime())),
      );
    }, 1_000);

    return () => clearInterval(interval);
  }, []);

  const word =
    time.hours === 12
      ? "now"
      : time.hours === 11 && time.minutes >= 30
        ? "nearly"
        : time.hours > 12
          ? "past"
          : "getting close to";

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-slate-50 text-center text-neutral-950 dark:bg-slate-900 dark:text-neutral-50">
      <h1 className="text-4xl uppercase">{getDescription(time)}</h1>
      <div className="grid grid-cols-1">
        <p className="col-start-1 row-start-1 font-mono text-8xl tabular-nums opacity-10">
          00:00
        </p>
        <p className="col-start-1 row-start-1 font-mono text-8xl tabular-nums opacity-10">
          88:88
        </p>
        <p className="z-10 col-start-1 row-start-1 font-mono text-8xl tabular-nums">
          {time.hours.toString().padStart(2, "0")}:
          {time.minutes.toString().padStart(2, "0")}
        </p>
      </div>
    </div>
  );
}

export default App;
