import React, { useState, useEffect } from 'react';
import styles from "./CodeGuesser.module.css";

function CodeGuesser() {
  let [digits, setDigits] = useState('');
  let [lastDigit, setLastDigit] = useState('');
  let [codes, setCodes] = useState([]);
  let [gridColumns, setGridColumns] = useState(1); // Default to 1 column initially

  useEffect(() => {
    document.title = "Payday 3 Code Guesser"; // Set the title here
  }, []);

  function handleDigitChange(event) {
    const value = event.target.value;
    setDigits(value);
  }

  function handleLastDigitChange(event) {
    let number = event.target.value;
    setLastDigit(number);
  }

  function calculateCodes() {
    const numbers = ('' + digits).split('');
    const result = [];

    const helper = (path = []) => {
      if (path.length === 4) {
        const pathSet = new Set(path);
        const numbersSet = new Set(numbers);

        if (
          numbersSet.size === pathSet.size &&
          [...numbersSet].every((num) => pathSet.has(num)) &&
          (lastDigit === '' || path[3] === lastDigit)
        ) {
          result.push(path.join(''));
        }
        return;
      }

      for (let i = 0; i < numbers.length; i++) {
        helper([...path, numbers[i]]);
      }
    };

    helper();
    setCodes(result);

    // Determine rows and columns for a balanced grid
    let resultLength = result.length;
    let rows, columns;

    // Start from the square root of the result length to find a balanced grid
    for (let i = Math.floor(Math.sqrt(resultLength)); i > 0; i--) {
        if (resultLength % i === 0) {
            rows = i;
            columns = resultLength / i;
            setGridColumns(columns); // Set the columns directly here
            break; // Found a valid pair, no need to check further
        }
    }

    console.log(`Rows: ${rows}, Columns: ${columns}`);
  }

  useEffect(() => {
    if (digits.toString().length >= 4) {
      setLastDigit('');
    }
  }, [digits]);

  function handleButtonClick(event){
    const styleLine = event.target.style.textDecoration;
    event.target.style.textDecoration = (styleLine === "line-through" ? "none" : "line-through");
    const styleColor = event.target.style.color;
    event.target.style.color = (styleColor === "red" ? "white" : "red");
  }

  return (
    <>
      <h1 className="subTitle">Payday 3 Code Guesser</h1>
      <span className={styles.codeGuesserBody}>
        <div className={styles.codeGuesserText}>
            <h3>
                This page aims to provide all possible code combinations for keypads in Payday 3
            </h3>
            <br />
            <h3>
                If there is less than 4 different digits in the code. one of the numbers might be more
                lit up than the others, if such can be identified, please provide it in the optional input box.
                The more lit up number is the last number in the digit and will therefore minimise the time 
                it takes for the correct code to be found
            </h3>
        </div>
        <div className={styles.codeGuesserInputs}>
            <input
            className={styles.digitsInput}
            type="number"
            value={digits}
            onChange={handleDigitChange}
            placeholder="Enter digits here"
            />
            <input
            className={styles.lastDigitInput}
            disabled={digits.toString().length >= 4}
            value={lastDigit}
            onChange={handleLastDigitChange}
            type="number"
            placeholder="Enter whitest digit here"
            />
        </div>
        <br />
      </span>
      
      <button className={styles.codeGuesserButton} onClick={calculateCodes}>Calculate</button>
      <h2>Generated Codes:</h2>
      <div className={styles.codeGuesserResults}>
        
        <div
          className={styles.codesGrid}
          style={{ gridTemplateColumns: `repeat(${gridColumns}, 1fr)` }} // Use gridColumns directly
        >
          {codes.map((code, index) => (
            <button key={index} className={styles.codeItem} onClick={handleButtonClick}>
              {code}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

export default CodeGuesser;
