import { useEffect, useState } from 'react';
import { Link } from 'react-router';

function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const getMovies = async () => {
    const json = await (
      await fetch(`https://marvel-proxy.nomadcoders.workers.dev/v1/public/characters?limit=50&orderBy=modified&series=24229,1058,2023`)
    ).json();
    setMovies(json);
    setLoading(false);
  };
  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div>
      {loading ? '' : <h1>Movie Explorer</h1>}
      <ul>
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          movies.data.results.map((movie) => (
            <li key={movie.id}>
              <Link to={`/movie/${movie.id}`}>
                <img src={`${movie.thumbnail.path}.${movie.thumbnail.extension}`} alt='' />
                <h3>{movie.name}</h3>
              </Link>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default Home;
