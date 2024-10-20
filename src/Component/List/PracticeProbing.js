import React, { useState } from 'react';
import './PracticeProbing.css'; // Include CSS for styling

const QuadraticProbing = () => {
  const [hashTable, setHashTable] = useState(new Array(10).fill(null));
  const [inputValue, setInputValue] = useState('');
  const [message, setMessage] = useState('');
  const [steps, setSteps] = useState([]);
  const [messageColor, setMessageColor] = useState(''); // New state for message color

  const hashFunction = (key) => key % 10;

  const quadraticProbing = (key) => {
    const initialHash = hashFunction(key);
    let i = 0;
    let index;
    const probeSteps = [];

    // Probe until we either find the element or reach an empty slot
    while (i < 10) {
      index = (initialHash + i * i) % 10;
      probeSteps.push(`Index = (${initialHash} + ${i}²) % 10 = ${index}`);

      if (hashTable[index] === key || hashTable[index] === null) {
        return { index, found: hashTable[index] === key, steps: probeSteps };
      }
      i++;
    }
    return { index: -1, found: false, steps: probeSteps };
  };

  const handleInsert = () => {
    const key = parseInt(inputValue);
    if (isNaN(key)) {
      setMessage('Please enter a valid number.');
      setMessageColor('red');
      return;
    }

    const { index, found, steps } = quadraticProbing(key);
    setSteps(steps);

    if (index === -1 || found) {
      setMessage('Hash table is full or element already exists.');
      setMessageColor('red');
    } else {
      const newHashTable = [...hashTable];
      newHashTable[index] = key;
      setHashTable(newHashTable);
      setMessage(`Element ${key} added at index ${index}.`);
      setMessageColor('green');
    }
  };

  const handleSearch = () => {
    const key = parseInt(inputValue);
    if (isNaN(key)) {
      setMessage('Please enter a valid number.');
      setMessageColor('red');
      return;
    }

    const { index, found, steps } = quadraticProbing(key);
    setSteps(steps);

    if (found) {
      setMessage(`Element ${key} found at index ${index}.`);
      setMessageColor('green');
    } else {
      setMessage('Element not found.');
      setMessageColor('red');
    }
  };

  const handleRemove = () => {
    const key = parseInt(inputValue);
    if (isNaN(key)) {
      setMessage('Please enter a valid number.');
      setMessageColor('red');
      return;
    }

    const { index, found, steps } = quadraticProbing(key);
    setSteps(steps);

    if (found) {
      const newHashTable = [...hashTable];
      newHashTable[index] = null; // Set the slot to null to remove the element
      setHashTable(newHashTable);
      setMessage(`Element ${key} removed from index ${index}.`);
      setMessageColor('green');
    } else {
      setMessage('Element not found.');
      setMessageColor('red');
    }
  };

  const handleReset = () => {
    setHashTable(new Array(10).fill(null));
    setInputValue('');
    setMessage('');
    setSteps([]);
    setMessageColor('');
  };

    return (
    <div className="quadratic-probing">
      <h2>Quadratic Probing Simulation</h2>
      <div className="hash-table">
        {hashTable.map((value, index) => (
          <div key={index} className="hash-cell">
            <div className={`cell ${value !== null ? 'filled' : ''}`}>
              {value !== null ? value : ''}
            </div>
            <div className="index">{index}</div>
          </div>
        ))}
      </div>

      <div className="controls">
        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter a number"
          className="input-bar"
        />
        <div className="button-group">
          <button onClick={handleInsert} className='Practice'>Insert</button>
          <button onClick={handleSearch} className='Practice'>Search</button>
          <button onClick={handleRemove} className='Practice'>Remove</button>
          <button onClick={handleReset} className='Practice'>Reset</button>
        </div>
      </div>

      <div className="message">
        <h3>Steps:</h3>
        <ul>
          {steps.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ul>
        <br></br>
        <p style={{ color: messageColor }}>{message}</p>
      </div>
    </div>
  );
};

const Exercise = () => {
  // Generate random numbers for the question
  const generateQuestion = () => {
    const hashTableSize = 10; // Size of the hash table
    const numbers = new Set();  // Using a Set to avoid duplicates

    // Generate numbers that will collide based on the hash function
    while (numbers.size < 5) {
        const baseNumber = Math.floor(Math.random() * 50); // Base number to generate from 0 to 49
        // Generate a number that will hash to the same index
        const collidingNumber = baseNumber + (Math.floor(Math.random() * 5) * hashTableSize); // Adding multiples of the hash table size for collision
        numbers.add(baseNumber); // Add the base number
        numbers.add(collidingNumber); // Add the colliding number
    }

    return Array.from(numbers).slice(0, 5); // Convert Set to Array and ensure we return only 5 unique numbers
};

const quadraticProbe = (num, table, size) => {
  let i = 1; // Start probing with i = 1
  let index = num % size; // Initial index

  // Quadratic probing to find an empty slot
  while (table[index] !== '' && i <= size) {
    index = (num % size + i * i) % size; // Quadratic probing formula
    i++;  // Increment after probing
  }

  // If a valid slot is found, return the index
  return (table[index] === '') ? index : -1; // Return -1 if the table is full
};

// Initialize the table and elements to insert
let size = 10;
let table = Array(size).fill('');
let elements = [15, 4, 35, 65, 14];

// Insert elements into the hash table
elements.forEach(num => {
  let result = quadraticProbe(num, table, size);
  if (result !== -1) {
    table[result] = num; // Insert the element into the table
  } else {
    console.log(`Table full, couldn't insert ${num}`);
  }
});



  const tableSize = 10;
  const [question, setQuestion] = useState(generateQuestion());
  const [hashTable, setHashTable] = useState(Array(tableSize).fill(''));
  const [boxColors, setBoxColors] = useState(Array(tableSize).fill('')); // Track colors

  // Update table values based on user input
  const handleInputChange = (index, value) => {
    const newHashTable = [...hashTable];
    newHashTable[index] = value;
    setHashTable(newHashTable);
  };

  // Check correctness
  const checkAnswers = () => {
    const newColors = [...boxColors]; // Copy the current box colors state
  
    // Reset all boxes to no special class
    for (let i = 0; i < newColors.length; i++) {
      newColors[i] = ''; // Initially, all boxes are unmarked
    }
  
    // Mark correct answers based on quadratic probing
    question.forEach((num) => {
      const correctIndex = quadraticProbe(num, Array(tableSize).fill(''), tableSize); // Correct index based on probing
      const userValue = parseInt(hashTable[correctIndex], 10);  // User's input at that index
  
      if (userValue === num) {
        newColors[correctIndex] = 'correct'; // If correct, mark it as correct (no cross)
      }
    });
  
    // Cross out all remaining boxes that are not marked as correct
    for (let i = 0; i < newColors.length; i++) {
      if (newColors[i] !== 'correct') {
        newColors[i] = 'crossed'; // Cross out all boxes that are not correct
      }
    }
  
    setBoxColors(newColors); // Update the boxColors state
  };
  

  // Reset table and colors
  const resetTable = () => {
    setHashTable(Array(tableSize).fill(''));
    setBoxColors(Array(tableSize).fill(''));
  };

  // Generate a new question
  const newQuestion = () => {
    setQuestion(generateQuestion());
    resetTable();
  };

  return (
    <div className="Exercise">
      <h1>Quadratic Probing Hash Table Simulation</h1>
      <p>
        <strong>Question:</strong> Insert {question.join(', ')} into the hash table using quadratic probing.
      </p>

      <div className="hash-table">
        {hashTable.map((value, index) => (
          <div>
          <div key={index} className={`box ${boxColors[index]}`}>
            <input
              type="text"
              value={value}
              onChange={(e) => handleInputChange(index, e.target.value)}
              maxLength={2}
            />
          </div>
          <div> <span className="index-label">{index}</span></div>
          </div>

        ))}
      </div>

      <div className="controls2">
        <button onClick={checkAnswers}>Submit</button>
        <button onClick={resetTable}>Reset</button>
        <button onClick={newQuestion}>New Question</button>
      </div>

      <div className="legend">
        <p><span className="box correct"></span> Correctly Filled Boxes</p>
      </div>

      <div className="steps">
        <p>Steps:</p>
      </div>
    </div>
  );
};

  export { QuadraticProbing, Exercise };
