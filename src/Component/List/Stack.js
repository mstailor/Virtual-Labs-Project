import React, { useState, useEffect } from 'react';
import './Stack.css'; // Ensure your CSS file is included for styling

// Predefined quizzes
const quizzesData = {
  pretest: [
    {
      id: 1,
      question: "Which of the following data structures follows the Last In First Out (LIFO) principle?",
      options: ["Queue", "Stack", "Array", "Linked List"],
      answer: "Stack"
    },
    {
      id: 2,
      question: "What is the time complexity of the push operation in a stack implemented using an array?",
      options: ["O(1)", "O(n)", "O(log n)", "O(n^2)"],
      answer: "O(1)"
    },
    {
      id: 3,
      question: "In a stack, which operation is used to remove the top element?",
      options: ["Insert", "Delete", "Pop", "Push"],
      answer: "Pop"
    },
    {
      id: 4,
      question: "If a stack is implemented using a linked list, where is the new element added?",
      options: ["At the head", "At the tail", "In the middle", "Random position"],
      answer: "At the head"
    },
    {
      id: 5,
      question: "Which of the following operations can be performed on a stack?",
      options: ["Enqueue and Dequeue", "Push and Pop", "Insert and Delete", "Search and Sort"],
      answer: "Push and Pop"
    }
],
posttest: [
  {
    id: 1,
    question: "What happens when you try to pop from an empty stack?",
    options: ["Underflow", "Overflow", "Segmentation fault", "No effect"],
    answer: "Underflow"
  },
  {
    id: 2,
    question: "Which of the following applications use stacks?",
    options: ["Function call management in recursion", "CPU scheduling", "Breadth-First Search (BFS)", "Memory management in heap"],
    answer: "Function call management in recursion"
  },
  {
    id: 3,
    question: "A stack can be implemented using which two data structures?",
    options: ["Arrays and Queues", "Linked List and Arrays", "Queues and Trees", "Heaps and Graphs"],
    answer: "Linked List and Arrays"
  },
  {
    id: 4,
    question: "In a stack, if the PUSH operation is performed on a full stack, what is the result?",
    options: ["Underflow", "Overflow", "Element is ignored", "Segmentation fault"],
    answer: "Overflow"
  },
  {
    id: 5,
    question: "Which of the following is a valid postfix expression for the infix expression (A + B) * (C - D)?",
    options: ["A B + C D - *", "A B C D + - *", "A + B * C - D", "A B * C D + -"],
    answer: "A B + C D - *"
  }
],
};


// stack visual 

const Stack = () => {
    const [stack, setStack] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [message, setMessage] = useState('');
    const [lastPushedItem, setLastPushedItem] = useState('');
    const [lastPoppedItem, setLastPoppedItem] = useState('');

    // Disable all buttons during operations
    const [isDisabled, setIsDisabled] = useState(false);

    // Handle Push Button Click
    const handlePush = () => {
        if (!inputValue) {
            setMessage("Please enter a value.");
            return;
        }
        if (stack.length >= 5) {
            setInputValue('');
            setMessage("Stack Overflow");
            return;
        }

        const newStack = [...stack, inputValue];
        setStack(newStack);
        setLastPushedItem(inputValue);
        setMessage(`Item ${inputValue} is pushed.`);
        setInputValue('');
        disableButtonsTemporarily();
    };

    // Handle Pop Button Click
    const handlePop = () => {
        if (stack.length === 0) {
            setMessage("Stack Underflow");
            return;
        }

        const newStack = [...stack];
        const poppedItem = newStack.pop();
        setStack(newStack);
        setLastPoppedItem(poppedItem);
        setMessage(`Item ${poppedItem} is popped.`);
        disableButtonsTemporarily();
    };

    // Handle Reset Button Click
    const handleReset = () => {
        setStack([]);
        setLastPushedItem('');
        setLastPoppedItem('');
        setMessage('');
    };

    // Disable buttons temporarily to simulate the delay in animation
    const disableButtonsTemporarily = () => {
        setIsDisabled(true);
        setTimeout(() => {
            setIsDisabled(false);
        }, 1500); // Simulate delay
    };

    return (
        <div className="stack-body">
            <header className="stack-header">
                <h1 className="heading">Stack Visualizer</h1>
            </header>
            <div className="stack-container">
                <div className="stack-container-header">
                    <input 
                        type="number" 
                        className="text" 
                        value={inputValue} 
                        onChange={(e) => setInputValue(e.target.value)} 
                        disabled={isDisabled}
                    />
                    <button className="push" onClick={handlePush} disabled={isDisabled}>Push</button>
                    <button className="pop" onClick={handlePop} disabled={isDisabled}>Pop</button>
                    <button className="reset" onClick={handleReset} disabled={isDisabled}>Reset</button>
                </div>
                <div className="stack-container-body">
                    <div className="stack">
                        <div className="main-stack-bucket">
                            {stack.map((item, index) => (
                                <div key={index} className="ele">{item}</div>
                            ))}
                        </div>
                    </div>
                    <div className="info">
                        <div className="sec1">
                            <h3>Top of the Stack:</h3>
                            <button className="box">{stack[stack.length - 1] || ''}</button>
                        </div>
                        <div className="sec2">
                            <h3>Last Pushed Item:</h3>
                            <button className="box">{lastPushedItem}</button>
                        </div>
                        <div className="sec3">
                            <h3>Last Popped Item:</h3>
                            <button className="box">{lastPoppedItem}</button>
                        </div>
                        <div className="sec3">
                            <h3>Size of the Stack:</h3>
                            <button className="box">5</button>
                        </div>
                        <div className="message-box">
                            <h2>Message Box</h2>
                            <div className="message">{message}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
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
              <p> 20 minutes</p><br></br>
              <h2 className='sub-heading'>About</h2>
              <p>A stack is a linear data structure that follows the Last In, First Out (LIFO) principle, meaning the last element added to the stack is the first one to be removed. Stacks are composed of a collection of elements, where each element is added or removed from one end, called the "top." Stacks are widely used in various applications, including function call management, expression evaluation, and backtracking algorithms.</p>
              <br />
              <br />
              <h2 className='sub-heading'>Learning Objectives of this Module</h2>
              <ul>
                <li>Gain basic understanding of stacks</li>
                <li>Understand Stack operations and associated time complexities</li>
                <li>Understand applications of Stacks</li>
                <li>Analyze common use cases and applications of Stacks</li>
                <li>Understand the advantages and disadvantages of Stacks</li>
              </ul>
            </div>
          </>
        );

      case 'Overview':
        return (
          <>
            <div className='intro'>
              <h1 className='heading'> Stack </h1>
              <p>
              A stack is a linear data structure that operates on the Last In, First Out (LIFO) principle, where the last element added is the first one to be removed. It supports essential operations like push (to add an element), pop (to remove an element), and peek (to view the top element without removing it). Stacks can be implemented using arrays or linked lists and are widely used in programming for various purposes. Key applications include managing function calls during recursion, expression evaluation, backtracking algorithms, undo mechanisms in software, and checking for balanced parentheses in code. Despite its simplicity and efficiency, the stack has limitations such as access restrictions (only the top element can be directly accessed) and potential overflow or underflow errors when working with fixed-size implementations.
              </p>
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
              <img className='image' src="https://media.geeksforgeeks.org/wp-content/cdn-uploads/20221219100314/stack.drawio2.png"></img>
              <br />
              <h2>1. Basic Operations</h2>
    <ul>
        <li><strong>Push</strong>: Adds an element to the top of the stack.</li>
        <li><strong>Pop</strong>: Removes the top element from the stack and returns it.</li>
        <li><strong>Peek (or Top)</strong>: Returns the top element without removing it from the stack.</li>
        <li><strong>isEmpty</strong>: Checks if the stack is empty.</li>
        <li><strong>Size</strong>: Returns the number of elements in the stack.</li>
    </ul>

    <h2>2. Implementation</h2>
    <p>Stacks can be implemented using arrays or linked lists:</p>
    <ul>
        <li><strong>Array-based Stack</strong>: Uses a fixed-size array to store elements. The top of the stack is tracked using an index.</li>
        <li><strong>Linked List-based Stack</strong>: Uses a linked list where each node points to the next node. The top of the stack is represented by the head of the list.</li>
    </ul>

    <h2>3. Characteristics</h2>
    <ul>
        <li><strong>LIFO Structure</strong>: The last element added is the first one to be removed.</li>
        <li><strong>Dynamic Size</strong>: Depending on the implementation, stacks can grow and shrink dynamically.</li>
        <li><strong>Limited Access</strong>: Only the top element is accessible; elements below it cannot be accessed directly.</li>
    </ul>

    <h2>4. Applications</h2>
    <ul>
        <li><strong>Function Call Management</strong>: Stacks are used to keep track of function calls in programming languages.</li>
        <li><strong>Expression Evaluation</strong>: Stacks are used in algorithms for evaluating expressions (like infix, postfix, and prefix).</li>
        <li><strong>Backtracking Algorithms</strong>: Stacks are used in algorithms that explore all possible solutions, such as depth-first search (DFS) in graphs.</li>
        <li><strong>Undo Mechanisms</strong>: Many applications use stacks to implement undo functionality.</li>
    </ul>

    <h2>5. Time Complexity</h2>
    <ul>
        <li><strong>Push</strong>: O(1) – Adding an element to the top of the stack is done in constant time.</li>
        <li><strong>Pop</strong>: O(1) – Removing the top element is also done in constant time.</li>
        <li><strong>Peek</strong>: O(1) – Accessing the top element is done in constant time.</li>
        <li><strong>isEmpty</strong>: O(1) – Checking if the stack is empty is done in constant time.</li>
    </ul>

    <h2>Example of Stack Operations</h2>
    <p>Here’s a simple example to illustrate stack operations:</p>
    <ol>
        <li><strong>Initialization</strong>: Start with an empty stack.</li>
        <li><strong>Push Elements</strong>: 
            <ul>
                <li>Push <code>10</code>: Stack becomes <code>[10]</code></li>
                <li>Push <code>20</code>: Stack becomes <code>[10, 20]</code></li>
                <li>Push <code>30</code>: Stack becomes <code>[10, 20, 30]</code></li>
            </ul>
        </li>
        <li><strong>Peek</strong>: Returns <code>30</code> (the top element).</li>
        <li><strong>Pop</strong>: Removes <code>30</code>, stack becomes <code>[10, 20]</code>.</li>
        <li><strong>Pop</strong>: Removes <code>20</code>, stack becomes <code>[10]</code>.</li>
        <li><strong>isEmpty</strong>: Returns <code>false</code> (stack is not empty).</li>
    </ol>
            </div>
          </>
        );

      case 'Practice':
        return (
          <>
            <div className='intro'>
              <h1 className='heading'> Stack </h1>
              <div>
                <Stack />
              </div>
              <p><a href="https://google.com/" target="_blank" rel="noopener noreferrer">Click here</a></p>
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
