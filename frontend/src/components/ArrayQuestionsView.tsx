import { useState } from 'react';
import { arrayQuestions, type ArrayQuestion } from '../arrayQuestions';
import { TypingSimulator } from './TypingSimulator';

interface ArrayQuestionsViewProps {
  onBackToModules: () => void;
}

export const ArrayQuestionsView = ({ onBackToModules }: ArrayQuestionsViewProps) => {
  const [selectedQuestion, setSelectedQuestion] = useState<ArrayQuestion | null>(null);

  return (
    <div className="array-questions-container">
      {selectedQuestion === null ? (
        /* STEP 1: 10 ARRAY QUESTION CARDS PAGE */
        <>
          {/* Header Bar */}
          <div className="array-header-bar">
            <button onClick={onBackToModules} className="btn-back-modules">
              ← Back to Practice Arena
            </button>
            <div className="array-header-title">
              <h2>Array Data Structure: 10 Core Interview Questions</h2>
              <p>Select any of the 10 array question cards below to view problem details, intuition explanations, and start typing the C++ solution.</p>
            </div>
          </div>

          {/* 10 Question Cards Grid */}
          <div className="array-cards-grid-page">
            {arrayQuestions.map((q, index) => (
              <div
                key={q.id}
                className="array-q-card"
                onClick={() => {
                  setSelectedQuestion(q);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                <div className="q-card-header">
                  <span className="q-num-tag">Question {index + 1}</span>
                  <span className={`difficulty-pill ${q.difficulty.toLowerCase()}`}>
                    {q.difficulty}
                  </span>
                </div>
                <h3 className="q-card-title">{q.title}</h3>
                <p className="q-card-desc">{q.problemStatement}</p>
                
                <div className="q-card-footer">
                  <div className="q-complexity-badges">
                    <span>⚡ {q.timeComplexity}</span>
                    <span>💾 {q.spaceComplexity}</span>
                  </div>
                  <button className="btn-start-q">
                    Start Question →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        /* STEP 2: SELECTED QUESTION DETAIL & TYPING SIMULATOR PAGE */
        <div className="question-detail-page">
          {/* Top Header Bar */}
          <div className="array-header-bar">
            <button onClick={() => setSelectedQuestion(null)} className="btn-back-modules">
              ← Back to 10 Array Questions
            </button>
            <div className="array-header-title">
              <h2>{selectedQuestion.title}</h2>
              <p>Review the problem statement, intuition explanation, and type the C++ solution below.</p>
            </div>
          </div>

          {/* Question Details Card */}
          <div className="question-info-card">
            <div className="question-info-header">
              <h3>Problem Details</h3>
              <span className={`difficulty-pill ${selectedQuestion.difficulty.toLowerCase()}`}>
                {selectedQuestion.difficulty}
              </span>
            </div>

            {/* Problem Statement */}
            <div className="problem-section">
              <h4>Problem Statement</h4>
              <p>{selectedQuestion.problemStatement}</p>
            </div>

            {/* Example Input / Output */}
            <div className="examples-flex-row">
              <div className="example-box">
                <span className="ex-label">Example Input:</span>
                <code>{selectedQuestion.exampleInput}</code>
              </div>
              <div className="example-box">
                <span className="ex-label">Example Output:</span>
                <code>{selectedQuestion.exampleOutput}</code>
              </div>
            </div>

            {/* Intuition & Solution Explanation */}
            <div className="explanation-section">
              <h4>Intuition & Solution Approach</h4>
              <p>{selectedQuestion.explanation}</p>
              <div className="complexity-tag-row">
                <span className="comp-tag">⚡ Time Complexity: <strong>{selectedQuestion.timeComplexity}</strong></span>
                <span className="comp-tag">💾 Space Complexity: <strong>{selectedQuestion.spaceComplexity}</strong></span>
              </div>
            </div>
          </div>

          {/* Interactive C++ Typing Visualizer */}
          <div className="question-simulator-wrapper">
            <div className="sim-wrapper-header">
              <h4>⌨️ Practice Typing Solution Code</h4>
              <p>Type the complete runnable C++ program below to build muscle memory.</p>
            </div>
            <TypingSimulator key={selectedQuestion.id} selectedSnippetId={selectedQuestion.id} isCompact={false} />
          </div>
        </div>
      )}
    </div>
  );
};
