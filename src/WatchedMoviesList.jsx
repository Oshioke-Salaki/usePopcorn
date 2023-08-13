import WatchedMovie from './WatchedMovie';

import React from 'react'

function WatchedMoviesList({ watched, onDeleteWatched }) {
  return (
    <ul className="list list-watched">
      {watched.map((movie) => (
        <WatchedMovie movie={movie} key={movie.imdbID} onDeleteWatched={onDeleteWatched} />
      ))}
    </ul>
  );
}

export default WatchedMoviesList
