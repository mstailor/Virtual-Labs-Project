import React, { useState, useEffect } from 'react';
import './Stack.css'; // Ensure your CSS file is included for styling

// Predefined quizzes
const quizzesData = {
  pretest: [
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
    setActiveTestType(prevType => (prevType === 'pretest' ? 'posttest' : 'pretest'));
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
          <>
            <div className='intro'>
              <h1 className='heading'> Stack </h1>
              <br />
              <br />
              <h2 className='sub-heading'>Estimated Time</h2>
              <p></p>
              <br />
              <br />
              <h2 className='sub-heading'>Learning Objectives of this Module</h2>
              <ul>
                <li>Gain basic understanding of stacks</li>
                <li>Understand Stack operations and associated time complexities</li>
                <li>Understand applications of Stacks</li>
              </ul>
            </div>
          </>
        );

      case 'Overview':
        return (
          <>
            <div className='intro'>
              <h1 className='heading'> Stack </h1>
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
              <br />
              <h2 className='sub-heading'> What is Stack? </h2>
              <br />
              <p>
                A Stack is a linear data structure that follows a particular
                order in which the operations<br /> are performed. The order may be
                LIFO(Last In First Out) or FILO(First In Last Out).<br /> LIFO implies
                that the element that is inserted last, comes out first and FILO
                implies<br /> that the element that is inserted first, comes out last.
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
