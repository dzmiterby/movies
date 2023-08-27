import React from 'react';
import '../App.css';
import PropTypes from 'prop-types';
import { Empty } from 'antd';

import MoviesList from './MoviesList';

function Main({ movies, keyFilter, rated, guest, putRateMovie, noResult, getRatedMovies }) {
  const noMovies = noResult ? (
    <Empty style={{ marginTop: '35px' }} />
  ) : (
    <MoviesList
      movies={movies}
      keyFilter={keyFilter}
      rated={rated}
      guest={guest}
      putRateMovie={putRateMovie}
      getRatedMovies={getRatedMovies}
    />
  );

  return <>{noMovies}</>;
}

Main.defaultProps = {
  movies: [],
  keyFilter: '1',
  guest: '',
  noResult: false,
};
Main.propTypes = {
  movies: PropTypes.array,
  keyFilter: PropTypes.string,
  guest: PropTypes.string,
  noResult: PropTypes.bool,
};

export default Main;
