import { useState } from 'react';
import './App.css';

function App() {
  const [a, setA] = useState();
  const [b, setB] = useState();
  const [option, setOption] = useState('0');

  const onChangeA = (event) => {
    setA(parseFloat(event.target.value));
  };

  const onChangeB = (event) => {
    setB(parseFloat(event.target.value));
  };

  const onChangeOption = (event) => {
    setOption(event.target.value);
  };

  const [result, setResult] = useState();

  const onCalc = () => {
    if (option === '+') setResult(`result is : ${parseFloat((a + b).toFixed(4))}`);
    if (option === '-') setResult(`result is : ${parseFloat((a - b).toFixed(4))}`);
    if (option === '*') setResult(`result is : ${parseFloat((a * b).toFixed(4))}`);
    if (option === '/') setResult(`result is : ${parseFloat((a / b).toFixed(4))}`);
  };

  function btnCheck(a, b, option) {
    if (a === '' || isNaN(a) || b === '' || isNaN(b) || option === '0' || (b === 0 && option === '/')) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <div className="container">
      <h1>🔥 Calculator 🔥</h1>
      <input
        type="number"
        id="a"
        placeholder="👉🏻 Write a number..."
        onChange={onChangeA}
      />
      <input
        type="number"
        id="b"
        placeholder="👉🏻 And another one..."
        onChange={onChangeB}
      />
      <select id="operation" onChange={onChangeOption}>
        <option value="0">👉🏻 Select operation</option>
        <option value="+">+</option>
        <option value="-">-</option>
        <option value="/">/</option>
        <option value="*">*</option>
      </select>
      <button onClick={onCalc} disabled={btnCheck(a, b, option)}>
        Calculate
      </button>
      <h2>{result}</h2>
    </div>
  );
}

export default App;
