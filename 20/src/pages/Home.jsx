import { useEffect, useState } from 'react';
import { Link } from 'react-router';

function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const getMovies = async () => {
    const json = await (
      await fetch(`https://nomad-movies-2.nomadcoders.workers.dev/movies`)
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
        {/* 👉🏻 지금은 영화 한 편만 하드코딩으로 표시되고 있습니다. */}
        {/* useEffect로 API에서 영화 목록을 받아와, 모든 영화를 렌더링하세요. */}
        {/* API: https://nomad-movies-2.nomadcoders.workers.dev/movies */}
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          movies.map((movie) => (
            <li key={movie.id} className={movie.vote_average >= 8 ? 'hightRated' : ''}>
              <Link to={`/movie/${movie.id}`}>
                <img src={movie.poster_path} />
                <h3>{movie.title}</h3>
                <h3>평점 : {parseFloat(movie.vote_average).toFixed(2)}</h3>
              </Link>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default Home;
