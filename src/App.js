import "./styles.css";
import React, { useState } from "react";

export default function App() {
  const [numInput, setNumInput] = useState("");
  const [result, setResult] = useState(0);
  const maxLength = 15;

  function handleChange(event) {
    let input = event.target.value;
    input = removePunctuation(input);
    if (input.length > 1 && input.startsWith("0")) {
      input = removeLeadingZero(input);
    }
    if (input.length === maxLength) {
      input = removeOverflow(input);
    }
    setNumInput(input);
  }

  function removePunctuation(text) {
    return text.replace(/[^\d]/g, "");
  }

  function removeLeadingZero(text) {
    if (text.endsWith("0")) {
      return "0";
    }
    return text.substring(1);
  }

  function removeOverflow(text) {
    return text.substring(0, maxLength);
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      handleInput();
    }
  }

  function handleInput() {
    if (numInput) {
      let num = parseInt(numInput);
      let reversedNum = reverse(num);
      let diff = getDifference(num, reversedNum);
      setResult(diff);
    }
  }

  function reverse(num) {
    const base = 10;
    let reversedNum = 0;
    while (num > 0) {
      let lastDigit = num % base;
      reversedNum = reversedNum * base + lastDigit;
      num = Math.floor(num / base);
    }
    return reversedNum;
  }

  function getDifference(num1, num2) {
    return Math.abs(num1 - num2);
  }

  return (
    <div className="App">
      <div className="input-container">
        Number:
        <input
          value={numInput}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          maxLength={15}
        />
        <button onClick={handleInput}>Submit</button>
      </div>
      <div className="result">Result: {result}</div>
    </div>
  );
}
