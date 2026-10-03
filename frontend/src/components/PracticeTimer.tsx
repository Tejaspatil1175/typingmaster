import { useState, useEffect, useRef } from 'react';
import type { DSAQuestion } from '../dsaQuestions';

interface PracticeTimerProps {
  activeQuestion: DSAQuestion | null;
  onClearActive: () => void;
}

export const PracticeTimer = ({ activeQuestion, onClearActive }: PracticeTimerProps) => {
  const [selectedMinutes, setSelectedMinutes] = useState<number>(25);
  const [timeLeft, setTimeLeft] = useState<number>(25 * 60);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const timerRef = useRef<number | null>(null);

  // Play a gentle audio tone when timer finishes using Web Audio API
  const playChime = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.3); // A5
      gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 1.2);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 1.2);
    } catch {
      // AudioContext may be restricted by autoplay policy
    }
  };

  // Reset when user selects different preset minutes
  const handleSelectMinutes = (mins: number) => {
    setSelectedMinutes(mins);
    setTimeLeft(mins * 60);
    setIsRunning(false);
  };

  useEffect(() => {
    if (activeQuestion) {
      setIsOpen(true);
      setTimeLeft(selectedMinutes * 60);
      setIsRunning(true);
    }
  }, [activeQuestion, selectedMinutes]);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = window.setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            if (timerRef.current) clearInterval(timerRef.current);
            playChime();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const progressPct = ((selectedMinutes * 60 - timeLeft) / (selectedMinutes * 60)) * 100;

  return (
    <div className={`practice-timer-floater ${isOpen ? 'expanded' : 'collapsed'}`}>
      {!isOpen ? (
        <button
          className="btn-timer-trigger"
          onClick={() => setIsOpen(true)}
          title="Open Practice Stopwatch"
        >
          <span className="timer-icon">⏱️</span>
          <span className="timer-digits-preview">{formatTime(timeLeft)}</span>
          {isRunning && <span className="timer-live-dot"></span>}
        </button>
      ) : (
        <div className="timer-panel">
          <div className="timer-header">
            <div className="timer-title-box">
              <span className="timer-icon">⏱️</span>
              <span className="timer-title">20–30 Min Practice Timer</span>
            </div>
            <button
              className="btn-timer-close"
              onClick={() => setIsOpen(false)}
              title="Minimize timer"
            >
              ✕
            </button>
          </div>

          {activeQuestion && (
            <div className="timer-active-question">
              <span className="timer-q-badge">#{activeQuestion.lcNumber}</span>
              <span className="timer-q-title">{activeQuestion.title}</span>
              <button
                className="btn-timer-q-clear"
                onClick={onClearActive}
                title="Detach question"
              >
                ✕
              </button>
            </div>
          )}

          <div className="timer-clock-display">
            <div className={`timer-digits ${timeLeft === 0 ? 'time-up' : ''}`}>
              {formatTime(timeLeft)}
            </div>
            <div className="timer-progress-track">
              <div
                className="timer-progress-fill"
                style={{ width: `${progressPct}%` }}
              ></div>
            </div>
            {timeLeft === 0 && (
              <div className="time-up-notice">
                🎉 Time is up! Review your approach or check the editorial.
              </div>
            )}
          </div>

          <div className="timer-preset-row">
            {[15, 20, 25, 30].map((mins) => (
              <button
                key={mins}
                className={`timer-preset-btn ${selectedMinutes === mins ? 'active' : ''}`}
                onClick={() => handleSelectMinutes(mins)}
              >
                {mins}m
              </button>
            ))}
          </div>

          <div className="timer-controls-row">
            <button
              className={`btn-timer-toggle ${isRunning ? 'running' : 'paused'}`}
              onClick={() => setIsRunning(!isRunning)}
            >
              {isRunning ? '⏸ Pause' : timeLeft === 0 ? '🔄 Restart' : '▶ Start'}
            </button>
            <button
              className="btn-timer-reset"
              onClick={() => {
                setIsRunning(false);
                setTimeLeft(selectedMinutes * 60);
              }}
            >
              Reset
            </button>
          </div>

          <div className="timer-helper-tip">
            💡 "Solve each problem yourself for 20 to 30 minutes before checking the editorial."
          </div>
        </div>
      )}
    </div>
  );
};
