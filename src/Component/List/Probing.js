import React, { useState, useEffect } from 'react'; 
import './Probing.css'; // Ensure your CSS file is included for styling

// Predefined quizzes
const quizzesData = {
  pretest: [
    {
      id: 1,
      question: "1. What is result of 29 mod(5) ?",
      options: [" 1", " 4", " 5"," 9"],
      answer: " 4",
    },
    {
      id: 2,
      question: "2. What is primary purpose of hash function ?",
      options: [" To multiply the keys with a constant value", " To map a given key to a specific index in an array", " To sort the keys", " T compress the data for storage"],
      answer: " To map a given key to a specific index in an array",
    },
    {
      id: 3,
      question: "3. Which of the following is a characteristic of a good hash function ?",
      options: [" It minimizes collision", " It generates shorter hashes for shorter inputs", " It always produces large hash values for larger inputs", " It ensures that all hash values are sequential"],
      answer: " It minimizes collision",
    },
    {
      id: 4,
      question: "4. In which scenarios are you more likely to encounter collisions in a hash table ?",
      options: [" When hash table is empty or nearly empty", " When table size is a prime number", " When a simple hash function like h(k) = k mod(10) is used", " When each key is assigned a unique hash value"],
      answer: " When a simple hash function like h(k) = k mod(10) is used",
    },
    {
      id: 5,
      question: "5. For a hash table with a size of 12, is a key 94 is hashed using h(k) = k mod(12), what is the resulting index ?",
      options: [" 10", " 8", " 6", " 3"],
      answer: " 10",
    },
  ],
  posttest: [
    {
      id: 1,
      question: "",
      options: ["", "", "", ""],
      answer: "",
    },
    {
      id: 2,
      question: "",
      options: ["", "", "", ""],
      answer: "",
    },
    {
      id: 3,
      question: "",
      options: ["", "", "", ""],
      answer: "",
    },
    {
      id: 4,
      question: "",
      options: ["", "", "", ""],
      answer: "",
    },
    {
      id: 5,
      question: "",
      options: ["", "", "", ""],
      answer: "",
    },
  ],
};

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
      <li onClick={() => setActiveContent('Applications')}>Real Life Applications</li>
    </ul>
  </div>
);




// Main Content Component
const MainContent = ({ activeContent, setUserAnswers, userAnswers, setScore }) => {
  const [quizzes, setQuizzes] = useState([]);
  const [activeTestType, setActiveTestType] = useState('pretest');
  const [submitted, setSubmitted] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  useEffect(() => {
    setQuizzes(quizzesData[activeTestType]);
    setSubmitted(false);
    setUserAnswers({});
  }, [activeTestType]);

  const handleAnswerChange = (questionId, answer) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const handleSubmit = () => {
    let correctCount = 0;
    quizzes.forEach(quiz => {
      if (userAnswers[quiz.id] === quiz.answer) {
        correctCount++;
      }
    });
    setCorrectAnswers(correctCount);
    setScore(correctCount);
    setSubmitted(true);
  };

  const toggleTestType = () => {
    setActiveTestType(prevType => (prevType === 'pretest' ? 'posttest' : 'pretest'));
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
        return (
          <div className='intro'>
            <h1 className='heading'>{activeTestType.charAt(0).toUpperCase() + activeTestType.slice(1)} Quiz</h1>
            {quizzes.map(quiz => (
              <div key={quiz.id}><br></br>
                <h3>{quiz.question}</h3><br></br>
                <div className='indent'>
                  {quiz.options.map(option => (
                    <label key={option}>
                      <input
                        type="radio"
                        name={quiz.id}
                        onChange={() => handleAnswerChange(quiz.id, option)}
                      />
                      {option}<br></br>
                    </label>
                  ))}
                </div>
              </div>
            ))}
            <button className='SubmitButton' onClick={handleSubmit}>Submit</button>
            {submitted && (
              <div className="score-display">
                <h3>Your Score: {correctAnswers} / {quizzes.length}</h3>
              </div>
            )}
          </div>
        );

      case 'Concept':
        return (
          <div className='intro'>
            <h1 className='heading'>Quadratic Probing</h1>
            <h2 className='sub-heading'>Quadratic Probing Concept and Algorithm</h2>
            <h2 className='sub-heading'>What is Quadratic Probing?</h2>
            <p>Quadratic probing is an open addressing scheme which operates by taking the original hash index and adding successive square of c (where, c is the number of collisions occurred) until an open slot is found.</p>
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
  const [showSidebar, setShowSidebar] = useState(true);

  const toggleSidebar = () => setShowSidebar(!showSidebar);

  return (
    <div className="App">
      <Header toggleSidebar={toggleSidebar} />
      <div className="content">
        {showSidebar && <Sidebar setActiveContent={setActiveContent} />}
        <MainContent
          activeContent={activeContent}
          setUserAnswers={setUserAnswers}
          userAnswers={userAnswers}
          setScore={setScore}
        />
      </div>
      <Footer />
    </div>
  );
};
export default Experiments;
