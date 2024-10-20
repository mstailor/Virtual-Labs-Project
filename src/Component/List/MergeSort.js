import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import './MergeSort.css'; // Ensure your CSS file is included for styling

// Predefined quizzes
const quizzesData = {
  pretest: [
    {
      id: 1,
      question: "What is Merge Sort?",
      options: ["A sorting algorithm", "A searching algorithm", "A graph algorithm", "None of the above"],
      answer: "A sorting algorithm",
    },
    {
      id: 2,
      question: "What is the time complexity of Merge Sort?",
      options: ["O(n log n)", "O(n^2)", "O(n)", "O(log n)"],
      answer: "O(n log n",
    },
    // Add more quiz questions as needed
  ],
  posttest: [
    // Add posttest questions similarly
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
          <div className='intro'>
            <h1 className='heading'> Merge Sort</h1>
            <h2 className='sub-heading'>Estimated Time</h2>
            <p>...</p>
            <h2 className='sub-heading'>Learning Objectives of this Module</h2>
            <ul>
              <li>Learn about Merge Sort</li>
              <li>Understanding Merge Sort operations: <div className='indent'><ul type='none'><li>1. Splitting</li><li>2. Merging</li></ul></div></li>
            </ul>
          </div>
        );

      case 'Overview':
        return (
          <div className='intro'>
            <h1 className='heading'> Merge Sort</h1>
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
            <div className="Button-container">
  <button className="SubmitButton" onClick={handleSubmit} disabled={submitted}>
    Submit
  </button>
  {submitted && (
    <button onClick={downloadPDF} className="pdfButton">
      Download Results as PDF
    </button>
  )}
</div>

            {submitted && (
              <div className='score-display'>
                <h3>Your Score: {correctAnswers} / {quizzes.length}</h3>
                
              </div>
            )}
          </div>
        );

      case 'Concept':
        return (
          <div className='intro'>
            <h1 className='heading'> Merge Sort </h1>
            <h2 className='sub-heading'> Merge Sort Concept and Algorithm </h2>
            <h2 className='sub-heading'> What is Merge Sort?</h2>
            <p>
              Merge sort is a sorting algorithm that follows the divide-and-conquer approach.
              It works by recursively dividing the input array into smaller subarrays and
              sorting those subarrays then merging them back together to obtain the sorted array.
            </p>
            <h2 className='sub-heading'> Merge Sort Demonstration </h2>
            <img className='image' src="/Sources/yourImage.jpeg" alt="Merge Sort Illustration" />
          </div>
        );

      default:
        return <p>Select an option from the sidebar.</p>;
    }
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    const startY = 20; // Starting Y position for the first element
    let currentY = startY; // Keep track of current Y position
  
    // Title Section
    doc.setFontSize(15);
    doc.setFont("helvetica", "bold");
    doc.text('Quiz Results', 20, currentY);
    
    // Add a thicker Line Below Title
    doc.setLineWidth(1);
    doc.line(20, currentY + 6, 190, currentY + 6); // Adjusted line position
    <br></br>
  
    // Reset Color and Font for Answers Section
    currentY += 10; // Move down for answers heading
    doc.setTextColor(0);
    doc.setFontSize(10);
  
    // Move down for answers section
    currentY += 5; 
  
    // Loop through quizzes to display questions and options
    quizzes.forEach((quiz, index) => {
      // Question
      const questionText = `${quiz.question}`;
      doc.setFont("helvetica", "bold");
      doc.text(questionText, 20, currentY);
      
      // Move down for options
      currentY += 8; 
  
      // Options
      doc.setFont("helvetica", "normal"); 
      quiz.options.forEach((option, optionIndex) => {
        const userAnswer = userAnswers[quiz.id];
        const isCorrect = option === quiz.answer;
        const isUserAnswer = option === userAnswer;
  
        // Color Logic
        if (isUserAnswer && !isCorrect) {
          // Wrong answer in red
          doc.setTextColor(255, 0, 0); // Red
        } else if (isCorrect) {
          // Correct answer in green
          doc.setTextColor(0, 128, 0); // Green
        } else {
          doc.setTextColor(0); // Default color for other options
        }
  
        // Print the option
        doc.text(`${String.fromCharCode(65 + optionIndex)}. ${option}`, 20, currentY);
        
        // Move down for the next option
        currentY += 8; // Adjust spacing as needed
      });
  
      // Reset color for the next question
      doc.setTextColor(0);
      
      // Add extra space after each question block
      currentY += 5; // Additional spacing between questions
    });

        // Score Section
        currentY += 10; // Move down for score
        doc.setTextColor(0, 102, 204); // Blue color
        doc.setFontSize(15);
        doc.text(`Your Score: ${correctAnswers} / ${quizzes.length}`, 20, currentY);
      
  
    // Save the PDF
    doc.save('quiz-results.pdf');
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
        <ul type="none">
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
