import { useState } from 'react';
import { TypingSimulator } from './components/TypingSimulator';

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'practice'>('home');

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
    <>
      {/* Floating Navbar */}
      <nav className="navbar">
        <div className="nav-brand" onClick={() => setCurrentPage('home')} style={{ cursor: 'pointer' }}>
          <span>TypeDSA.cpp</span>
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
            Practice
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
          {/* Hero Section */}
          <header className="hero-section">
            <span className="badge-tag">Interactive Coding Simulator</span>
            <h1 className="hero-title">
              Master DSA in C++ <br />
              <span>at the Speed of Thought</span>
            </h1>
            <p className="hero-subtitle">
              Passive reading won't help you in time-pressured technical interviews. 
              Build muscle memory for standard syntax, optimize your typing speed, 
              and internalize algorithms by active coding practice.
            </p>
            <div style={{ marginTop: '32px' }}>
              <button 
                onClick={() => {
                  setCurrentPage('practice');
                  window.scrollTo({ top: 0, behavior: 'auto' });
                }} 
                className="btn-hero-cta"
              >
                Start Typing Practice
              </button>
            </div>
          </header>

          {/* Advantages Section */}
          <section id="advantages" style={{ padding: '80px 0 40px' }}>
            <h2 className="section-title">
              Why Practice <span>DSA via Speed Typing</span>?
            </h2>
            <div className="advantages-grid">
              {/* Card 1 */}
              <div className="advantage-card">
                <div className="advantage-icon-wrapper">
                  <span>🧠</span>
                </div>
                <h3>Syntax Autopilot</h3>
                <p>
                  Automate writing boilerplate code like <code>#include &lt;vector&gt;</code>, 
                  custom pointer allocations, iterators, and class templates. Free up your 
                  brain to focus on core algorithmic problem-solving.
                </p>
              </div>

              {/* Card 2 */}
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

              {/* Card 3 */}
              <div className="advantage-card">
                <div className="advantage-icon-wrapper">
                  <span>💾</span>
                </div>
                <h3>Cognitive Retention</h3>
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
              The <span>C++ DSA Path</span>
            </h2>
            <div className="roadmap-timeline">
              <div className="roadmap-step">
                <span className="step-num">Step 01</span>
                <h4>Standard Template Library (STL)</h4>
                <p>
                  Master fast declarations of <code>std::vector</code>, <code>std::unordered_map</code>, 
                  queues, stacks, and complex sorting lambdas.
                </p>
              </div>

              <div className="roadmap-step">
                <span className="step-num">Step 02</span>
                <h4>Linear Structures & Pointers</h4>
                <p>
                  Build muscle memory for writing singly/doubly linked list nodes, pointer operations, 
                  and memory cleanup procedures.
                </p>
              </div>

              <div className="roadmap-step">
                <span className="step-num">Step 03</span>
                <h4>Non-Linear Graph traversals</h4>
                <p>
                  Quickly lay out graph representations (Adjacency Lists), Breadth First Search (BFS), 
                  Depth First Search (DFS), and trees.
                </p>
              </div>

              <div className="roadmap-step">
                <span className="step-num">Step 04</span>
                <h4>Dynamic Programming Templates</h4>
                <p>
                  Implement standard dynamic programming grids, memoization checks, and state transitions 
                  without syntax stutter.
                </p>
              </div>
            </div>
          </section>
        </>
      ) : (
        /* Practice Page */
        <main className="practice-page-container">
          <div className="practice-header">
            <button 
              onClick={() => setCurrentPage('home')} 
              className="btn-back"
            >
              ← Back to Home
            </button>
            <h1 className="practice-title">DSA Practice Arena</h1>
            <p className="practice-subtitle">Select a snippet below, focus on the editor, and start typing. Practice makes perfect.</p>
          </div>
          <TypingSimulator />
        </main>
      )}

      {/* Footer */}
      <footer className="footer">
        <div>
          <p>© {new Date().getFullYear()} TypeDSA.cpp. Built for C++ Developers.</p>
        </div>
        <div className="footer-links">
          <a href="https://github.com/Tejaspatil1175/typingmaster" target="_blank" rel="noopener noreferrer">
            GitHub Repo
          </a>
        </div>
      </footer>
    </>
  );
}

export default App;
