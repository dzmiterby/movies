import React from 'react';
import './App.css';
import PropTypes from 'prop-types';

import Movie from './Movie';

function MoviesList({ movies, keyFilter, rated, guest, putRateMovie, getRatedMovies }) {
  return (
    <div className="main">
      {keyFilter === '1' ? (
        <ul className="main__list-movies">
          {movies.map((item) => (
            <Movie
              key={item.id}
              id={item.id}
              poster_path={item.poster_path}
              popularity={item.vote_average}
              title={item.title}
              release_date={item.release_date}
              genre_ids={item.genre_ids}
              overview={item.overview}
              rating={item.rating}
              guest={guest}
              putRateMovie={putRateMovie}
              keyFilter={keyFilter}
              getRatedMovies={getRatedMovies}
            />
          ))}
        </ul>
      ) : (
        <ul className="main__list-movies">
          {rated.map((item) => (
            <Movie
              key={item.id}
              id={item.id}
              poster_path={item.poster_path}
              popularity={item.vote_average}
              title={item.title}
              release_date={item.release_date}
              genre_ids={item.genre_ids}
              overview={item.overview}
              rating={item.rating}
              guest={guest}
              putRateMovie={putRateMovie}
              keyFilter={keyFilter}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

MoviesList.defaultProps = {
  movies: [],
  rated: [],
  keyFilter: '1',
  guest: '',
};
MoviesList.propTypes = {
  movies: PropTypes.array,
  rated: PropTypes.array,
  keyFilter: PropTypes.string,
  guest: PropTypes.string,
};

export default MoviesList;
