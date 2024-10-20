import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import './Probing.css'; // Ensure your CSS file is included for styling
import { QuadraticProbing, Exercise } from './PracticeProbing';


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
      question: "1. Explain how quadratic probing resolves collisions.",
      options: ["It uses the formula h(k) = h(k) + i*i  to find the next index for collisions, where i is the number of attempts", "It always uses the next index regardless of the value of i", " It only allows one collision per entry, otherwise it gives an error", "It uses a linear function to calculate the next index after a collision"],
      answer: "It uses the formula h(k) = h(k) + i*i  to find the next index for collisions, where i is the number of attempts",
    },
    {
      id: 2,
      question: "2. Given a hash table of size 11, and the following hash function: h(k) = k % 11, insert the keys 20, 21, 31, and 42.",
      options: ["The keys will collide at index 1 and stay there", "The final placement is 20 at index 9, 21 at index 10, 31 at index 9, and 42 at index 8", "All keys will be placed sequentially in the table without any collisions", "All keys will be placed at random index"],
      answer: "The final placement is 20 at index 9, 21 at index 10, 31 at index 9, and 42 at index 8",
    },
    {
      id: 3,
      question: "3. What is a significant limitation of quadratic probing?",
      options: ["It only works with a hash table size that is a prime number", "It is slower than separate chaining in all cases", "It can lead to secondary clustering, where sequences of occupied slots can form", "It can only handle small datasets"],
      answer: "It can lead to secondary clustering, where sequences of occupied slots can form",
    },
    {
      id: 4,
      question: "4. How does quadratic probing affect memory usage in a hash table?",
      options: ["It always uses less memory than linear probing", " It guarantees that all entries are stored consecutively in memory", " It requires additional memory for each entry", "It can lead to inefficient memory use when the load factor is high"],
      answer: "It can lead to inefficient memory use when the load factor is high",
    },
    {
      id: 5,
      question: "5. How is the load factor of a hash table calculated?",
      options: ["Load factor = number of empty slots / total slots", " Load factor = size of the table / number of entries", "Load factor = number of entries / size of the table", "Load factor = total slots / number of collisions"],
      answer: "Load factor = number of entries / size of the table",
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
      <li onClick={() => handleOptionClick('Real Life Applications')}>Real Life Applications</li>
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

  const videoId = "0WzhEhhKb9o";
  const videoId2 = "VzAPaX0zU90";
  
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
              <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
      <iframe
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
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
            <div className="intro">
              <h1 className="heading">Quadratic Probing</h1>
              <h2 className="sub-heading">Conceptual Video</h2>
              <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
      <iframe
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${videoId2}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
              <h2 className="sub-heading">What is Quadratic Probing</h2>
              <p>Quadratic probing is an open addressing scheme which operates by taking the original hash index and adding successive square of c (where, c is the number of collisions occurred) until an open slot is found.</p><br></br>
              <h2 className='sub-heading'>Quadratic Probing Demonstration</h2>
              <img src='/Probing.png' className='image' alt='Description of the Probing' />
              </div>
          );

          case 'Practice':
          return <QuadraticProbing />;

          case 'Exercise':
            return <Exercise />;

            case 'Real Life Applications':
              return(
                <div className='intro'>
                <h1 className='heading'>Real Life Applications</h1>
                <ul>
                  <li><h2 className='sub-heading'>Databases and Caches: </h2>
                  <p> Hash tables employing quadratic probing are used in in-memory databases and caches,<br></br> 
                  where rapid lookups are necessary, such as indexing frequently accessed records.</p></li>
                  <li><h2 className='sub-heading'>Compilers and Symbol Tables:</h2>
                  <p>Compilers often rely on hash tables to store symbol tables, which track variables, function names,<br></br> and constants.
                     Using quadratic probing helps manage collisions and ensures quicker access during code parsing.</p></li>
                     <li><h2 className='sub-heading'>Routers and Network Systems:</h2>
                     <p>Hash tables are utilized to manage routing tables or track network flows. With quadratic probing, routers efficiently<br></br>
                       resolve collisions in hash-based data structures, contributing to network performance optimization.</p></li>
                  <li><h2 className='sub-heading'>Gaming and Real-Time Systems:</h2>
                  <p>Some video games use hash tables for managing in-game assets like textures or entities. Quadratic probing <br></br>
                    can ensure fast and predictable access times, which is crucial for real-time systems.</p></li>
                </ul>
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
