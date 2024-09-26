import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './experiments.css';

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
      <li onClick={() => setActiveContent('Introduction')}>Introduction</li>
      <br />
      <li onClick={() => setActiveContent('Objective')}>Objective</li>
      <br />
      <li onClick={() => setActiveContent('List of Experiments')}>List of Experiments</li>
      <br />
      <li onClick={() => setActiveContent('Course Outcome')}>Course Outcome</li>
      <br />
      <li onClick={() => setActiveContent('Feedback')}>Feedback</li>
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
      case 'Introduction':

        return (
          <>
            <div className='intro'>
              <h1 className='heading'> Data Structures Lab </h1>
              <br />
              <br />
              <p>
                Welcome to the Data Structures Lab developed at RCOEM. Data Structures (also called Data Structures and Algorithms in some places) is a core course in all computer science undergraduate curricula. The course is the basis for understanding several data structures and also algorithms that operate on them. The associated lab in university curricula focuses on implementation of algorithms operating on the data structures, i.e., coding programs on the data structures and algorithms. As a result students are often unable to understand or show the execution of an algorithm on a given data structure and write code effectively. Students an opportunity for learning and better understanding of using algorithms.
              </p>
            </div>
          </>
        );

      case 'Objective':

      case 'List of Experiments':
        return (
          <>
            <div className='intro'>
              <h1 className='heading'> Data Structures Lab </h1>
              <br />
              <br />
              <p>
                The Virtual Lab for Data Structures will focus on creating an environment where the student interactively explores data structures. The role of this Virtual Labs is to complement the lectures and reading material and the programming lab in three ways : 1. Present visual animations of data structures 2. Allow students to interactively execute algorithms in these data structures. 3. Allow students to interactively compute the cost of using these data structures with different algorithms.
              </p>
            </div>
          </>
        );
      case 'Course Outcome':
        return (
          <>
            <div className='intro'>
              <h1 className='heading'> Data Structures Lab </h1>
              <br />
              <br />
              <p>
                Upon successful completion of the Data Structures Lab, students will have a comprehensive understanding of various data structures and their applications. They will be able to effectively implement and analyze algorithms for sorting, searching, and manipulating data. Students will gain hands-on experience in designing efficient data structures such as arrays, linked lists, stacks, queues, trees, and graphs, enabling them to optimize problem-solving approaches. Additionally, they will develop critical skills in evaluating the time and space complexity of algorithms, equipping them with the necessary tools to tackle real-world programming challenges and enhance their computational thinking abilities.
              </p>
            </div>
          </>
        );
      case 'Feedback':
        return (
          <>
            <div className='intro'>
              <h1 className='heading'> Data Structures Lab </h1>
              <br />
              <br />
              <p>
                Dear User,
                Thanks for using Virtual Labs. Your opinion is valuable to us. To help us improve, we'd like to ask you a few questions about your experience. It will only take 3 minutes and your answers will help us make Virtual Labs better for you and other users.
                <br />
                <br />
                <div className='feed'>
                  <Link to='/feedback'>
                    <input className='but-feedback' type='button' value={"Share your Feedback"} />
                  </Link>
                </div>
                <br />
                <br />
                Thanks for your time !
                <br />
                The Virtual Labs Team
              </p>
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