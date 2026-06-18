import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [colors, setColors] = useState(() => {
    const saved = localStorage.getItem('colors');
    return saved ? JSON.parse(saved) : ['#ff0000', '#00ff00', '#0000ff'];
  });
  useEffect(() => {
    localStorage.setItem('colors', JSON.stringify(colors));
  }, [colors]);
  return (
    <div className="app">
      <h1>Gradient Generator</h1>

      {/* 👉🏻 지금은 그라데이션이 고정된 색상으로 표시됩니다. */}
      {/* useState로 색상 배열을 관리하고, 아래 input으로 바꿀 수 있게 만드세요. */}
      <div
        className="gradient-preview"
        style={{
          backgroundImage: `linear-gradient(${colors[0]}, ${colors[1]}, ${colors[2]})`,
        }}
      />

      <div className="controls">
        <input
          type="color"
          onChange={(event) =>
            setColors([event.target.value, colors[1], colors[2]])
          }
          value={colors[0]}
        />

        <input
          type="color"
          onChange={(event) =>
            setColors([colors[0], event.target.value, colors[2]])
          }
          value={colors[1]}
        />

        <input
          type="color"
          onChange={(event) =>
            setColors([colors[0], colors[1], event.target.value])
          }
          value={colors[2]}
        />
      </div>
    </div>
  );
}

export default App;
