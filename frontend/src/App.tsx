import { useState, useMemo } from 'react';
import { TypingSimulator } from './components/TypingSimulator';
import { cppSnippets } from './cppSnippets';

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'practice'>('home');
  const [selectedSnippetId, setSelectedSnippetId] = useState<string>('arrays');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = useMemo(() => {
    const set = new Set<string>();
    cppSnippets.forEach((s) => set.add(s.category));
    return ['All', ...Array.from(set)];
  }, []);

  const filteredSnippets = useMemo(() => {
    return cppSnippets.filter((snippet) => {
      const matchesSearch =
        snippet.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        snippet.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        snippet.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || snippet.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const navigateToSection = (sectionId: string) => {
    setCurrentPage('home');
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  return (
    <div className="app-root-container">
      {/* Floating Navbar */}
      <nav className="navbar">
        <div className="nav-brand" onClick={() => setCurrentPage('home')} style={{ cursor: 'pointer' }}>
          <span>TypeDSA.cpp</span>
          <span className="brand-count-badge">25 DSA Modules</span>
        </div>
        <div className="nav-links">
          <a
            href="#practice"
            className={`nav-link ${currentPage === 'practice' ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              setCurrentPage('practice');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            Practice Arena
          </a>
          <a
            href="#advantages"
            className="nav-link"
            onClick={(e) => {
              e.preventDefault();
              navigateToSection('advantages');
            }}
          >
            Advantages
          </a>
          <a
            href="#curriculum"
            className="nav-link"
            onClick={(e) => {
              e.preventDefault();
              navigateToSection('curriculum');
            }}
          >
            Curriculum
          </a>
          <a
            href="https://github.com/Tejaspatil1175/typingmaster"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-nav-cta"
          >
            GitHub
          </a>
        </div>
      </nav>

      {currentPage === 'home' ? (
        <>
          {/* Hero Section with Split Layout: Text on Left, Live Array Simulator on Right */}
          <header className="hero-section hero-split-layout">
            <div className="hero-left-content">
              <div className="hero-badge-container">
                <span className="pulse-indicator"></span>
                <span className="badge-tag-text">INTERACTIVE C++ CODING SIMULATOR</span>
              </div>
              <h1 className="hero-title">
                Master 25 Core DSA Topics in C++ <br />
                <span className="gradient-text-hero">at the Speed of Thought</span>
              </h1>
              <p className="hero-subtitle">
                Passive reading won't help in time-pressured technical interviews. Build muscle memory for standard syntax, optimize your typing speed, and internalize C++ algorithms by active coding practice.
              </p>

              {/* Hero Feature Badges */}
              <div className="hero-feature-tags">
                <span className="hero-tag-item">⚡ Real-Time WPM & Accuracy</span>
                <span className="hero-tag-item">🧠 25 Runnable C++ Programs</span>
                <span className="hero-tag-item">🎯 Kinetic Memory Building</span>
              </div>

              <div className="hero-btn-group">
                <button
                  onClick={() => {
                    setCurrentPage('practice');
                    setSelectedSnippetId('arrays');
                    window.scrollTo({ top: 0, behavior: 'auto' });
                  }}
                  className="btn-hero-cta"
                >
                  Start Typing Practice →
                </button>
                <button
                  onClick={() => {
                    navigateToSection('curriculum');
                  }}
                  className="btn-hero-secondary"
                >
                  View 25 Modules
                </button>
              </div>
            </div>

            <div className="hero-right-simulator">
              <TypingSimulator selectedSnippetId="arrays" isCompact={true} />
            </div>
          </header>

          {/* Advantages Section */}
          <section id="advantages" style={{ padding: '60px 20px 40px' }}>
            <h2 className="section-title">
              Why Practice <span>DSA via Speed Typing</span>?
            </h2>
            <div className="advantages-grid">
              <div className="advantage-card">
                <div className="advantage-icon-wrapper">
                  <span>🧠</span>
                </div>
                <h3>Syntax Autopilot</h3>
                <p>
                  Automate writing boilerplate code like <code>#include &lt;vector&gt;</code>,
                  pointer allocations, iterators, and class templates. Free up your
                  brain to focus on core algorithmic problem-solving.
                </p>
              </div>

              <div className="advantage-card">
                <div className="advantage-icon-wrapper">
                  <span>⏱️</span>
                </div>
                <h3>Ace Coding Interviews</h3>
                <p>
                  In a 45-minute technical interview, typing speed is your secret superpower.
                  Reduce your execution phase to 10 minutes so you have more time to explain,
                  dry-run test-cases, and optimize complexity.
                </p>
              </div>

              <div className="advantage-card">
                <div className="advantage-icon-wrapper">
                  <span>💾</span>
                </div>
                <h3>Kinetic Retention</h3>
                <p>
                  Kinetic memory (typing) keeps your brain actively engaged. Re-typing algorithms
                  helps you memorize DFS, BFS, dynamic programming traversals, and tree mutations
                  much faster than reading static slides.
                </p>
              </div>
            </div>
          </section>

          {/* Curriculum Roadmap */}
          <section id="curriculum" className="roadmap-section">
            <h2 className="section-title">
              The <span>25 C++ DSA Modules</span>
            </h2>
            <div className="roadmap-timeline">
              <div className="roadmap-step">
                <span className="step-num">Module 01</span>
                <h4>Linear & Core Structures</h4>
                <p>Arrays, Strings, Recursion, Sorting, Searching, Linked Lists, Stacks, Queues, and Deques.</p>
              </div>

              <div className="roadmap-step">
                <span className="step-num">Module 02</span>
                <h4>Algorithmic Techniques</h4>
                <p>Hashing, Two Pointers, Sliding Window, Prefix Sum, and Bit Manipulation tricks.</p>
              </div>

              <div className="roadmap-step">
                <span className="step-num">Module 03</span>
                <h4>Trees & Graph Systems</h4>
                <p>Binary Trees, BST, Heaps (Priority Queues), Tries, and Dijkstra's Shortest Path.</p>
              </div>

              <div className="roadmap-step">
                <span className="step-num">Module 04</span>
                <h4>Advanced Engineering</h4>
                <p>Greedy, Backtracking, DP Tabulation, Segment Trees, Fenwick Trees, and DSU Disjoint Sets.</p>
              </div>
            </div>
          </section>
        </>
      ) : (
        /* Practice Page */
        <main className="practice-page-container">
          <div className="practice-header">
            <h1 className="practice-title">DSA Practice Arena</h1>
            <p className="practice-subtitle">
              Select any of the 25 standard C++ data structure & algorithm cards below to launch it inside the typing visualizer.
            </p>
          </div>

          {/* Search & Category Filter Controls */}
          <div className="arena-filter-controls">
            <input
              type="text"
              className="arena-search-input"
              placeholder="🔍 Search across 25 DSA topics (e.g. DP, Trie, Graph, Heap, Sorting...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="category-pills">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`pill-btn ${selectedCategory === cat ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* 25 Selector Cards Grid */}
          <div className="topic-cards-grid">
            {filteredSnippets.map((snippet) => (
              <div
                key={snippet.id}
                className={`topic-card ${selectedSnippetId === snippet.id ? 'active' : ''}`}
                onClick={() => {
                  setSelectedSnippetId(snippet.id);
                  document.getElementById('simulator-anchor')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="topic-category-badge">{snippet.category}</span>
                  <span className={`difficulty-badge-pill ${snippet.difficulty.toLowerCase()}`}>
                    {snippet.difficulty}
                  </span>
                </div>
                <h4>{snippet.title}</h4>
                <p>{snippet.description}</p>
                <div className="card-complexity-footer">
                  <span>⚡ {snippet.complexity.time}</span>
                  <span>💾 {snippet.complexity.space}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Simulator Anchor */}
          <div id="simulator-anchor" style={{ width: '100%' }}>
            <TypingSimulator selectedSnippetId={selectedSnippetId} />
          </div>
        </main>
      )}

      {/* Footer */}
      <footer className="footer">
        <div>
          <p>© {new Date().getFullYear()} TypeDSA.cpp. 25 Essential C++ Algorithms & Data Structures.</p>
        </div>
        <div className="footer-links">
          <a href="https://github.com/Tejaspatil1175/typingmaster" target="_blank" rel="noopener noreferrer">
            GitHub Repository
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;
