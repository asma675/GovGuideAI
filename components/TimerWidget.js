// components/TimerWidget.js
import { useEffect, useState } from "react";
import { speak } from "@/utils/tts";
import { useA11y } from "@/hooks/useA11y";

export default function TimerWidget() {
  const { lang } = useA11y();
  const [seconds, setSeconds] = useState(1500); // 25 mins default
  const [running, setRunning] = useState(false);

  const t = {
    en: {
      start: "Start Timer",
      pause: "Pause",
      reset: "Reset",
      finished: "Timer finished"
    },
    fr: {
      start: "Démarrer le minuteur",
      pause: "Pause",
      reset: "Réinitialiser",
      finished: "Minuteur terminé"
    }
  }[lang];

  useEffect(() => {
    let interval = null;
    if (running && seconds > 0) {
      interval = setInterval(() => setSeconds((s) => s - 1), 1000);
    }

    if (seconds === 0) {
      setRunning(false);
      speak(t.finished, lang);
    }

    return () => clearInterval(interval);
  }, [running, seconds]);

  function reset() {
    setSeconds(1500);
    setRunning(false);
  }

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  return (
    <div role="timer" aria-live="polite" className="timer-box">
      <h2>{mm}:{ss}</h2>

      <div className="button-row">
        <button className="btn-primary" onClick={() => setRunning(!running)}>
          {running ? t.pause : t.start}
        </button>

        <button className="btn" onClick={reset}>{t.reset}</button>
      </div>
    </div>
  );
}
