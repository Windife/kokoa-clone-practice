import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';

function Detail() {
  const { id } = useParams();
  const [movie, setMovie] = useState([]);
  const [loading, setLoading] = useState(true);
  const getMoive = async () => {
    const json = await (
      await fetch(`https://nomad-movies-2.nomadcoders.workers.dev/movies/${id}`)
    ).json();
    setMovie(json);
    setLoading(false);
  };
  useEffect(() => {
    getMoive();
  }, []);
  return (
    <div className="detail">
      {loading ? '' : <Link to="/">← 뒤로가기</Link>}
      {/* 👉🏻 지금은 영화 하나의 상세 정보만 하드코딩으로 표시됩니다. */}
      {/* useParams로 URL의 id를 받아, 해당 영화의 상세 정보를 API에서 가져오세요. */}
      {/* API: https://nomad-movies.nomadcoders.workers.dev/movies/{id} */}
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <h3>{movie.title}</h3>
          <img src={movie.poster_path} />
          <h3>평점 : {parseFloat(movie.vote_average).toFixed(2)} </h3>
          <p>{movie.overview}</p>
        </div>
      )}
    </div>
  );
}

export default Detail;
