import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import './LinkedList.css';



// Node class for Linked List
// For Practice
class Node {
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }
}

// Linked List class
class SinglyLinkedList {
  constructor() {
    this.head = null;
  }

  // Insert at head
  insertAtHead(value) {
    const newNode = new Node(value);
    newNode.next = this.head;
    this.head = newNode;
  }

  // Insert at tail
  insertAtTail(value) {
    const newNode = new Node(value);
    if (!this.head) {
      this.head = newNode;
      return;
    }
    let current = this.head;
    while (current.next) {
      current = current.next;
    }
    current.next = newNode;
  }

  // Insert at a specific index
  insertAtNode(index, value) {
    if (index === 0) {
      this.insertAtHead(value);
      return;
    }

    const newNode = new Node(value);
    let current = this.head;
    let prev = null;
    let i = 0;

    while (current && i < index) {
      prev = current;
      current = current.next;
      i++;
    }

    if (i === index) {
      newNode.next = current;
      prev.next = newNode;
    } else {
      console.log('Index out of bounds');
    }
  }

  // Search for a node
  search(value) {
    let current = this.head;
    let index = 0;
    while (current) {
      if (current.value === value) {
        return index;
      }
      current = current.next;
      index++;
    }
    return -1; // Node not found
  }

  // Remove node by value
  remove(value) {
    if (!this.head) return;

    // If head is the node to be deleted
    if (this.head.value === value) {
      this.head = this.head.next;
      return;
    }

    let current = this.head;
    let prev = null;

    while (current) {
      if (current.value === value) {
        prev.next = current.next;
        return;
      }
      prev = current;
      current = current.next;
    }
  }

  printList() {
    const nodes = [];
    let current = this.head;
    while (current) {
      nodes.push(current.value);
      current = current.next;
    }
    return nodes;
  }
}

const Practice = () => {
  const [linkedList] = useState(new SinglyLinkedList());
  const [listState, setListState] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [inputTailValue, setInputTailValue] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [nodeIndex, setNodeIndex] = useState('');
  const [nodeValue, setNodeValue] = useState('');
  const [removeValue, setRemoveValue] = useState('');

  // Update list display
  const updateList = () => {
    setListState(linkedList.printList());
  };

  // Insert at head
  const handleInsertAtHead = () => {
    if (inputValue) {
      linkedList.insertAtHead(inputValue);
      setInputValue('');
      updateList();
    }
  };

  // Insert at tail
  const handleInsertAtTail = () => {
    if (inputTailValue) {
      linkedList.insertAtTail(inputTailValue);
      setInputTailValue('');
      updateList();
    }
  };

  // Insert at node
  const handleInsertAtNode = () => {
    if (nodeIndex && nodeValue) {
      linkedList.insertAtNode(parseInt(nodeIndex), nodeValue);
      setNodeIndex('');
      setNodeValue('');
      updateList();
    }
  };

  // Remove node
  const handleRemove = () => {
    if (removeValue) {
      linkedList.remove(removeValue);
      setRemoveValue('');
      updateList();
    }
  };

  // Search node
  const handleSearch = () => {
    if (searchValue) {
      const index = linkedList.search(searchValue);
      if (index !== -1) {
        alert(`Value found at index: ${index}`);
      } else {
        alert('Value not found in the list');
      }
      setSearchValue('');
    }
  };

  return (
    <>
      <div className="intro">
        <h1 className="heading">Singly Linked List Practice</h1>
        <div className="linked-list-diagram">
          <p className="head">Head</p>
          {listState.map((node, index) => (
            <div key={index} className="node">
              <p>{node}</p>
              <div className="arrow-right"></div>
            </div>
          ))}
          <p className="null">Null</p>
        </div>

        <div className="observations">
          <div className="inputs">
            <input
              type="text"
              placeholder="at head"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button className="btn-insert" onClick={handleInsertAtHead}>
              Insert At Head
            </button>
            <input
              type="text"
              placeholder="at tail"
              value={inputTailValue}
              onChange={(e) => setInputTailValue(e.target.value)}
            />
            <button className="btn-insert" onClick={handleInsertAtTail}>
              Insert At Tail
            </button>
            <input
              type="text"
              placeholder="search"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <button className="btn-search" onClick={handleSearch}>
              Search
            </button>
          </div>

          <div className="inputs">
            <input
              type="text"
              placeholder="index"
              value={nodeIndex}
              onChange={(e) => setNodeIndex(e.target.value)}
            />
            <input
              type="text"
              placeholder="at node"
              value={nodeValue}
              onChange={(e) => setNodeValue(e.target.value)}
            />
            <button className="btn-insert" onClick={handleInsertAtNode}>
              Insert At Node
            </button>
            <input
              type="text"
              placeholder="remove"
              value={removeValue}
              onChange={(e) => setRemoveValue(e.target.value)}
            />
            <button className="btn-remove" onClick={handleRemove}>
              Remove
            </button>
          </div>
        </div>

        <h3>Linked List: {listState.join(' -> ')}</h3>
      </div>
    </>
  );
};




// For Exercise
const Exercise = () => {
  const [list, setList] = useState([]); 
  const [inputValue, setInputValue] = useState('');
  const [indexValue, setIndexValue] = useState('');
  const [question, setQuestion] = useState(generateQuestion()); 
  const [message, setMessage] = useState(''); 

  function generateQuestion() {
    const randomList = Array.from({ length: 5 }, () => Math.floor(Math.random() * 100) + 1);
    return randomList;
  }

  // Insert at head
  const insertAtHead = () => {
    if (inputValue) {
      setList([parseInt(inputValue), ...list]);
      setInputValue('');
    }
  };

  // Insert at tail
  const insertAtTail = () => {
    if (inputValue) {
      setList([...list, parseInt(inputValue)]);
      setInputValue('');
    }
  };

  // Insert at index
  const insertAtIndex = () => {
    const index = parseInt(indexValue);
    if (inputValue && !isNaN(index) && index >= 0 && index <= list.length) {
      const newList = [...list];
      newList.splice(index, 0, parseInt(inputValue));
      setList(newList);
      setInputValue('');
      setIndexValue('');
    }
  };

  const resetList = () => {
    setList([]);
    setMessage('');
  };

  // Validate the list
  const handleSubmit = () => {
    if (list.join(', ') === question.join(', ')) {
      setMessage('Correct!');
    } else {
      setMessage('Wrong! Try again.');
    }

    setTimeout(() => {
      setList([]); 
      setQuestion(generateQuestion()); 
      setMessage(''); 
    }, 2000); 
  };

  return (
    <>
      <div className="intro intro-2">
        <h1 className="heading">Singly Linked List Exercise</h1>
        <p className="question">Convert to: {question.join(', ')}</p>
      </div>

      <div className="linked-list-diagram">
        <span className="head">Head</span>
        {list.map((node, index) => (
          <div key={index} className="node">
            {node}
            {index < list.length - 1 && <div className="arrow-right"></div>}
          </div>
        ))}
        <span className="null">Null</span>
      </div>

      <div className="inputs">
        <input
          type="number"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          placeholder="Enter value"
        />
        <input
          type="number"
          value={indexValue}
          onChange={e => setIndexValue(e.target.value)}
          placeholder="At index"
        />
        <button onClick={insertAtHead}>Insert At Head</button>
        <button onClick={insertAtTail}>Insert At Tail</button>
        <button onClick={insertAtIndex}>Insert At Index</button>
      </div>

      <div className="controls">
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={resetList}>Reset</button>
        {message && <p className="message">{message}</p>}
      </div>
    </>
  );
};




// Predefined quizzes
const quizzesData = {
  pretest: [
    {
      id: 1,
      question: "1. What is the primary difference between an array and a linked list?",
      options: [
        "Arrays are dynamic, linked lists are static.",
        "Arrays store elements in contiguous memory locations, linked lists store elements in non-contiguous memory locations.",
        "Arrays are faster for insertion and deletion, linked lists are slower.",
        "Arrays can hold heterogeneous data, linked lists cannot."
      ],
      answer: "Arrays store elements in contiguous memory locations, linked lists store elements in non-contiguous memory locations.",
    },
    {
      id: 2,
      question: "2. Which of the following data structures allows random access to its elements?",
      options: ["Array", "Stack", "Queue", "Linked List"],
      answer: "Array",
    },
    {
      id: 3,
      question: "3. Which of the following operations takes O(1) time in an array?",
      options: [
        "Insertion at the beginning",
        "Deletion at the end",
        "Accessing an element by index",
        "Insertion at the end"
      ],
      answer: "Accessing an element by index",
    },
    {
      id: 4,
      question: "4. What is the time complexity to insert an element at the beginning of an array of size n?",
      options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
      answer: "O(n)",
      explanation: "Shifting all the elements to make space for the new element takes linear time."
    },
    {
      id: 5,
      question: "5. What is a pointer in programming?",
      options: [
        "A variable that stores the address of another variable",
        "A function used to manipulate arrays",
        "A type of loop in C programming",
        "A value that stores the data type"
      ],
      answer: "A variable that stores the address of another variable",
    },
  ],
  posttest: [
    {
      id: 1,
      question: "1. Which of the following is NOT a type of Linked List?",
      options: [
        "Singly Linked List",
        "Doubly Linked List",
        "Circular Linked List",
        "Sequential Linked List"],
      answer: "Sequential Linked List",
    },
    {
      id: 2,
      question: "2. What is the time complexity for inserting an element at the beginning of a singly linked list?",
      options: [
        "O(n)",
        "O(log n)",
        "O(1)",
        "O(n log n)"],
      answer: " O(1)",
    },
    {
      id: 3,
      question: "3. In a doubly linked list, how many pointers does each node contain?",
      options: [
        "1",
        "2",
        "3",
        "4"],
      answer: "3",
    },
    {
      id: 4,
      question: "4. What is the advantage of using a circular linked list over a linear linked list?",
      options: [
        "It uses less memory.",
        "It allows quick access to the middle element.",
        "It allows easy traversal from the last node to the first node.",
        "It does not require any pointer to traverse."],
      answer: "It allows easy traversal from the last node to the first node.",
    },
    {
      id: 5,
      question: "5. Which of the following operations cannot be performed in constant time in a singly linked list?",
      options: [
        "Insert at the beginning",
        "Insert at the end",
        "Delete at the beginning",
        "Search for an element"],
      answer: "Search for an element",
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
      <a href='/experiments'>Experiments List</a>
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
    if (activeContent === 'Pretest') {
      setActiveTestType('pretest');
    } else if (activeContent === 'Posttest') {
      setActiveTestType('posttest');
    }
  }, [activeContent]);

  useEffect(() => {
    setQuizzes(quizzesData[activeTestType]);
    setSubmitted(false);
    setUserAnswers({});
  }, [activeTestType]);

  const handleAnswerChange = (questionId, answer) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const handleSubmit = () => {
    let correctCount = 0;
    quizzes.forEach((quiz) => {
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
          <>
            <h3 className='intro-out'>Aim : </h3>
            <div className='intro'>
              <h1 className='heading'>Singly Linked List</h1>
              <br />
              <br />
              <h2 className='sub-heading'>Estimated Time</h2>
              <p>Approximately 20 minutes</p>
              <br />
              <br />
              <h2 className='sub-heading'>About</h2>
              <p>
                A linked list is a linear data structure where each element is a separate object, known as a node. Each node contains two components: the data and a reference (or pointer) to the next node in the sequence. Linked lists are dynamic and can grow and shrink in size efficiently. They are used in various applications such as memory management, real-time processing, and maintaining ordered collections of elements.
              </p>
              <br />
              <br />
              <h2 className='sub-heading'>Learning Objectives of this Module</h2>
              <ul>
                <li>Learn about Linked List</li>
                <li>Understand how Linked List is stored in memory</li>
                <li>Explore the types of Linked Lists (Singly, Doubly, Circular)</li>
                <li>Analyze common operations like insertion, deletion, and traversal</li>
                <li>Understand the advantages and disadvantages of Linked Lists</li>
              </ul>
            </div>
          </>
        );

      case 'Overview':
        return (
          <>
            <div className='intro'>
              <h1 className='heading'>Singly Linked List Overview</h1>
              <br />
              <p className='description'>
                A linked list is a fundamental data structure used in computer science to store a collection of elements.
                Unlike arrays, where elements are stored in contiguous memory locations, linked lists consist of nodes that
                are connected using pointers. Each node contains data and a reference to the next node in the sequence,
                allowing for dynamic memory allocation and efficient insertion and deletion operations.
              </p>
              <br />
              <h2 className='sub-heading'>Key Features of Linked List:</h2>
              <ul className='list'>
                <li>Dynamic in size: Can grow or shrink as needed.</li>
                <li>Efficient insertions/deletions: Especially at the beginning or middle of the list.</li>
                <li>Sequential access: Traversal happens one element at a time.</li>
              </ul>
              <br />
              <p className='description'>
                Linked lists are widely used in scenarios where dynamic memory allocation is needed, such as in operating
                systems, file systems, and real-time applications. In this module, we will explore various types of linked
                lists, their structures, and common operations like insertion, deletion, and traversal.
              </p>
            </div>
          </>
        );

      case 'Practice':
        return (
          <>
            <Practice />
          </>
        );

      case 'Exercise':
        return (
          <>
            <Exercise />
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
          <>
            <div className='intro'>
              <h1 className='heading'>Singly Linked List Concept</h1>
              <br />
              <br />
              <h2 className='sub-heading'> Linked List Concept and Algorithm </h2>
              <br />
              <h2 className='sub-heading'> What is Linked List? </h2>
              <br />
              <p>
                A linked list is a linear data structure that consists of a series
                of nodes connected by<br /> pointers (in C or C++) or references (in Java,
                Python and JavaScript). Each node contains<br /> data and a pointer/reference
                to the next node in the list. Unlike arrays, linked lists <br /> allow for
                efficient insertion or removal of elements from any position in the list,
                as the<br /> nodes are not stored contiguously in memory.
              </p>
              <br />
              <br />
              <h2 className='sub-heading'> Linked List Demonstration </h2>
              <img className='image' src="https://media.geeksforgeeks.org/wp-content/uploads/20240410135517/linked-list.webp"></img>
              <br />
            </div>
          </>
        );

      case 'Applications':
        return (
          <div className='intro'>
            <h1 className='heading'>Singly Linked List Applications</h1>
            <br />
            <h2 className='sub-heading'>Real-Life Applications of Linked Lists</h2>
            <br />
            <ul className='list'>
              <li>
                <strong>Music Playlists:</strong> Many music players implement linked lists to organize and play songs in a playlist. Each song is a node, and the next song in the queue is the next node in the linked list. This allows for easy insertion or deletion of songs from the playlist.
              </li>
              <li>
                <strong>Web Browsers:</strong> The forward and backward navigation feature in web browsers is often implemented using a doubly linked list. Each webpage you visit is a node, and you can move forward or backward using the browser's history stored in a linked list.
              </li>
              <li>
                <strong>Image Viewers:</strong> Image viewer applications often use linked lists to navigate between images. The viewer loads one image at a time, and each image points to the next and/or previous one in the sequence.
              </li>
              <li>
                <strong>Undo/Redo Operations:</strong> Many text editors or applications with undo/redo functionalities use linked lists to track actions. Each action is stored as a node, allowing users to easily go back (undo) or forward (redo) through previous actions.
              </li>
              <li>
                <strong>Memory Management:</strong> Operating systems use linked lists to manage free memory blocks. When a memory block is freed, it is added to a linked list of available memory. This makes it efficient to allocate and deallocate memory dynamically.
              </li>
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