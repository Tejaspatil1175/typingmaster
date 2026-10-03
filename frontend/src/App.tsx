import { useState, useEffect, useMemo } from 'react';
import { dsaQuestions, TOPICS, type DSAQuestion, type TopicInfo } from './dsaQuestions';
import { PracticeTimer } from './components/PracticeTimer';
import { QuestionDetailModal } from './components/QuestionDetailModal';

type TopicId = 'all' | 'arrays' | 'strings' | 'linked-list' | 'stack' | 'queue' | 'binary-tree' | 'bst';
type DifficultyFilter = 'All' | 'Easy' | 'Medium' | 'Hard';
type StatusFilter = 'All' | 'Unsolved' | 'Solved' | 'Starred';

export default function App() {
  const [selectedTopic, setSelectedTopic] = useState<TopicId>('arrays');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [difficultyFilter, setDifficultyFilter] = useState<DifficultyFilter>('All');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('All');
  const [activeModalQuestion, setActiveModalQuestion] = useState<DSAQuestion | null>(null);
  const [timerQuestion, setTimerQuestion] = useState<DSAQuestion | null>(null);
  const [showTipsBanner, setShowTipsBanner] = useState<boolean>(true);

  // Persistent storage for solved, starred, and notes
  const [solvedIds, setSolvedIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('dsa_solved_ids');
      return saved ? new Set(JSON.parse(saved)) : new Set<string>();
    } catch {
      return new Set<string>();
    }
  });

  const [starredIds, setStarredIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('dsa_starred_ids');
      return saved ? new Set(JSON.parse(saved)) : new Set<string>();
    } catch {
      return new Set<string>();
    }
  });

  const [notes, setNotes] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem('dsa_question_notes');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('dsa_solved_ids', JSON.stringify(Array.from(solvedIds)));
    } catch {
      // storage full or disabled
    }
  }, [solvedIds]);

  useEffect(() => {
    try {
      localStorage.setItem('dsa_starred_ids', JSON.stringify(Array.from(starredIds)));
    } catch {
      // storage full or disabled
    }
  }, [starredIds]);

  useEffect(() => {
    try {
      localStorage.setItem('dsa_question_notes', JSON.stringify(notes));
    } catch {
      // storage full or disabled
    }
  }, [notes]);

  const toggleSolved = (id: string) => {
    setSolvedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleStarred = (id: string) => {
    setStarredIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleSaveNote = (id: string, noteText: string) => {
    setNotes((prev) => ({
      ...prev,
      [id]: noteText
    }));
  };

  const handleResetProgress = () => {
    if (window.confirm('Are you sure you want to reset all solved status checkboxes? Your notes and bookmarks will remain saved.')) {
      setSolvedIds(new Set());
    }
  };

  // Filtered Questions
  const filteredQuestions = useMemo(() => {
    return dsaQuestions.filter((q) => {
      // Topic filter
      if (selectedTopic !== 'all' && q.topic !== selectedTopic) {
        return false;
      }

      // Search filter (number or title or tags)
      if (searchQuery.trim()) {
        const query = searchQuery.trim().toLowerCase();
        const matchesLcNum = q.lcNumber.toString().includes(query);
        const matchesTitle = q.title.toLowerCase().includes(query);
        const matchesTopic = q.topicName.toLowerCase().includes(query);
        if (!matchesLcNum && !matchesTitle && !matchesTopic) return false;
      }

      // Difficulty filter
      if (difficultyFilter !== 'All' && q.difficulty !== difficultyFilter) {
        return false;
      }

      // Status filter
      if (statusFilter === 'Solved' && !solvedIds.has(q.id)) return false;
      if (statusFilter === 'Unsolved' && solvedIds.has(q.id)) return false;
      if (statusFilter === 'Starred' && !starredIds.has(q.id)) return false;

      return true;
    });
  }, [selectedTopic, searchQuery, difficultyFilter, statusFilter, solvedIds, starredIds]);

  // Overall Statistics
  const totalCount = dsaQuestions.length;
  const solvedCount = solvedIds.size;
  const overallPercentage = Math.round((solvedCount / (totalCount || 1)) * 100);

  const easySolved = dsaQuestions.filter((q) => q.difficulty === 'Easy' && solvedIds.has(q.id)).length;
  const easyTotal = dsaQuestions.filter((q) => q.difficulty === 'Easy').length;

  const medSolved = dsaQuestions.filter((q) => q.difficulty === 'Medium' && solvedIds.has(q.id)).length;
  const medTotal = dsaQuestions.filter((q) => q.difficulty === 'Medium').length;

  const hardSolved = dsaQuestions.filter((q) => q.difficulty === 'Hard' && solvedIds.has(q.id)).length;
  const hardTotal = dsaQuestions.filter((q) => q.difficulty === 'Hard').length;

  // Active Topic Details
  const activeTopicInfo = useMemo(() => {
    return TOPICS.find((t) => t.id === selectedTopic);
  }, [selectedTopic]);

  // Topic specific progress
  const getTopicProgress = (topicId: TopicId) => {
    const topicQuestions = dsaQuestions.filter((q) => q.topic === topicId);
    const solved = topicQuestions.filter((q) => solvedIds.has(q.id)).length;
    return { solved, total: topicQuestions.length };
  };

  const handlePickRandomUnsolved = () => {
    const unsolvedInTopic = (selectedTopic === 'all'
      ? dsaQuestions
      : dsaQuestions.filter((q) => q.topic === selectedTopic)
    ).filter((q) => !solvedIds.has(q.id));

    if (unsolvedInTopic.length === 0) {
      alert('Congratulations! You have solved all questions in this topic!');
      return;
    }

    const randomQ = unsolvedInTopic[Math.floor(Math.random() * unsolvedInTopic.length)];
    setActiveModalQuestion(randomQ);
  };

  return (
    <div className="sheet-root-container">
      {/* Top Main Navigation Bar */}
      <header className="sheet-navbar">
        <div className="sheet-nav-brand">
          <div className="brand-logo-glow">
            <span className="brand-code-brackets">&lt;C++&gt;</span>
          </div>
          <div className="brand-text-col">
            <h1 className="brand-title">C++ DSA Mastery Sheet</h1>
            <p className="brand-tagline">LeetCode Questions • 20–30 min practice rule • Optimal STL Patterns</p>
          </div>
        </div>

        {/* Global Progress Bar in Navbar */}
        <div className="nav-stats-summary">
          <div className="stat-pill-group">
            <span className="diff-count-badge easy">Easy: {easySolved}/{easyTotal}</span>
            <span className="diff-count-badge medium">Med: {medSolved}/{medTotal}</span>
            <span className="diff-count-badge hard">Hard: {hardSolved}/{hardTotal}</span>
          </div>

          <div className="overall-progress-bar-wrapper">
            <div className="progress-labels">
              <span className="progress-main-count">{solvedCount} of {totalCount} Solved</span>
              <span className="progress-main-percent">{overallPercentage}%</span>
            </div>
            <div className="progress-track-bg">
              <div className="progress-fill-emerald" style={{ width: `${overallPercentage}%` }}></div>
            </div>
          </div>

          <button
            className="btn-reset-progress"
            onClick={handleResetProgress}
            title="Reset solved checkboxes"
          >
            Reset
          </button>
        </div>
      </header>

      {/* Main Single Page Content */}
      <main className="sheet-main-content">
        {/* Core C++ Best Practices & Rules Card */}
        <section className="cpp-guidelines-banner">
          <div className="banner-header-row">
            <div className="banner-title-flex">
              <span className="banner-icon-badge">⚡</span>
              <div>
                <h3 className="banner-title">C++ DSA Interview Guidelines & Rules</h3>
                <p className="banner-subtitle">
                  Work through each topic in order. Solve each problem yourself for 20 to 30 minutes before checking the editorial.
                </p>
              </div>
            </div>
            <button
              className="btn-toggle-banner"
              onClick={() => setShowTipsBanner(!showTipsBanner)}
            >
              {showTipsBanner ? 'Hide Tips ▲' : 'Show Tips ▼'}
            </button>
          </div>

          {showTipsBanner && (
            <div className="guidelines-grid">
              <div className="guideline-card">
                <div className="guide-icon">🥞</div>
                <div className="guide-body">
                  <h4>Containers & Splicing</h4>
                  <p>
                    Use <code>std::stack</code>, <code>std::queue</code>, and <code>std::deque</code> for standard containers.
                    Use <code>std::list</code> only when you need O(1) splicing (e.g. LRU Cache).
                  </p>
                </div>
              </div>

              <div className="guideline-card">
                <div className="guide-icon">🌳</div>
                <div className="guide-body">
                  <h4>Trees: Recursion & Explicit Stack</h4>
                  <p>
                    For trees, write the recursive version first, then the iterative one with an explicit stack to build deep understanding.
                  </p>
                </div>
              </div>

              <div className="guideline-card">
                <div className="guide-icon">🛡️</div>
                <div className="guide-body">
                  <h4>Memory & Pointers</h4>
                  <p>
                    Free or avoid leaking nodes in linked-list and tree problems. Prefer <code>nullptr</code> checks over sentinel values.
                  </p>
                </div>
              </div>

              <div className="guideline-card highlight-rule">
                <div className="guide-icon">⏱️</div>
                <div className="guide-body">
                  <h4>The 20–30 Minute Rule</h4>
                  <p>
                    Set the practice timer. Struggle constructively for 20–30 minutes before reviewing the optimal solution code.
                  </p>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* TOPIC SELECTOR TABS (Single Page Navigation) */}
        <section className="topics-navigation-bar">
          <div className="topics-scroll-flex">
            {TOPICS.map((topic: TopicInfo) => {
              const { solved, total } = getTopicProgress(topic.id);
              const isComplete = total > 0 && solved === total;
              const isSelected = selectedTopic === topic.id;

              return (
                <button
                  key={topic.id}
                  className={`topic-tab-btn ${isSelected ? 'active' : ''} ${isComplete ? 'completed' : ''}`}
                  onClick={() => {
                    setSelectedTopic(topic.id);
                    setSearchQuery('');
                  }}
                >
                  <span className="tab-icon">{topic.icon}</span>
                  <span className="tab-name">{topic.name}</span>
                  <span className={`tab-count-badge ${isComplete ? 'all-done' : ''}`}>
                    {isComplete ? '✓' : `${solved}/${total}`}
                  </span>
                </button>
              );
            })}

            {/* All Questions Tab */}
            <button
              className={`topic-tab-btn all-tab ${selectedTopic === 'all' ? 'active' : ''}`}
              onClick={() => {
                setSelectedTopic('all');
                setSearchQuery('');
              }}
            >
              <span className="tab-icon">📚</span>
              <span className="tab-name">All Topics</span>
              <span className="tab-count-badge">{solvedCount}/{totalCount}</span>
            </button>
          </div>
        </section>

        {/* ACTIVE TOPIC HEADER & TOOLBAR */}
        <section className="active-topic-panel">
          <div className="active-topic-info-bar">
            <div className="topic-text-col">
              <div className="topic-title-row">
                <h2>
                  {activeTopicInfo ? `${activeTopicInfo.icon} ${activeTopicInfo.name}` : '📚 All LeetCode Questions'}
                </h2>
                {activeTopicInfo && (
                  <span className="topic-question-count">
                    {dsaQuestions.filter((q) => q.topic === activeTopicInfo.id).length} Problems
                  </span>
                )}
              </div>
              <p className="topic-description">
                {activeTopicInfo?.description || 'Browse and filter across all 125 curated C++ DSA LeetCode problems.'}
              </p>
            </div>

            <div className="topic-action-buttons">
              <button
                className="btn-random-pick"
                onClick={handlePickRandomUnsolved}
                title="Pick a random unsolved problem in this category"
              >
                🎲 Pick Random Unsolved
              </button>
            </div>
          </div>

          {/* Search & Filter Toolbar */}
          <div className="filter-toolbar">
            {/* Search Input */}
            <div className="search-input-box">
              <span className="search-glass-icon">🔍</span>
              <input
                type="text"
                placeholder="Search by LC number (e.g. 344, 206, 1) or problem name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              {searchQuery && (
                <button
                  className="btn-clear-search"
                  onClick={() => setSearchQuery('')}
                >
                  ✕
                </button>
              )}
            </div>

            {/* Difficulty Filter */}
            <div className="filter-pill-group">
              <span className="filter-label">Difficulty:</span>
              {(['All', 'Easy', 'Medium', 'Hard'] as DifficultyFilter[]).map((diff) => (
                <button
                  key={diff}
                  className={`filter-pill-btn ${difficultyFilter === diff ? 'active' : ''} ${diff.toLowerCase()}`}
                  onClick={() => setDifficultyFilter(diff)}
                >
                  {diff}
                </button>
              ))}
            </div>

            {/* Status Filter */}
            <div className="filter-pill-group">
              <span className="filter-label">Status:</span>
              {(['All', 'Unsolved', 'Solved', 'Starred'] as StatusFilter[]).map((status) => (
                <button
                  key={status}
                  className={`filter-pill-btn ${statusFilter === status ? 'active' : ''}`}
                  onClick={() => setStatusFilter(status)}
                >
                  {status === 'Starred' ? '★ Starred' : status}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* QUESTIONS TABLE / LIST */}
        <section className="questions-section">
          {filteredQuestions.length === 0 ? (
            <div className="empty-results-box">
              <span className="empty-icon">🔎</span>
              <h3>No matching questions found</h3>
              <p>Try clearing your search query or adjusting your filters.</p>
              <button
                className="btn-reset-filters"
                onClick={() => {
                  setSearchQuery('');
                  setDifficultyFilter('All');
                  setStatusFilter('All');
                }}
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="questions-list-wrapper">
              <div className="questions-table-header">
                <span className="th-col th-status">Status</span>
                <span className="th-col th-num">LC #</span>
                <span className="th-col th-title">Problem Title</span>
                <span className="th-col th-diff">Difficulty</span>
                <span className="th-col th-complexity">Complexity</span>
                <span className="th-col th-actions">Actions</span>
              </div>

              <div className="questions-rows-container">
                {filteredQuestions.map((q) => {
                  const isSolved = solvedIds.has(q.id);
                  const isStarred = starredIds.has(q.id);
                  const hasNote = Boolean(notes[q.id]?.trim());

                  return (
                    <div
                      key={q.id}
                      className={`question-row-item ${isSolved ? 'row-solved' : ''} ${isStarred ? 'row-starred' : ''}`}
                    >
                      {/* Checkbox */}
                      <div className="col-cell col-status">
                        <label className="checkbox-custom-container" title={isSolved ? 'Mark as Unsolved' : 'Mark as Solved'}>
                          <input
                            type="checkbox"
                            checked={isSolved}
                            onChange={() => toggleSolved(q.id)}
                          />
                          <span className="checkbox-checkmark"></span>
                        </label>
                      </div>

                      {/* LeetCode Number */}
                      <div className="col-cell col-num">
                        <span className="lc-number-tag">#{q.lcNumber}</span>
                      </div>

                      {/* Problem Title & Topic Badge */}
                      <div className="col-cell col-title">
                        <div className="title-row-flex">
                          <button
                            className="btn-title-link"
                            onClick={() => setActiveModalQuestion(q)}
                            title="Click to view Intuition & C++ Solution Code"
                          >
                            <span className="problem-title-text">{q.title}</span>
                          </button>
                          {selectedTopic === 'all' && (
                            <span className="row-topic-pill">{q.topicName}</span>
                          )}
                          {hasNote && (
                            <span className="row-note-indicator" title="You have saved notes for this question">
                              📝
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Difficulty */}
                      <div className="col-cell col-diff">
                        <span className={`diff-pill ${q.difficulty.toLowerCase()}`}>
                          {q.difficulty}
                        </span>
                      </div>

                      {/* Complexity Badges */}
                      <div className="col-cell col-complexity">
                        <span className="comp-chip" title="Time Complexity">⚡ {q.timeComplexity}</span>
                        <span className="comp-chip" title="Space Complexity">💾 {q.spaceComplexity}</span>
                      </div>

                      {/* Actions */}
                      <div className="col-cell col-actions">
                        {/* Bookmark / Star */}
                        <button
                          className={`btn-row-star ${isStarred ? 'active' : ''}`}
                          onClick={() => toggleStarred(q.id)}
                          title={isStarred ? 'Remove Star' : 'Star this question'}
                        >
                          {isStarred ? '★' : '☆'}
                        </button>

                        {/* Start 25m Timer */}
                        <button
                          className="btn-row-timer"
                          onClick={() => setTimerQuestion(q)}
                          title="Start 20–30 min practice countdown for this problem"
                        >
                          ⏱️ Timer
                        </button>

                        {/* View Approach & C++ Code */}
                        <button
                          className="btn-row-solution"
                          onClick={() => setActiveModalQuestion(q)}
                          title="View Intuition, C++ Tip, and Solution Code"
                        >
                          💡 Code
                        </button>

                        {/* Open in LeetCode */}
                        <a
                          href={`https://leetcode.com/problems/${q.slug}/`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-row-leetcode"
                          title="Open on LeetCode.com (external tab)"
                        >
                          ↗
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </section>
      </main>

      {/* Floating 20–30 Min Practice Stopwatch / Timer */}
      <PracticeTimer
        activeQuestion={timerQuestion}
        onClearActive={() => setTimerQuestion(null)}
      />

      {/* Question Details / Intuition / C++ Solution Modal */}
      {activeModalQuestion && (
        <QuestionDetailModal
          question={activeModalQuestion}
          isSolved={solvedIds.has(activeModalQuestion.id)}
          isBookmarked={starredIds.has(activeModalQuestion.id)}
          note={notes[activeModalQuestion.id] || ''}
          onToggleSolved={toggleSolved}
          onToggleBookmark={toggleStarred}
          onSaveNote={handleSaveNote}
          onStartTimer={(q) => {
            setTimerQuestion(q);
          }}
          onClose={() => setActiveModalQuestion(null)}
        />
      )}

      {/* Footer */}
      <footer className="sheet-footer">
        <div className="footer-left">
          <p>© {new Date().getFullYear()} C++ DSA Mastery Sheet • 125 Curated LeetCode Problems</p>
          <p className="footer-subtext">Follow the 20–30 min practice rule. Master containers, recursion, pointers, and trees.</p>
        </div>
        <div className="footer-right">
          <a
            href="https://leetcode.com"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            LeetCode ↗
          </a>
          <a
            href="https://github.com/Tejaspatil1175/typingmaster"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            GitHub
          </a>
        </div>
      </footer>
    </div>
  );
}
