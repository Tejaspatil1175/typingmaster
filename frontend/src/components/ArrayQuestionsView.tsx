import { useState } from 'react';
import { arrayQuestions, ArrayQuestion } from '../arrayQuestions';
import { TypingSimulator } from './TypingSimulator';

interface ArrayQuestionsViewProps {
  onBackToModules: () => void;
}

export const ArrayQuestionsView = ({ onBackToModules }: ArrayQuestionsViewProps) => {
  const [selectedQuestionId, setSelectedQuestionId] = useState<string>(arrayQuestions[0].id);

  const selectedQuestion: ArrayQuestion =
    arrayQuestions.find((q) => q.id === selectedQuestionId) || arrayQuestions[0];

  return (
    <div className="array-questions-container">
      {/* Top Header Navigation */}
      <div className="array-header-bar">
        <button onClick={onBackToModules} className="btn-back-modules">
          ← Back to All DSA Modules
        </button>
        <div className="array-header-title">
          <h2>Array Data Structure: 10 Essential Questions</h2>
          <p>Master standard array manipulation, two-pointer techniques, and window algorithms by typing full C++ solutions.</p>
        </div>
      </div>

      {/* Main 10 Questions Layout */}
      <div className="array-questions-grid-layout">
        {/* Left Column: List of 10 Question Cards */}
        <div className="questions-sidebar-list">
          <h3 className="sidebar-list-heading">Array Questions (10)</h3>
          {arrayQuestions.map((question, index) => (
            <div
              key={question.id}
              className={`question-card-item ${selectedQuestionId === question.id ? 'active' : ''}`}
              onClick={() => setSelectedQuestionId(question.id)}
            >
              <div className="card-top-row">
                <span className="question-num-badge">Q{index + 1}</span>
                <span className={`difficulty-pill ${question.difficulty.toLowerCase()}`}>
                  {question.difficulty}
                </span>
              </div>
              <h4 className="question-card-title">{question.title}</h4>
              <div className="question-card-meta">
                <span>⚡ {question.timeComplexity}</span>
                <span>💾 {question.spaceComplexity}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Right Column: Selected Question Details & Interactive Simulator */}
        <div className="question-detail-pane">
          {/* Question Header Card */}
          <div className="question-info-card">
            <div className="question-info-header">
              <h3>{selectedQuestion.title}</h3>
              <span className={`difficulty-pill ${selectedQuestion.difficulty.toLowerCase()}`}>
                {selectedQuestion.difficulty}
              </span>
            </div>

            {/* Problem Statement */}
            <div className="problem-section">
              <h4>Problem Statement</h4>
              <p>{selectedQuestion.problemStatement}</p>
            </div>

            {/* Examples */}
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

            {/* Explanation & Intuition */}
            <div className="explanation-section">
              <h4>Intuition & Solution Explanation</h4>
              <p>{selectedQuestion.explanation}</p>
              <div className="complexity-tag-row">
                <span className="comp-tag">⚡ Time Complexity: <strong>{selectedQuestion.timeComplexity}</strong></span>
                <span className="comp-tag">💾 Space Complexity: <strong>{selectedQuestion.spaceComplexity}</strong></span>
              </div>
            </div>
          </div>

          {/* Interactive Typing Simulator loaded with this Question's C++ Code */}
          <div className="question-simulator-wrapper">
            <div className="sim-wrapper-header">
              <h4>⌨️ Practice Typing Solution Code</h4>
              <p>Type the complete runnable C++ program below to build muscle memory.</p>
            </div>
            {/* Render TypingSimulator with the question's code */}
            <TypingSimulator key={selectedQuestion.id} selectedSnippetId={selectedQuestion.id} isCompact={false} />
          </div>
        </div>
      </div>
    </div>
  );
};
