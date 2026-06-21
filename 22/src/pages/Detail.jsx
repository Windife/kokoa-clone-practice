import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';

function Detail() {
  const { id } = useParams();
  const [comic, setComic] = useState([]);
  const [loading, setLoading] = useState(true);
  const getComic = async () => {
    const json = await (
      await fetch(`https://marvel-proxy.nomadcoders.workers.dev/v1/public/characters/${id}`)
    ).json();
    setComic(json);
    setLoading(false);
  };
  useEffect(() => {
    getComic();
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [showComics, setShowComics] = useState(false);
  const [showSeries, setShowSeries] = useState(false);
  const [showStories, setShowStories] = useState(false);
  const [showEvents, setShowEvents] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className="detail">
      {loading ? '' : <Link to="/" style={{color : 'white'}}>← Back</Link>}
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        comic.data.results.map((comic) => (
        <div>
          <h1>{comic.name}</h1>
          <img src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} alt='' />
          <h3>Description</h3>
          <p>{comic.description ? comic.description : "설명 없음"}</p>
          
          <h3>
              <a href={comic.comics.collectionURI} target='_blank' rel='noopener noreferrer'>Comics (Total : {comic.comics.available})</a >
              <button onClick={() => setShowComics(!showComics)}>more</button>
          </h3>
          {showComics && (<ul>
            {comic.comics.items.map( (name) =>(
              <li>
                <a href={name.resourceURI} target='_blank' rel='noopener noreferrer'>
                  {name.name}
                </a>
              </li>
            ))}
          </ul>)}
          
          <h3>
            <a href={comic.series.collectionURI} target='_blank' rel='noopener noreferrer'>Series (Total : {comic.series.available})</a >
            <button onClick={() => setShowSeries(!showSeries)}>more</button>
          </h3>
          {showSeries && (<ul>
            {comic.series.items.map( (name) =>(
              <li>
                <a href={name.resourceURI} target='_blank' rel='noopener noreferrer'>
                  {name.name}
                </a>
              </li>
            ))}
          </ul>)}

          <h3>
            <a href={comic.stories.collectionURI} target='_blank' rel='noopener noreferrer'>Stories (Total : {comic.stories.available})</a >
            <button onClick={() => setShowStories(!showStories)}>more</button>
          </h3>
          {showStories && (<ul>
            {comic.stories.items.map( (name) =>(
              <li>
                <a href={name.resourceURI} target='_blank' rel='noopener noreferrer'>
                  {name.name}
                </a>
              </li>
            ))}
          </ul>)}

          <h3>
            <a href={comic.events.collectionURI} target='_blank' rel='noopener noreferrer'>Events (Total : {comic.events.available})</a >
            <button onClick={() => setShowEvents(!showEvents)}>more</button>
          </h3>
          {showEvents && (<ul>
            {comic.events.items.map( (name) =>(
              <li>
                <a href={name.resourceURI} target='_blank' rel='noopener noreferrer'>
                  {name.name}
                </a>
              </li>
            ))}
          </ul>)}

          <h3>More INFO
            <button onClick={() => setShowInfo(!showInfo)}>more</button>
          </h3>
            {showInfo && (<ul>
                {comic.urls.map( (link) => (
                  <li>
                    <a href={link.url} target='_blank' rel='noopener noreferrer'>
                      {link.type}
                    </a>
                  </li>
                ))}
              </ul>)}
        </div>
      ))
    )}
    </div>
  );
}

export default Detail;
