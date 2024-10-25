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
      answer: "O(n log n)",
    },
    {
      id: 3,
      question: "Why is Divide and Conquer important in Merge Sort?",
      options: [
        "It helps to reduce the problem size recursively",
        "It increases the time complexity",
        "It is not relevant to Merge Sort",
        "It only applies to quicksort"
      ],
      answer: "It helps to reduce the problem size recursively"
    },
    {
      id: 4,
      question: "Which of the following is true about Merge Sort?",
      options: [
        "It is an in-place sorting algorithm",
        "It requires additional memory for merging",
        "It does not use recursion",
        "It sorts elements in O(n^2) time"
      ],
      answer: "It requires additional memory for merging"
    },
    {
      id: 5,
      question: "What is the best case time complexity of Merge Sort?",
      options: ["O(n log n)", "O(n)", "O(n^2)", "O(log n)"],
      answer: "O(n log n)"
    }
  ],
  posttest: [
    {
      id: 1,
      question: "What is the primary difference between Merge Sort and Quick Sort?",
      options: [
        "Merge Sort is faster than Quick Sort",
        "Quick Sort is stable while Merge Sort is not",
        "Merge Sort is stable, while Quick Sort is not",
        "Both have the same time complexity in all cases"
      ],
      answer: "Merge Sort is stable, while Quick Sort is not"
    },
    {
      id: 2,
      question: "Why does Merge Sort require additional space?",
      options: [
        "To store intermediate results of recursion",
        "To merge subarrays",
        "To keep track of pivot elements",
        "It doesn't require additional space"
      ],
      answer: "To merge subarrays"
    },
    {
      id: 3,
      question: "In what scenario would you prefer Merge Sort over Quick Sort?",
      options: [
        "When working with limited memory",
        "When stability is required",
        "When the data is mostly sorted",
        "When the data is small"
      ],
      answer: "When stability is required"
    },
    {
      id: 4,
      question: "What is the recurrence relation for Merge Sort?",
      options: [
        "T(n) = T(n/2) + O(n)",
        "T(n) = 2T(n/2) + O(n)",
        "T(n) = 2T(n/2) + O(1)",
        "T(n) = T(n) + O(log n)"
      ],
      answer: "T(n) = 2T(n/2) + O(n)"
    },
    {
      id: 5,
      question: "What is the auxiliary space complexity of Merge Sort?",
      options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"],
      answer: "O(n)"
    }
  ],

};

// Practice Part
const mergeSortSteps = (arr) => {
  let steps = [];

  const merge = (left, right) => {
    let sorted = [], i = 0, j = 0;

    steps.push({ 
      array: [...left, ...right], 
      message: `Merging arrays: [${left.join(', ')}] and [${right.join(', ')}]`,
      status: "merging"
    });

    while (i < left.length && j < right.length) {
      if (left[i] < right[j]) {
        sorted.push(left[i++]);
      } else {
        sorted.push(right[j++]);
      }
    }

    const merged = [...sorted, ...left.slice(i), ...right.slice(j)];
    steps.push({
      array: merged,
      message: `Merged array: [${merged.join(', ')}]`,
      status: "sorted"
    });

    return merged;
  };

  const mergeSort = (arr) => {
    if (arr.length <= 1) {
      steps.push({ 
        array: arr, 
        message: `An array of length 1 cannot be split, ready for merge`,
        status: "ready"
      });
      return arr;
    }

    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));

    return merge(left, right);
  };

  mergeSort(arr);
  steps.push({
    array: arr.sort((a, b) => a - b),
    message: `Final sorted array: [${arr.join(', ')}]`,
    status: "final"
  });
  return steps;
};

const MergeSortSimulator = () => {
  const [array, setArray] = useState([77, 47, 12, 67, 39, 21]);
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);

  const setup = () => {
    const newSteps = mergeSortSteps(array);
    setSteps(newSteps);
    setCurrentStep(0);
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const reset = () => {
    setCurrentStep(0);
  };

  return (
    <div className="merge-sort-container">
      <h1 className="title">Merge Sort Practice</h1>
      <div className="controls">
        <select
          className="array-select"
          onChange={(e) => setArray(e.target.value.split(',').map(Number))}
        >
          <option value={[77, 47, 12, 67, 39, 21]}>Array: [77, 47, 12, 67, 39, 21]</option>
          <option value={[5, 3, 8, 6, 2, 1]}>Array: [5, 3, 8, 6, 2, 1]</option>
        </select>
        <div className='new-but-merge-sort'>
        <button className="btn" onClick={setup}>Setup</button>
        <button className="btn" onClick={reset}>Reset</button>
        <button className="btn" onClick={nextStep}>Next</button>
        </div>
      </div>

      <div className="visualization">
        <h2>Array Visualization</h2>
        {steps.length > 0 && (
          <div className="array-display">
            {steps[currentStep].array.map((num, index) => (
              <div key={index} className={`array-box ${steps[currentStep].status}`}>
                {num}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="observation">
        <h2>Observations</h2>
        {steps.length > 0 && (
          <div>
            <p>{steps[currentStep].message}</p>
          </div>
        )}
      </div>

      {currentStep === steps.length - 1 && (
        <div className="final-message">
          <h2>Sorted Array: [{steps[steps.length - 1].array.join(", ")}]</h2>
        </div>
      )}
    </div>
  );
};


// Exercise Part of Merge Sort
const generateRandomArray = (size) => {
  const arr = [];
  for (let i = 0; i < size; i++) {
    arr.push(Math.floor(Math.random() * 100));
  }
  return arr;
};

const checkMergeOrder = (left, right, result) => {
  let merged = [];
  let i = 0, j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      merged.push(left[i++]);
    } else {
      merged.push(right[j++]);
    }
  }
  merged = [...merged, ...left.slice(i), ...right.slice(j)];
  return JSON.stringify(merged) === JSON.stringify(result);
};

const MergeSortDragDrop = () => {
  const [array, setArray] = useState(generateRandomArray(6));
  const [leftArray, setLeftArray] = useState([]);
  const [rightArray, setRightArray] = useState([]);
  const [mergedArray, setMergedArray] = useState([]);
  const [feedback, setFeedback] = useState("");

  const handleDrop = (arr, setArr, item) => {
    if (!arr.includes(item)) {
      setArr([...arr, item]);
    }
  };

  const handleMergeSubmit = () => {
    if (checkMergeOrder(leftArray, rightArray, mergedArray)) {
      setFeedback("Well done! You have successfully merged the arrays!");
    } else {
      setFeedback("Incorrect merge. Try again.");
    }
  };

  const resetExercise = () => {
    setArray(generateRandomArray(6));
    setLeftArray([]);
    setRightArray([]);
    setMergedArray([]);
    setFeedback("");
  };

  return (
    <div className="merge-sort-exercise">
      <h1>Merge Sort Drag-and-Drop Exercise</h1>

      <div className="array-container">
        <h2>Step 1: Drag items to split the array</h2>
        <p>Original Array: [{array.join(", ")}]</p>

        <div className="drag-items">
          {array.map((item) => (
            <div
              key={item}
              className="draggable-item"
              draggable
              onDragStart={(e) => e.dataTransfer.setData("text/plain", item)}
            >
              {item}
            </div>
          ))}
        </div>

        <div className="drop-zones">
          <div
            className="drop-zone"
            onDrop={(e) => handleDrop(leftArray, setLeftArray, +e.dataTransfer.getData("text/plain"))}
            onDragOver={(e) => e.preventDefault()}
          >
            <h3>Left Half</h3>
            <div>{leftArray.join(", ")}</div>
          </div>

          <div
            className="drop-zone"
            onDrop={(e) => handleDrop(rightArray, setRightArray, +e.dataTransfer.getData("text/plain"))}
            onDragOver={(e) => e.preventDefault()}
          >
            <h3>Right Half</h3>
            <div>{rightArray.join(", ")}</div>
          </div>
        </div>
      </div>

      <div className="merge-step">
        <h2>Step 2: Drag items to merge the arrays</h2>
        <div className="drag-items">
          {[...leftArray, ...rightArray].map((item) => (
            <div
              key={item}
              className="draggable-item"
              draggable
              onDragStart={(e) => e.dataTransfer.setData("text/plain", item)}
            >
              {item}
            </div>
          ))}
        </div>

        <div
          className="drop-zone merge-zone"
          onDrop={(e) => handleDrop(mergedArray, setMergedArray, +e.dataTransfer.getData("text/plain"))}
          onDragOver={(e) => e.preventDefault()}
        >
          <h3>Merged Array</h3>
          <div>{mergedArray.join(", ")}</div>
        </div>

        <button className="btn" onClick={handleMergeSubmit}>Submit Merge</button>
      </div>

      {feedback && <div className="feedback">{feedback}</div>}

      <button className="btn reset-btn" onClick={resetExercise}>Reset Exercise</button>
    </div>
  );
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
      <h1 className='header-heading'>DATA STRUCTURE 1</h1>
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
            <p>30 min</p>
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
            <p>
              <h1>Sort</h1>
              Sorting is the process of arranging elements in a specific order, often numerical or lexicographical. There are various sorting algorithms, each optimized for different scenarios. Sorting can be done in ascending or descending order, and the efficiency of sorting is often measured in terms of time complexity (how fast the algorithm runs) and space complexity (how much memory it uses). Some common sorting algorithms include bubble sort, insertion sort, selection sort, and quick sort. These algorithms range from simple but inefficient ones like bubble sort, to more advanced and efficient algorithms like quick sort.

              <h1>Merge Sort</h1>
              Merge Sort is a divide-and-conquer algorithm that divides the input array into two halves, recursively sorts the two halves, and then merges the sorted halves to produce the final sorted array. It has a time complexity of O(n log n), making it more efficient than many simpler sorting algorithms. Merge Sort works by continuously dividing the array into smaller sub-arrays until each sub-array has a single element. These sub-arrays are then merged back together in the correct order. One advantage of merge sort is its stable sorting property, meaning it maintains the relative order of equal elements, and it can be used for external sorting as it works well with large datasets. However, its space complexity is O(n) due to the additional space needed for merging.
            </p>
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
            <img className='image' src="https://media.geeksforgeeks.org/wp-content/uploads/20230706153706/Merge-Sort-Algorithm-(1).png" alt="Merge Sort Illustration" />
          </div>
        );

      case 'Applications':
        return (
          <>
            <header>
              <h1>Real-Life Applications of Merge Sort</h1>
            </header>

            <section class="application">
              <h2>1. Sorting Large Datasets</h2>
              <p>Merge Sort is often used for sorting large datasets where the entire data does not fit into memory. It is useful for external sorting, such as sorting data on a disk, where we need to minimize the number of disk accesses.</p>
            </section>

            <section class="application">
              <h2>2. Merge Sort in Libraries</h2>
              <p>Many programming libraries and frameworks use Merge Sort because of its stable sorting property. For instance, languages like Java and Python use variants of Merge Sort for their sorting algorithms when stability is required.</p>
            </section>

            <section class="application">
              <h2>3. Sorting Linked Lists</h2>
              <p>Merge Sort is preferred for sorting linked lists because it does not require random access of data, unlike quicksort. It efficiently handles sorting in linked list structures.</p>
            </section>

            <section class="application">
              <h2>4. Data Deduplication</h2>
              <p>When dealing with large amounts of data, such as log files or database records, Merge Sort can be used to efficiently eliminate duplicate entries after sorting them, making it easier to process and clean data.</p>
            </section>
          </>
        );

      case 'Practice': 
      return (
        <>
          <MergeSortSimulator/>
        </>
      );

      case 'Exercise': 
      return (
        <>
          <MergeSortDragDrop/>
        </>
      );
      default:
        return <p>Select an option from the sidebar.</p>;
    }
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    const startY = 20; 
    let currentY = startY; 

    // Title Section
    doc.setFontSize(15);
    doc.setFont("helvetica", "bold");
    doc.text('Quiz Results', 20, currentY);

    // Add a thicker Line Below Title
    doc.setLineWidth(1);
    doc.line(20, currentY + 6, 190, currentY + 6); 
    <br></br>

    currentY += 10; 
    doc.setTextColor(0);
    doc.setFontSize(10);

    currentY += 5;

    quizzes.forEach((quiz, index) => {

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
      currentY += 5; 
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
