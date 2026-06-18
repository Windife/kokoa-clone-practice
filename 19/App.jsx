import './App.css';
import PokemonCard from './PokemonCard';

const pokemons = [
  { id: 1, name: 'Bulbasaur', type: 'Grass' },
  { id: 4, name: 'Charmander', type: 'Fire' },
  { id: 7, name: 'Squirtle', type: 'Water' },
  { id: 25, name: 'Pikachu', type: 'Electric' },
  { id: 39, name: 'Jigglypuff', type: 'Fairy' },
  { id: 54, name: 'Psyduck', type: 'Water' },
  { id: 94, name: 'Gengar', type: 'Ghost' },
  { id: 133, name: 'Eevee', type: 'Normal' },
];

function App() {
  return (
    <div>
      <h1>Pokemon Gallery</h1>
      <ul>
        {/* 👉🏻 지금은 Bulbasaur 하나만 렌더링되고 있습니다. */}
        {/* pokemons 배열의 모든 포켓몬이 렌더링되도록 map을 사용해 바꿔 보세요. */}
        {pokemons.map((a) => (
          <PokemonCard id={a.id} name={a.name} type={a.type} />
        ))}
      </ul>
    </div>
  );
}

export default App;
