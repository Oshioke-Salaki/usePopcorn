/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import MovieList  from './MovieList';
import MovieDetail from './MovieDetail';
import WatchedSummary from './WatchedSummary';
import WatchedMoviesList  from './WatchedMoviesList';
import Box from './Box';
import MainSection from './MainSection';
import NumResults from './NumResults';
import Logo from './Logo';
import Search from './Search';
import Navbar from './Navbar';
import ErrorMessage from './ErrorMessage';
import Loader from './Loader';


// Exports
export const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export const KEY = '42a228d9';



export default function App() {
  // State Managment
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState('');
  const [selectedId, setSelectedId] = useState(null);


  // Event Handlers
  function handleSelectMovie(id) {
    setSelectedId((selectedId) => (selectedId === id ? null : id));
  }
  function handleCloseMovie() {
    setSelectedId(null);
  }
  function handleAddWatched(movie){
    setWatched(watched=>[...watched, movie])
  }
  function handleDeleteWatched(id){
    setWatched(watched => watched.filter((cur)=> cur.imdbID !== id))
  }

  useEffect(
    function () {
      const controller = new AbortController()
      // Asynchrous Version
      async function fetchMovies() {
        try {
          setIsloading(true);
          setError('');
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`, {signal: controller.signal}
          );

          if (!res.ok) {
            throw new Error('Something went wrong with fetching movies');
          }

          const data = await res.json();
          if (data.Response === 'False') throw new Error('Movie not found!');
          setMovies(data.Search);
          setError("")
        } catch (err) {
          console.error(err.message);
          if(err.name !== "AbortError"){
            setError(err.message);
          }
        } finally {
          setIsloading(false);
        }
      }
      if (query.length < 3) {
        setMovies([]);
        setError('');
        return;
      }

      handleCloseMovie()
      fetchMovies();

      return function(){
        controller.abort()
      }
    },
    [query]
  );
  return (
    <>
      <Navbar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </Navbar>
      <MainSection>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetail
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList watched={watched} onDeleteWatched={handleDeleteWatched}/>
            </>
          )}
        </Box>
      </MainSection>
    </>
  );
}


