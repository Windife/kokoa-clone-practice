import { useEffect, useState } from 'react';
import { Link } from 'react-router';

function Home() {
  const [comics, setComics] = useState([]);
  const [loading, setLoading] = useState(true);
  const getComics = async () => {
    const json = await (
      await fetch(`https://marvel-proxy.nomadcoders.workers.dev/v1/public/characters?limit=50&orderBy=modified&series=24229,1058,2023`)
    ).json();
    setComics(json);
    setLoading(false);
  };
  useEffect(() => {
    getComics();
  }, []);

  return (
    <div>
      {loading ? '' : <h1>Comics Explorer</h1>}
      <ul>
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          comics.data.results.map((comic) => (
            <li key={comic.id}>
              <Link to={`/comic/${comic.id}`}>
                <img src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} alt='' />
                <h3>{comic.name}</h3>
              </Link>
            </li>
          )))}
      </ul>
    </div>
  );
}

export default Home;
