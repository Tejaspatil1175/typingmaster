import { useState, useEffect, useRef } from 'react';
import { cppSnippets } from '../cppSnippets';

export const TypingSimulator = () => {
  const [snippetIndex, setSnippetIndex] = useState(0);
  const snippet = cppSnippets[snippetIndex];

  const [input, setInput] = useState('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0); // in seconds
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [isCompleted, setIsCompleted] = useState(false);
  const [mistakes, setMistakes] = useState(0);
  const [focused, setFocused] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Reset when snippet changes
  useEffect(() => {
    resetSimulator();
  }, [snippetIndex]);

  // Handle timer
  useEffect(() => {
    if (startTime && !isCompleted) {
      timerRef.current = setInterval(() => {
        const elapsed = (Date.now() - startTime) / 1000;
        setElapsedTime(elapsed);
        calculateWpm(input, elapsed);
      }, 200);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startTime, isCompleted, input]);

  const resetSimulator = () => {
    setInput('');
    setStartTime(null);
    setElapsedTime(0);
    setWpm(0);
    setAccuracy(100);
    setIsCompleted(false);
    setMistakes(0);
    if (textareaRef.current) {
      textareaRef.current.value = '';
      textareaRef.current.focus();
    }
  };

  const calculateWpm = (currentInput: string, elapsedSeconds: number) => {
    if (elapsedSeconds <= 0) return;
    // Standard: 5 characters = 1 word
    const words = currentInput.length / 5;
    const minutes = elapsedSeconds / 60;
    const currentWpm = Math.round(words / minutes);
    setWpm(currentWpm);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    if (isCompleted) return;

    // Start timer on first keystroke
    if (!startTime && val.length > 0) {
      setStartTime(Date.now());
    }

    // Check if mistake was made (if the newly added character doesn't match)
    if (val.length > input.length) {
      const lastCharIndex = val.length - 1;
      const expectedChar = snippet.code[lastCharIndex];
      const typedChar = val[lastCharIndex];

      if (typedChar !== expectedChar) {
        setMistakes((prev) => prev + 1);
      }
    }

    setInput(val);

    // Calculate accuracy
    if (val.length > 0) {
      let correctChars = 0;
      for (let i = 0; i < val.length; i++) {
        if (val[i] === snippet.code[i]) {
          correctChars++;
        }
      }
      const acc = Math.round((correctChars / val.length) * 100);
      setAccuracy(acc);
    } else {
      setAccuracy(100);
    }

    // Check completion
    if (val.length === snippet.code.length) {
      setIsCompleted(true);
      const elapsed = startTime ? (Date.now() - startTime) / 1000 : 0;
      setElapsedTime(elapsed);
      calculateWpm(val, elapsed);
    }
  };

  const handleContainerClick = () => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  // Render highlighted characters of the snippet
  const renderCode = () => {
    const code = snippet.code;
    return code.split('').map((char, index) => {
      let className = 'char';
      
      if (index < input.length) {
        // Already typed
        className += input[index] === char ? ' char-correct' : ' char-incorrect';
      } else if (index === input.length) {
        // Current cursor position
        className += ' char-current';
        if (focused) className += ' blink';
      } else {
        // Upcoming characters
        className += ' char-upcoming';
      }

      // Format special characters for rendering
      if (char === '\n') {
        return (
          <span key={index} className={className}>
            {index === input.length ? '↵\n' : '\n'}
          </span>
        );
      }

      return (
        <span key={index} className={className}>
          {char}
        </span>
      );
    });
  };

  return (
    <div className="typing-simulator-container">
      {/* Top Controls: Snippet Selector and Info */}
      <div className="simulator-controls">
        <div className="snippet-selector">
          <label htmlFor="snippet-select">Choose DSA Snippet:</label>
          <select
            id="snippet-select"
            value={snippetIndex}
            onChange={(e) => setSnippetIndex(Number(e.target.value))}
            className="select-dropdown"
          >
            {cppSnippets.map((s, idx) => (
              <option key={s.id} value={idx}>
                {s.category} — {s.title} ({s.difficulty})
              </option>
            ))}
          </select>
        </div>

        {/* Complexity badges */}
        <div className="snippet-complexity">
          <span className="complexity-badge time">
            Time: <code>{snippet.complexity.time}</code>
          </span>
          <span className="complexity-badge space">
            Space: <code>{snippet.complexity.space}</code>
          </span>
        </div>
      </div>

      {/* Simulator Description Card */}
      <div className="snippet-desc-card">
        <span className={`difficulty-badge ${snippet.difficulty.toLowerCase()}`}>
          {snippet.difficulty}
        </span>
        <h3>{snippet.title}</h3>
        <p>{snippet.description}</p>
      </div>

      {/* Stats Dashboard */}
      <div className="stats-dashboard">
        <div className="stat-box">
          <span className="stat-label">WPM</span>
          <span className="stat-value">{wpm}</span>
        </div>
        <div className="stat-box">
          <span className="stat-label">Accuracy</span>
          <span className="stat-value">{accuracy}%</span>
        </div>
        <div className="stat-box">
          <span className="stat-label">Time</span>
          <span className="stat-value">{elapsedTime.toFixed(1)}s</span>
        </div>
        <div className="stat-box">
          <span className="stat-label">Mistakes</span>
          <span className="stat-value text-red">{mistakes}</span>
        </div>
      </div>

      {/* Hidden input to capture typing */}
      <textarea
        ref={textareaRef}
        className="hidden-textarea"
        value={input}
        onChange={handleInputChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        autoComplete="off"
        autoCapitalize="off"
        autoCorrect="off"
        spellCheck={false}
        maxLength={snippet.code.length}
        disabled={isCompleted}
      />

      {/* Code Terminal Visualizer */}
      <div
        className={`code-terminal ${focused ? 'focused' : ''} ${isCompleted ? 'completed' : ''}`}
        onClick={handleContainerClick}
      >
        <div className="terminal-header">
          <div className="terminal-buttons">
            <span className="dot red"></span>
            <span className="dot yellow"></span>
            <span className="dot green"></span>
          </div>
          <span className="terminal-title">{snippet.title.toLowerCase().replace(/\\s+/g, '_')}.cpp</span>
          <span className="terminal-lang">C++</span>
        </div>
        <div className="terminal-body">
          {!focused && input.length === 0 && (
            <div className="terminal-overlay">
              <p className="overlay-text">Click here to start typing!</p>
            </div>
          )}
          <pre className="cpp-code-pre">
            <code>{renderCode()}</code>
          </pre>
        </div>
      </div>

      {/* Actions and Finish state */}
      <div className="simulator-actions">
        <button className="btn-reset" onClick={resetSimulator}>
          Reset Practice
        </button>
        {isCompleted && (
          <div className="success-banner animate-fade-in">
            🎉 Completed! You mastered <strong>{snippet.title}</strong> at <strong>{wpm} WPM</strong> with <strong>{accuracy}%</strong> accuracy!
          </div>
        )}
      </div>
    </div>
  );
};
