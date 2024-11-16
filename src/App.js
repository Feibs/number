import "./styles.css";
import React, { useState } from "react";

export default function App() {
  const [numInput, setNumInput] = useState("");
  const [result, setResult] = useState(0);

  function handleChange(event) {
    let input = event.target.value;
    input = changePunctuation(input);
    if (input.length > 1 && input.startsWith("0")) {
      input = changeZero(input);
    }
    setNumInput(input);
  }

  function changePunctuation(text) {
    return text.replace(/[^\d]/g, "");
  }

  function changeZero(text) {
    if (text.endsWith("0")) {
      return "0";
    }
    return text.substring(1);
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
      <div>
        Number:
        <input
          value={numInput}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleInput}>Submit</button>
      </div>
      <div>Result: {result}</div>
    </div>
  );
}
