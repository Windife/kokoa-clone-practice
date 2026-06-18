import { useState } from 'react';

function PokemonCard({ id, name, type }) {
  const [a, setA] = useState(true);
  const b = (event) => {
    setA(!a);
  };
  return (
    <li>
      <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
        alt={name}
      />
      <h3>{name}</h3>
      <p>{type}</p>
      {/* 👉🏻 버튼을 누를 때마다 🔴(잡힘) ↔ ⚪(놓아줌)로 토글되게 만들어 보세요. */}
      <button onClick={b}>{a ? '⚪' : '🔴'}</button>
    </li>
  );
}

export default PokemonCard;
