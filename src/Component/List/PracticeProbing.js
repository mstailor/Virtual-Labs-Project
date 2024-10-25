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
    setInputValue('');
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
    setInputValue('');
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
    setInputValue('');
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
      <h2 className='heading3'>Quadratic Probing Simulation</h2>
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
  const tableSize = 10;
  
  // Generate random numbers for the question
  const generateQuestion = () => {
    const hashTableSize = 10;
    const numbers = new Set();

    while (numbers.size < 5) {
      const baseNumber = Math.floor(Math.random() * 50);
      for (let i = 1; i <= 3; i++) {
        const collidingNumber = baseNumber + (Math.floor(Math.random() * 5) * hashTableSize);
        numbers.add(collidingNumber);
      }
  
      numbers.add(baseNumber);
    }
    return Array.from(numbers).slice(0, 5);
  };

  // Quadratic probing logic
  const quadraticProbe = (num, table, size) => {
    let i = 1;
    let index = num % size;

    while (table[index] !== '' && i <= size) {
      index = (num % size + i * i) % size;
      i++;
    }

    return (table[index] === '') ? index : -1;
  };

  const [question, setQuestion] = useState(generateQuestion());
  const [hashTable, setHashTable] = useState(Array(tableSize).fill(''));
  const [boxColors, setBoxColors] = useState(Array(tableSize).fill(''));

  // Handle user input in the hash table
  const handleInputChange = (index, value) => {
    const newHashTable = [...hashTable];
    newHashTable[index] = value;
    setHashTable(newHashTable);
  };

  // Check if the answers are correct
  const checkAnswers = () => {
    const newColors = Array(tableSize).fill(''); // Reset all box colors
    const filledTable = Array(tableSize).fill(''); // To simulate the insertion

    question.forEach((num) => {
      const correctIndex = quadraticProbe(num, filledTable, tableSize);

      if (correctIndex !== -1) {
        const userValue = parseInt(hashTable[correctIndex], 10);

        if (userValue === num) {
          newColors[correctIndex] = 'correct1'; // Mark as correct
        }
        filledTable[correctIndex] = num; // Simulate the insertion
      }
    });

    // Mark incorrect answers
    for (let i = 0; i < newColors.length; i++) {
      if (newColors[i] !== 'correct1') {
        newColors[i] = 'crossed'; // Mark incorrect answers
      }
    }

    setBoxColors(newColors); // Update colors
  };

  // Reset the table and box colors
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
      <h1>Quadratic Probing Exercise</h1>
      <p>
        <strong>Question:</strong> Insert {question.join(', ')} into the hash table using quadratic probing.
      </p>

      <div className="hash-table">
        {hashTable.map((value, index) => (
          <div key={index}>
            <div className={`box ${boxColors[index]}`}>
              <input
                type="text"
                value={value}
                onChange={(e) => handleInputChange(index, e.target.value)}
                maxLength={2}
              />
            </div>
            <div><span className="index-label">{index}</span></div>
          </div>
        ))}
      </div>

      <div className="controls2">
        <button onClick={checkAnswers}>Submit</button>
        <button onClick={resetTable}>Reset</button>
        <button onClick={newQuestion}>New Question</button>
      </div>

      <div className="legend">
        <p><span className="box correct1"></span> Correctly Filled Boxes</p>
        <p><span className="box crossed"></span> Incorrectly Filled Boxes</p>
      </div>
    </div>
  );
};

  export { QuadraticProbing, Exercise };
