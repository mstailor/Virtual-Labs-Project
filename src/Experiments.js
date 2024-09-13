import React, { useState, useEffect } from 'react';
import './experiments.css'; // Add your CSS file for basic styling

// Constants and Components

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
        &#9776; {/* Hamburger Icon */}
      </button>
      <a href="/" className="home-link">Home</a> {/* Home link beside the icon */}
    </div>
    <h1>DATA STRUCTURE 1</h1>
    <button className="course-progress-btn" onClick={toggleProgressBar}>
      Course Progress
    </button>
  </div>
  </div>
);

// Sidebar Component
const Sidebar = () => (
  <div className="toggle-section">
    <ul type="none">
      <br></br><br></br>
      <li><a href="/experiments">Introduction</a></li>
      <br></br>
      <li><a href="/obj">Objective</a></li>
      <br></br>
      <li><a href="/list">List of experiments</a></li>
      <br></br>
      <li><a href="/co">Course Outcome</a></li>
      <br></br>
      <li><a href="/feedback">Feedback</a></li>
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
const MainContent = () => (
  <div className="main-content">
    <p>
      <br></br>
      Welcome to the Data Structures Lab, created at Ramdeobaba university(formerly 
      Ramdeobaba College of Engineering and Management), Nagpur. This course is 
      designed to provide students with a strong foundation in understanding 
      different data structures and the algorithms that work with them. As part 
      of the university's curriculum, the lab emphasizes the practical 
      implementation of these algorithms, allowing students to gain hands-on 
      experience by writing code for various data structures and algorithms.
    <br></br><br></br>
    Many students often encounter challenges when it comes to visualizing how 
    these algorithms interact with and modify the underlying data structures. 
    This can lead to difficulty in grasping how an algorithm operates or in 
    writing effective and optimized code. In addition, understanding the 
    concepts of time and space complexity, which are essential to evaluating 
    the efficiency of algorithms, can be a stumbling block for many learners.
    <br></br><br></br>
    To address these challenges, the lab has been designed with interactive 
    experiments that help students better visualize and understand how 
    algorithms work in practice. These activities not only provide insight 
    into the theoretical aspects of data structures but also offer 
    practical applications. By working through these experiments, students 
    will be able to develop a clearer understanding of how algorithms function, 
    the changes they bring to data structures, and how to analyze their time 
    and space complexity.
    <br></br><br></br>
    The lab aims to bridge the gap between theory and practice, helping 
    students not only to comprehend abstract concepts but also to apply 
    them effectively in real-world scenarios. Through a structured series of 
    exercises, students will gain the skills and confidence to write efficient 
    code and better understand the inner workings of data structures and algorithms.
</p>
  </div>
);

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
  // State management for toggling sidebar and progress bar
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [progressBarOpen, setProgressBarOpen] = useState(false);

  // Progress data from localStorage
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
        {sidebarOpen && <Sidebar />}

        {/* Main Content */}
        <MainContent />

        {/* Progress Bar */}
        {progressBarOpen && <ProgressBar progress={progress} />}
      </div>

      {/* Footer */}
      <Footer/>
    </div>
  );
};

export default Experiments;
