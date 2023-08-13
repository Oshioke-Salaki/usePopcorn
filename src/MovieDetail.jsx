import { useState, useEffect } from 'react';
import StarRating from './StarRating';
import { KEY} from './App';
import Loader from './Loader';

function MovieDetail({ selectedId, onCloseMovie, onAddWatched, watched }) {
  const [loading, setLoading] = useState(false);
  const [movie, setMovie] = useState({});
  const [userRating, setUserRating] = useState('');

  const isWatched = watched.map((curr) => curr.imdbID).includes(selectedId);
  const watchedUserRating = watched.find(movie => movie.imdbID === selectedId)?.userRating;

  const {
    Title: title, Year: year, Poster: poster, Runtime: runtime, imdbRating, Plot: plot, Released: released, Actors: actors, Director: director, Genre: genre,
  } = movie;

  function handleAdd() {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(' ').at(0)),
      userRating
    };
    onAddWatched(newWatchedMovie);
    onCloseMovie();
  }

  useEffect(function () {
    function callback(e) {
      if (e.code === 'Escape') {
        onCloseMovie();
      }
    }
    document.addEventListener('keydown', callback);

    return function () {
      document.removeEventListener('keydown', callback);
    };
  }, [onCloseMovie]);

  useEffect(
    function () {
      async function getMovieDetails() {
        try {
          setLoading(true);
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
          );
          const data = await res.json();
          setMovie(data);
        } catch (err) {
          console.error(err.message);
        } finally {
          setLoading(false);
        }
      }
      getMovieDetails();
    },
    [selectedId]
  );

  useEffect(function () {
    if (!title) return;
    document.title = `Movie | ${title}`;

    return function () {
      document.title = "usePopcorn";
      console.log(`clean up effect for movie ${title}`);
    };
  }, [title]);

  return (
    <div className="details">
      {loading ? (
        <Loader />
      ) :
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt="" />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>🍕</span>
                {imdbRating} IMDB rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {!isWatched ? <><StarRating maxRating={10} size={24} onSetRating={setUserRating} />
                {userRating > 0 && <button className="btn-add" onClick={handleAdd}>+ Add to List</button>} </> : <p>You rated this movie {watchedUserRating} <span>⭐</span> </p>}

            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>}
    </div>
  );
}

export default MovieDetail