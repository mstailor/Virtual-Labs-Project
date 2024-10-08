import React, { useState, useEffect } from 'react'; 
import './Exp.css'; // Ensure your CSS file is included for styling

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
          <>
            <div className='intro'>
              <h1 className='heading'> Merge Sort
                 </h1>
              <br />
              <br />
              <h2 className='sub-heading'>Estimated Time</h2>
              <p></p>
              <br />
              <br/>
              <h2 className='sub-heading'>Learning Objectives of this Module</h2>
              <ul>
                <li>Learn about Merge Sort

                </li>
                <li>Understanding Merge Sort operations :<br />
                <div className='indent'>
                <ul type='none'>
                    <li>1. Splitting</li>
                    <li>2. Merging</li>
                </ul>
                </div>
                </li>
              </ul>
            </div>
          </>
        );

        case 'Overview' :
        return(
        <>
        <div className='intro'>
            <h1 className='heading'> Merge Sort
                 </h1>
        </div>
        </>
        );

        case 'Practice':
          return (
            <>
              <div className='intro'>
                <h1 className='heading'> Merge Sort </h1>
                <br />
                <br />
              </div>
            </>
          );

        case 'Exercise':
          return (
            <>
              <div className='intro'>
                <h1 className='heading'> Merge Sort </h1>
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
            <>
              <div className='intro'>
                <h1 className='heading'> Merge Sort </h1>
                <br />
                <br />
                <h2 className='sub-heading'> Merge Sort Concept and Algorithm </h2>
                <br/>
                <h2 className='sub-heading'> What is Merge Sort
                  ? </h2>
                <br />
                <p>
                Merge sort is a sorting algorithm that follows the divide-and-conquer approach.<br/>
                It works by recursively dividing the input array into smaller subarrays and <br/>
                sorting those subarrays then merging them back together to obtain the sorted array.<br/><br/>
                In simple terms, we can say that the process of merge sort is to divide the array <br/>
                into two halves, sort each half, and then merge the sorted halves back together. <br/>
                This process is repeated until the entire array is sorted.
                </p>
                <br />
                <br />
                <h2 className='sub-heading'> Merge Sort Demonstration </h2>
                <img className='image' src="/Sources/.jpeg"></img>
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