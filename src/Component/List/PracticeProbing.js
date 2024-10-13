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
export default QuadraticProbing;
