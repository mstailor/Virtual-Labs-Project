import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Probing.css';

// Header Component
const Header = ({ toggleSidebar, toggleProgressBar }) => (
  <div>
    <div className="header-head">
      <div className="left-head">
        <img className="vl-logo" src="/Sources/rbulogo.jpg" alt="Virtual Labs logo" />
      </div>
      <div className="right-head">
        <form>
          <input type="search" name="search-bar" id="searching" placeholder="Search lab" />
        </form>
      </div>
    </div>
    <div className="top-bar">
      <div className="left-section">
        <button className="hamburger" onClick={toggleSidebar}>
          &#9776;
        </button>
        <a href="/" className="home-link">Home</a>
      </div>
      <h1>DATA STRUCTURE 1</h1>
      <button className="course-progress-btn" onClick={toggleProgressBar}>
        Course Progress
      </button>
    </div>
  </div>
);

// Sidebar Component
const Sidebar = ({ setActiveContent }) => (
  <div className="toggle-section">
    <ul type="none">
      <br /><br />
      <li onClick={() => setActiveContent('Aim')}>Aim</li>
      <br />
      <li onClick={() => setActiveContent('Overview')}>Overview</li>
      <br />
      <li onClick={() => setActiveContent('Pretest')}>Pretest</li>
      <br />
      <li onClick={() => setActiveContent('Concept')}>Concept</li>
      <br />
      <li onClick={() => setActiveContent('Practice')}>Practice</li>
      <br />
      <li onClick={() => setActiveContent('Exercise')}>Exercise</li>
      <br />
      <li onClick={() => setActiveContent('Posttest')}>Posttest</li>
    </ul>
  </div>
);

// ProgressBar Component
const ProgressBar = ({ progress }) => (
  <div className="toggle-section">
    {Object.keys(progress).map((experiment, index) => (
      <div key={index}>
        <h5>{experiment.replace(/^\w/, (c) => c.toUpperCase())}</h5>
        <div className="progress-section">
          <p>Lecture progress:</p>
          <progress value={progress[experiment].lecture} max="100" />
          <span>{progress[experiment].lecture}%</span>
        </div>return <p>The objectives of this lab are... (Objectives content)</p>;
        <div className="progress-section">
          <p>Assignment progress:</p>
          <progress value={progress[experiment].assignment} max="100" />
          <span>{progress[experiment].assignment}%</span>
        </div>
      </div>
    ))}
  </div>
);

// Main Content Component 
const MainContent = ({ activeContent }) => {
  const renderContent = () => {
    switch (activeContent) {
      case 'Aim':

        return (
          <>
            <div className='intro'>
              <h1 className='heading'> Stack </h1>
              <br />
              <br />
              <h2 className='sub-heading'>Estimated Time</h2>
              <p></p>
              <br />
              <br/>
              <h2 className='sub-heading'>Learning Objectives of this Module</h2>
              <ul>
                <li>Gain basic understanding of stacks</li>
                <li>Understand Stack operations and associated time complexities</li>
                <li>Understand applications of Stacks</li>
              </ul>
            </div>
          </>
        );

        case 'Overview' :
        return(
        <>
        <div className='intro'>
            <h1 className='heading'> Stack </h1>
        </div>
        </>
        );
      case 'Pretest':
        return (
          <>
            <div className='intro'>
              <h1 className='heading'> Stack </h1>
              <br />
              <br />
            </div>
          </>
        );

      case 'Concept':
        return (
          <>
            <div className='intro'>
              <h1 className='heading'> Stack </h1>
              <br />
              <br />
              <h2 className='sub-heading'> Stack Concept and Algorithm </h2>
              <br/>
              <h2 className='sub-heading'> What is Stack? </h2>
              <br />
              <p>
              A Stack is a linear data structure that follows a particular
               order in which the operations<br/> are performed. The order may be 
               LIFO(Last In First Out) or FILO(First In Last Out).<br/> LIFO implies 
               that the element that is inserted last, comes out first and FILO
               implies<br/> that the element that is inserted first, comes out last.
              </p>
              <br />
              <br />
              <h2 className='sub-heading'> Stack Demonstration </h2>
              <img className='image' src="/Sources/.jpeg"></img>
              <br />
            </div>
          </>
        );
      case 'Practice':
        return (
          <>
            <div className='intro'>
              <h1 className='heading'> Stack </h1>
              <br />
              <br />
            </div>
          </>
        );
      case 'Exercise':
        return (
          <>
            <div className='intro'>
              <h1 className='heading'> Stack </h1>
              <br />
              <br />
            </div>
          </>
        );
        case 'Posttest':
        return (
          <>
            <div className='intro'>
              <h1 className='heading'> Stack </h1>
              <br />
              <br />
            </div>
          </>
        );
      default:
        return <p>Select an option from the sidebar.</p>;
    }
  };

  return (
    <div className="main-content">
      {renderContent()}
    </div>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer>
      <div className="footer-head">
        <div className="foot-one">
          <ul type="none">
            <li>Quick Links</li>
            <li><a href="#">Lab Feedback Form</a></li>
            <li><a href="#">FAQ</a></li>
          </ul>
        </div>
        <div className="foot-two">
          <ul type="none">
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="#">About RBU</a></li>
          </ul>
        </div>
        <div className="foot-three">
          Connect With US :
          <ul type="none"><br />
            <li>Email :- <a href="#">virtuallab2024@gmail.com</a></li>
            <li>Contact :- <a href="#">9999999999</a></li>
            <li>Address :- <a href="#">53G6+GCJ, Gittikhadan Rd,<br />BUPESHNAGAR, Nagpur, Maharashtra<br />440013</a></li>
          </ul>
        </div>
      </div>
      <p>© 2024 Virtual Labs. All rights reserved.</p>
    </footer>
  );
};

// Main App Component
const Experiments = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [progressBarOpen, setProgressBarOpen] = useState(false);
  const [activeContent, setActiveContent] = useState('Introduction');

  const [progress, setProgress] = useState({
    experiment1: { lecture: 50, assignment: 50 },
    experiment2: { lecture: 30, assignment: 30 },
    experiment3: { lecture: 70, assignment: 70 },
    experiment4: { lecture: 50, assignment: 60 }
  });

  // Load progress from localStorage on mount
  useEffect(() => {
    const storedProgress = localStorage.getItem('courseProgress');
    if (storedProgress) {
      setProgress(JSON.parse(storedProgress));
    }
  }, []);

  // Update localStorage when progress changes
  useEffect(() => {
    localStorage.setItem('courseProgress', JSON.stringify(progress));
  }, [progress]);

  // Toggle Sidebar
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  // Toggle Progress Bar
  const toggleProgressBar = () => setProgressBarOpen(!progressBarOpen);

  return (
    <div className="container">
      {/* Header */}
      <Header toggleSidebar={toggleSidebar} toggleProgressBar={toggleProgressBar} />

      <div className="content">
        {/* Sidebar */}
        {sidebarOpen && <Sidebar setActiveContent={setActiveContent} />}

        {/* Main Content */}
        <MainContent activeContent={activeContent} />

        {/* Progress Bar */}
        {progressBarOpen && <ProgressBar progress={progress} />}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Experiments;
