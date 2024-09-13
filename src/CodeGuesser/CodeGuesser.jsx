import React, { useState, useEffect } from 'react';
import styles from "./CodeGuesser.module.css";

function CodeGuesser() {
  let [digits, setDigits] = useState('');
  let [lastDigit, setLastDigit] = useState('');
  let [codes, setCodes] = useState([]);

  function handleDigitChange(event) {
    const value = event.target.value;

    // Allow deletion of the last character and reset digits to empty string if needed
    setDigits(value);
  }

  function handleLastDigitChange(event) {
    let number = event.target.value;
    // Allow the lastDigit to be cleared
    setLastDigit(number);
  }

  function calculateCodes() {
    const numbers = ('' + digits).split(''); // Convert digits to an array of strings
    const result = [];

    const helper = (path = []) => {
      // If the path length is 4, check if it meets the lastDigit requirement
      if (path.length === 4) {
        // Check if the combination contains all original digits
        const pathSet = new Set(path); // Convert path to a Set to remove duplicates
        const numbersSet = new Set(numbers); // Convert original numbers to a Set

        // Ensure the path contains all digits from the original set
        if (
          numbersSet.size === pathSet.size &&
          [...numbersSet].every((num) => pathSet.has(num)) &&
          (lastDigit === '' || path[3] === lastDigit)
        ) {
          result.push(path.join('')); // Join the path to form a string and add it to the result
        }
        return; // Stop further recursion
      }

      // Recursively build each combination by appending each digit
      for (let i = 0; i < numbers.length; i++) {
        helper([...path, numbers[i]]); // Create a new array with the current path plus the new digit
      }
    };

    helper(); // Start the recursion with an empty path
    setCodes(result);
  }

  // Effect to manage lastDigit state based on digits
  useEffect(() => {
    // Reset lastDigit when the input is disabled
    if (digits.toString().length >= 4) {
      setLastDigit('');
    }
  }, [digits]); // This effect depends on the digits state

  function handleButtonClick(event){
    const style = event.target.style.textDecoration;
    event.target.style.textDecoration = (style === "line-through" ? "none" : "line-through");
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
      
      <div className={styles.codeGuesserResults}>
        <h2>Generated Codes:</h2>
        <div className={styles.codesGrid}>
          {codes.map((code, index) => (
            <button key={index} className={styles.codeItem} onClick={handleButtonClick}>{code}</button>
          ))}
        </div>
      </div>
    </>
  );
}

export default CodeGuesser;
