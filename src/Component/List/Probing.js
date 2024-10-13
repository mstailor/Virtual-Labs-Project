import React, { useState, useEffect } from 'react';
import './Probing.css'; // Ensure your CSS file is included for styling
import QuadraticProbing from './PracticeProbing';

// Predefined quizzes data
const quizzesData = {
  pretest: [
    {
      id: 1,
      question: "1. What is result of 29 mod(5)?",
      options: ["1", "4", "5", "9"],
      answer: "4",
    },
    {
      id: 2,
      question: "2. What is the primary purpose of a hash function?",
      options: [
        "To multiply the keys with a constant value",
        "To map a given key to a specific index in an array",
        "To sort the keys",
        "To compress the data for storage",
      ],
      answer: "To map a given key to a specific index in an array",
    },
    {
      id: 3,
      question: "3. Which of the following is a characteristic of a good hash function?",
      options: [
        "It minimizes collision",
        "It generates shorter hashes for shorter inputs",
        "It always produces large hash values for larger inputs",
        "It ensures that all hash values are sequential",
      ],
      answer: "It minimizes collision",
    },
    {
      id: 4,
      question: "4. In which scenarios are you more likely to encounter collisions in a hash table?",
      options: [
        "When hash table is empty or nearly empty",
        "When table size is a prime number",
        "When a simple hash function like h(k) = k mod(10) is used",
        "When each key is assigned a unique hash value",
      ],
      answer: "When a simple hash function like h(k) = k mod(10) is used",
    },
    {
      id: 5,
      question: "5. For a hash table with a size of 12, if a key 94 is hashed using h(k) = k mod(12), what is the resulting index?",
      options: ["10", "8", "6", "3"],
      answer: "10",
    },
  ],
  posttest: [
    {
      id: 1,
      question: "1. What is ...?",
      options: ["Option 1", "Option 2", "Option 3", "Option 4"],
      answer: "Option 1",
    },
    // Add more questions for posttest here
  ],
};

// Header Component
const Header = ({ toggleSidebar }) => (
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
      <a href="/experiments">Experiments List</a>
    </div>
  </div>
);

// Sidebar Component
const Sidebar = ({ handleOptionClick }) => (
  <div className="toggle-section">
    <ul type="none">
      <li onClick={() => handleOptionClick('Aim')}>Aim</li>
      <li onClick={() => handleOptionClick('Overview')}>Overview</li>
      <li onClick={() => handleOptionClick('Pretest')}>Pretest</li>
      <li onClick={() => handleOptionClick('Concept')}>Concept</li>
      <li onClick={() => handleOptionClick('Practice')}>Practice</li>
      <li onClick={() => handleOptionClick('Exercise')}>Exercise</li>
      <li onClick={() => handleOptionClick('Posttest')}>Posttest</li>
      <li onClick={() => handleOptionClick('Applications')}>Real Life Applications</li>
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

  useEffect(() => {
    if (activeContent === 'Pretest') {
      setActiveTestType('pretest');
    } else if (activeContent === 'Posttest') {
      setActiveTestType('posttest');
    }
  }, [activeContent]);

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
    setActiveTestType((prevType) => (prevType === 'pretest' ? 'posttest' : 'pretest'));
  };

  const getOptionClass = (quiz, option) => {
    if (!submitted) return '';
    if (userAnswers[quiz.id] === option) {
      return option === quiz.answer ? 'correct' : 'incorrect';
    }
    return '';
  };

  const renderContent = () => {
    switch (activeContent) {
      case 'Aim':
        return (
          <div className="intro">
            <h1 className="heading">Quadratic Probing</h1>
            <h2 className="sub-heading">Estimated Time</h2>
            <p>45 minutes</p><br></br>
            <h2 className="sub-heading">Learning Objectives</h2>
            <ul>
              <li>To demonstrate the mechanism of quadratic probing.</li>
              <li>To effectively address collision issues in hash tables using the quadratic probing technique.</li>
              <li>To analyze the performance of quadratic probing compared to linear probing. </li>
              <li>To explore the practical applications of quadratic probing.</li>
            </ul>
          </div>
        );
        case 'Overview':
          return (
            <div className="intro">
              <h1 className="heading">Quadratic Probing</h1>
              <h2 className='sub-heads'>Conceptual Video</h2>
              <div className='video-container'>
              <video width="600" controls className='video'>
              <source src="/Probing_Overview.mp4" type="video/mp4" />
              Your browser does not support the video tag.
              </video>
              </div>
              <h2 className='sub-heads'>Prerequisites</h2>
              <p>This experiment requires you to have basic knowledge about :</p>
              <ul>
                <li><a href='https://www.geeksforgeeks.org/introduction-to-arrays-data-structure-and-algorithm-tutorials/' className='url'>Arrays</a></li>
                <li><a href='https://www.geeksforgeeks.org/what-is-linked-list/' className='url'>Linked List</a></li>
                <li><a href='https://www.geeksforgeeks.org/time-complexity-and-space-complexity/' className='url'>Time and space complexity</a></li>
                </ul>
            </div>
          );

      case 'Pretest':
      case 'Posttest':

        return (
          <div className='intro'>
            <h1 className='heading'>{activeTestType.charAt(0).toUpperCase() + activeTestType.slice(1)} Quiz</h1>
            {quizzes.map((quiz) => (
              <div key={quiz.id}>
                <br />
                <h3>{quiz.question}</h3>
                <br />
                <div className='indent'>
                  {quiz.options.map((option) => (
                    <label key={option} className={`option-label ${getOptionClass(quiz, option)}`}>
                      <input
                        type="radio"
                        name={quiz.id}
                        onChange={() => handleAnswerChange(quiz.id, option)}
                        disabled={submitted} // Disable inputs after submission
                      />
                      {option}
                      <br />
                    </label>
                  ))}
                </div>
              </div>
            ))}
            <button className='SubmitButton' onClick={handleSubmit} disabled={submitted}>
              Submit
            </button>
            {submitted && (
              <div className='score-display'>
                <h3>Your Score: {correctAnswers} / {quizzes.length}</h3>
              </div>
            )}
          </div>
        );


        case 'Concept':
          return (
            <div className="intro">
              <h1 className="heading">Quadratic Probing</h1>
              <h2 className="sub-heading">Conceptual Video</h2>
              <div className='video-container'>
                <video width="600" controls className='video'>
                <source src="/Probing_Concept.mp4" type="video/mp4" />
                Your browser does not support the video tag.
                </video>
                </div>
              <h2 className="sub-heading">What is Quadratic Probing</h2>
              <p>Quadratic probing is an open addressing scheme which operates by taking the original hash index and adding successive square of c (where, c is the number of collisions occurred) until an open slot is found.</p><br></br>
              <h2 className='sub-heading'>Quadratic Probing Demonstration</h2>
              <img src='/Probing.png' className='image' alt='Description of the Probing' />
              </div>
          );

          case 'Practice':
          return <QuadraticProbing />;

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
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => setShowSidebar(!showSidebar);

  const handleOptionClick = (content) => {
    setActiveContent(content);  // Set the selected content
    setShowSidebar(false);      // Automatically close the sidebar
  };

  return (
    <div className="App">
      <Header toggleSidebar={toggleSidebar} />
      <div className="content">
        {showSidebar && <Sidebar handleOptionClick={handleOptionClick} />}
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
