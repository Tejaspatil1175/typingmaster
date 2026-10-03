import { useState } from 'react';
import type { DSAQuestion } from '../dsaQuestions';

interface QuestionDetailModalProps {
  question: DSAQuestion;
  isSolved: boolean;
  isBookmarked: boolean;
  note: string;
  onToggleSolved: (id: string) => void;
  onToggleBookmark: (id: string) => void;
  onSaveNote: (id: string, noteText: string) => void;
  onStartTimer: (question: DSAQuestion) => void;
  onClose: () => void;
}

export const QuestionDetailModal = ({
  question,
  isSolved,
  isBookmarked,
  note,
  onToggleSolved,
  onToggleBookmark,
  onSaveNote,
  onStartTimer,
  onClose
}: QuestionDetailModalProps) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [localNote, setLocalNote] = useState<string>(note);
  const [activeTab, setActiveTab] = useState<'solution' | 'notes'>('solution');

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(question.codeSnippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  const handleNoteBlur = () => {
    onSaveNote(question.id, localNote);
  };

  const leetcodeUrl = `https://leetcode.com/problems/${question.slug}/`;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <div className="modal-header-left">
            <span className="modal-lc-num">#{question.lcNumber}</span>
            <div className="modal-title-group">
              <h2 className="modal-title">{question.title}</h2>
              <div className="modal-meta-pills">
                <span className={`diff-pill ${question.difficulty.toLowerCase()}`}>
                  {question.difficulty}
                </span>
                <span className="modal-topic-pill">{question.topicName}</span>
                <span className="modal-stat-pill">⚡ {question.timeComplexity}</span>
                <span className="modal-stat-pill">💾 {question.spaceComplexity}</span>
              </div>
            </div>
          </div>

          <div className="modal-header-actions">
            <button
              className={`btn-action-star ${isBookmarked ? 'starred' : ''}`}
              onClick={() => onToggleBookmark(question.id)}
              title={isBookmarked ? 'Bookmarked' : 'Add to Bookmarks'}
            >
              {isBookmarked ? '★ Starred' : '☆ Star'}
            </button>
            <button
              className={`btn-action-solve ${isSolved ? 'solved' : ''}`}
              onClick={() => onToggleSolved(question.id)}
            >
              {isSolved ? '✓ Solved' : 'Mark Solved'}
            </button>
            <button className="btn-modal-close" onClick={onClose} title="Close (Esc)">
              ✕
            </button>
          </div>
        </div>

        {/* Modal Quick Links Bar */}
        <div className="modal-quick-bar">
          <a
            href={leetcodeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-open-leetcode"
          >
            <span>Open Problem on LeetCode ↗</span>
          </a>
          <button
            className="btn-modal-timer"
            onClick={() => onStartTimer(question)}
          >
            <span>⏱️ Start 25m Timer</span>
          </button>
          <div className="modal-tabs">
            <button
              className={`tab-btn ${activeTab === 'solution' ? 'active' : ''}`}
              onClick={() => setActiveTab('solution')}
            >
              Approach & C++ Solution
            </button>
            <button
              className={`tab-btn ${activeTab === 'notes' ? 'active' : ''}`}
              onClick={() => setActiveTab('notes')}
            >
              My Notes {localNote.trim() && '•'}
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="modal-body-scroll">
          {activeTab === 'solution' ? (
            <>
              {/* Intuition Box */}
              <div className="intuition-card">
                <div className="card-badge-row">
                  <span className="card-badge-title">🧠 Core Intuition & Strategy</span>
                </div>
                <p className="intuition-text">{question.keyIntuition}</p>
              </div>

              {/* Specific C++ Tip */}
              <div className="cpp-tip-card">
                <div className="card-badge-row">
                  <span className="card-badge-title">💡 C++ Best Practice</span>
                </div>
                <p className="cpp-tip-text">{question.cppTip}</p>
              </div>

              {/* Code Snippet */}
              <div className="code-solution-block">
                <div className="code-block-header">
                  <div className="code-header-left">
                    <span className="code-lang-label">C++ (Optimal)</span>
                    <span className="code-complexity-badge">{question.timeComplexity} Time • {question.spaceComplexity} Space</span>
                  </div>
                  <button className="btn-copy-code" onClick={handleCopyCode}>
                    {copied ? '✓ Copied to Clipboard!' : '📋 Copy Code'}
                  </button>
                </div>
                <pre className="code-pre">
                  <code>{question.codeSnippet}</code>
                </pre>
              </div>
            </>
          ) : (
            <div className="notes-editor-container">
              <label className="notes-label">
                Personal Notes & Edge Cases for LeetCode #{question.lcNumber}
              </label>
              <textarea
                className="notes-textarea"
                placeholder="Write down gotchas, edge cases you missed, or alternate approaches you want to remember..."
                value={localNote}
                onChange={(e) => setLocalNote(e.target.value)}
                onBlur={handleNoteBlur}
              />
              <div className="notes-footer">
                <span>Notes are automatically saved to your browser's local storage.</span>
                <button
                  className="btn-save-note"
                  onClick={handleNoteBlur}
                >
                  Save Note
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
