import React, { useState, useEffect } from 'react'; 
import axios from 'axios';
import './Probing.css'; // Ensure your CSS file is included for styling

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
      <li onClick={() => setActiveContent('Aim')}>Aim</li>
      <li onClick={() => setActiveContent('Overview')}>Overview</li>
      <li onClick={() => setActiveContent('Pretest')}>Pretest</li>
      <li onClick={() => setActiveContent('Concept')}>Concept</li>
      <li onClick={() => setActiveContent('Practice')}>Practice</li>
      <li onClick={() => setActiveContent('Exercise')}>Exercise</li>
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
const MainContent = ({ activeContent, setUserAnswers, userAnswers, setScore, setProgress }) => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTestType, setActiveTestType] = useState('Pretest');

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const endpoint = `http://127.0.0.1:8000/api/quiz/${activeTestType.toLowerCase()}/probing`;
        const response = await axios.get(endpoint);
        setQuizzes(response.data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, [activeTestType]);

  const handleAnswerChange = (questionId, answer) => {
    setUserAnswers({
      ...userAnswers,
      [questionId]: answer,
    });
  };

  const handleSubmit = () => {
    let correctAnswers = 0;
    quizzes.forEach(quiz => {
      if (userAnswers[quiz.id] === quiz.answer) {
        correctAnswers++;
      }
    });
    setScore(correctAnswers);

    const progress = {
      score: correctAnswers,
      total: quizzes.length,
    };
    localStorage.setItem('quizProgress', JSON.stringify(progress));

    setProgress(prev => ({
      ...prev,
      experiment1: { 
        lecture: Math.min((correctAnswers / quizzes.length) * 100, 100),
        assignment: prev.experiment1.assignment 
      }
    }));
  };

  const toggleTestType = () => {
    setActiveTestType(prevType => (prevType === 'Pretest' ? 'Posttest' : 'Pretest'));
  };

  const renderContent = () => {
    switch (activeContent) {
      case 'Aim':
        return (
          <div className='intro'>
            <h1 className='heading'>Quadratic Probing</h1>
            <h2 className='sub-heading'>Estimated Time</h2>
            <h2 className='sub-heading'>Learning Objectives of this Module</h2>
            <ul>
              <li>Learn about quadratic probing</li>
              <li>Understand the differences between linear and quadratic probing</li>
            </ul>
          </div>
        );

      case 'Overview':
        return (
          <div className='intro'>
            <h1 className='heading'>Quadratic Probing</h1>
          </div>
        );

      case 'Pretest':
      case 'Posttest':
        if (loading) return <div>Loading...</div>;
        if (error) return <div>Error: {error}</div>;
        return (
          <div className='intro'>
            <h1 className='heading'>{activeTestType} Quiz</h1>
            {quizzes.map(quiz => (
              <div key={quiz.id}>
                <h2>{quiz.question}</h2>
                <div>
                  {quiz.options.map(option => (
                    <label key={option}>
                      <input
                        type="radio"
                        name={quiz.id}
                        onChange={() => handleAnswerChange(quiz.id, option)}
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </div>
            ))}
            <button onClick={handleSubmit}>Submit</button>
            <button onClick={toggleTestType}>
              Switch to {activeTestType === 'Pretest' ? 'Posttest' : 'Pretest'}
            </button>
          </div>
        );

      case 'Concept':
        return (
          <div className='intro'>
            <h1 className='heading'>Quadratic Probing</h1>
            <h2 className='sub-heading'>Quadratic Probing Concept and Algorithm</h2>
            <h2 className='sub-heading'>What is Quadratic Probing?</h2>
            <p>Quadratic probing is an open addressing scheme which operates by taking the original hash index and adding successive square of c (where, c is the number of collisions occurred) until an open slot is found.</p>
            <h2 className='sub-heading'>Quadratic Probing Demonstration</h2>
            <img className='image' src="/Sources/prob.jpeg" alt="Quadratic Probing Demo" />
          </div>
        );

      case 'Practice':
      case 'Exercise':
        return (
          <div className='intro'>
            <h1 className='heading'>Quadratic Probing</h1>
          </div>
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
const Footer = () => (
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
        Connect With Us:
        <ul type="none"><br />
          <li>Email: <a href="#">virtuallab2024@gmail.com</a></li>
          <li>Contact: <a href="#">9999999999</a></li>
          <li>Address: <a href="#">53G6+GCJ, Gittikhadan Rd,<br />BUPESHNAGAR, Nagpur, Maharashtra<br />440013</a></li>
        </ul>
      </div>
    </div>
    <p>© 2024 Virtual Labs. All rights reserved.</p>
  </footer>
);

// Main App Component
const Experiments = () => {
  const [activeContent, setActiveContent] = useState('Aim');
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [progress, setProgress] = useState({
    experiment1: { lecture: 50, assignment: 50 },
    experiment2: { lecture: 30, assignment: 30 },
    experiment3: { lecture: 70, assignment: 70 },
    experiment4: { lecture: 50, assignment: 60 }
  });
  const [showSidebar, setShowSidebar] = useState(true);
  const [showProgressBar, setShowProgressBar] = useState(true);

  return (
    <div className="App">
      <Header toggleSidebar={() => setShowSidebar(!showSidebar)} toggleProgressBar={() => setShowProgressBar(!showProgressBar)} />
      <div className="content">
        {showSidebar && <Sidebar setActiveContent={setActiveContent} />}
        <MainContent
          activeContent={activeContent}
          setUserAnswers={setUserAnswers}
          userAnswers={userAnswers}
          setScore={setScore}
          setProgress={setProgress}
        />
        {showProgressBar && <ProgressBar progress={progress} />}
      </div>
      <Footer />
    </div>
  );
};

export default Experiments;
