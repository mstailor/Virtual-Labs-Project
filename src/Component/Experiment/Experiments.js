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
        <a href="/">Home</a>
      </div>
      <h1>DATA STRUCTURE 1</h1>
      <a href='/contact'>Contact Us</a>
    </div>
  </div>
);

// Sidebar Component
const Sidebar = ({ handleOptionClick }) => (
  <div className="toggle-section">
    <ul type="none">
      <br /><br />
      <li onClick={() => handleOptionClick('Introduction')}>Introduction</li>
      <br />
      <li onClick={() => handleOptionClick('Objective')}>Objective</li>
      <br />
      <li onClick={() => handleOptionClick('List of Experiments')}>List of Experiments</li>
      <br />
      <li onClick={() => handleOptionClick('Course Outcome')}>Course Outcome</li>
      <br />
      <li onClick={() => handleOptionClick('Feedback')}>Feedback</li>
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
        </div>
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
const MainContent = ({ activeContent, sidebarOpen }) => {
  const renderContent = () => {
    switch (activeContent) {
      case 'Introduction':
        return (
          <div className='intro'>
            <h1 className='heading'> Data Structures Lab </h1>
            <br />
            <br />
            <p>
            Welcome to the Data Structures Lab developed at RCOEM. Data Structures (also called Data Structures and Algorithms in some places) is a core course in all computer science undergraduate curricula. The course is the basis for understanding several data structures and also algorithms that operate on them. The associated lab in university curricula focuses on implementation of algorithms operating on the data structures, i.e., coding programs on the data structures and algorithms. As a result students are often unable to understand or show the execution of an algorithm on a given data structure and write code effectively. Students an opportunity for learning and better understanding of using algorithms.
            </p>
          </div>
        );

      case 'Objective':
        return (
          <div className='intro'>
            <h1 className='heading'> Data Structures Lab </h1>
            <br />
            <br />
            <p>
            The Virtual Lab for Data Structures will focus on creating an environment where the student interactively explores data structures. The role of this Virtual Labs is to complement the lectures and reading material and the programming lab in three ways : 1. Present visual animations of data structures 2. Allow students to interactively execute algorithms in these data structures. 3. Allow students to interactively compute the cost of using these data structures with different algorithms.
            </p>
          </div>
        );

      case 'List of Experiments':
        return (
          <>
            <div>
              <h1 className='heading'> Data Structures Lab </h1>
              <br />
              <br />
              <div className='list-exp'>
                <ul>
                  <li>Sorting</li>
                  <ol>
                    <li><a href='/list/merge' >Merge Sort</a></li>
                  </ol>
                </ul>
                <ul>
                  <li>Linked List</li>
                  <ol>
                    <li><a href='/list/linkedlist' >Linked List</a></li>
                  </ol>
                </ul>
                <ul>
                  <li>Stack</li>
                  <ol>
                    <li><a href='/list/stack' >Stack</a></li>
                  </ol>
                </ul>
                <ul>
                  <li>Hashing</li>
                  <ol>
                    <li><a href='/list/probing' >Quadratic Probing</a></li>
                  </ol>
                </ul>
              </div>
            </div>
          </>
        );

      case 'Course Outcome':
        return (
          <div className='intro'>
            <h1 className='heading'> Data Structures Lab </h1>
            <br />
            <br />
            <p>
            Upon successful completion of the Data Structures Lab, students will have a comprehensive understanding of various data structures and their applications. They will be able to effectively implement and analyze algorithms for sorting, searching, and manipulating data. Students will gain hands-on experience in designing efficient data structures such as arrays, linked lists, stacks, queues, trees, and graphs, enabling them to optimize problem-solving approaches. Additionally, they will develop critical skills in evaluating the time and space complexity of algorithms, equipping them with the necessary tools to tackle real-world programming challenges and enhance their computational thinking abilities.
            </p>
          </div>
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
                  <Link to='/feedback/feedback-form'>
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
    <div
      className="main-content"
      style={{
        transform: sidebarOpen ? 'translateX(200px)' : 'translateX(0)',
        transition: 'transform 0.3s ease, margin-right 0.3s ease', // Smooth transition for both
      }}
    >
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
          Connect With Us :
          <ul type="none">
            <li>Email: <a href="#">virtuallab2024@gmail.com</a></li>
            <li>Contact: <a href="#">9999999999</a></li>
            <li>Address: <a href="#">53G6+GCJ, Gittikhadan Rd, BUPESHNAGAR, Nagpur...</a></li>
          </ul>
        </div>
      </div>
      <p>© 2024 Virtual Labs. All rights reserved.</p>
    </footer>
  );
};

const Experiments = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [progressBarOpen, setProgressBarOpen] = useState(false);
  const [activeContent, setActiveContent] = useState('Introduction');
  const [showSidebar, setShowSidebar] = useState(false);
  const toggleSidebar = () => setShowSidebar(!showSidebar);

  const handleOptionClick = (content) => {
    setActiveContent(content);  // Set the selected content
    setShowSidebar(false);      // Automatically close the sidebar
  };

  return (
    <div className="container">
      {/* Header */}
      <Header toggleSidebar={toggleSidebar} />
      <div className="content">
        {showSidebar && <Sidebar handleOptionClick={handleOptionClick} />}
        <MainContent activeContent={activeContent} sidebarOpen={sidebarOpen} progressBarOpen={progressBarOpen} />

      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Experiments;