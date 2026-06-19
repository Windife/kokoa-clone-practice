import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';

function Detail() {
  const { id } = useParams();
  const [movie, setMovie] = useState([]);
  const [loading, setLoading] = useState(true);
  const getMoive = async () => {
    const json = await (
      await fetch(`https://marvel-proxy.nomadcoders.workers.dev/v1/public/characters/${id}`)
    ).json();
    setMovie(json);
    setLoading(false);
  };
  useEffect(() => {
    getMoive();
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="detail">
      {loading ? '' : <Link to="/">← 뒤로가기</Link>}
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        movie.data.results.map((movie) => (
        <div>
          <h3>{movie.name}</h3>
          <img src={`${movie.thumbnail.path}.${movie.thumbnail.extension}`} alt='' />
          <p>{movie.description ? movie.description : "설명 없음"}</p>
          <h4><a href={movie.resourceURI} target='_blank' rel="noopener noreferrer">
            {movie.resourceURI}</a></h4>
        </div>
      ))
    )}
    </div>
  );
}

export default Detail;
