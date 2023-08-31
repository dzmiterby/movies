import React from 'react';
import './App.css';
import { Tabs } from 'antd';
import PropTypes from 'prop-types';

import SeachMovieForm from './SeachMovieForm';

function Header({ seach, setSeach, setPage, keyFilter, setKeyFilter, seachMovies, setNoResult, getRatedMovies }) {
  function onChange(key) {
    setKeyFilter(key);
    if (key === '2') {
      setNoResult(false);
      getRatedMovies();
    }
  }

  const items = [
    { key: '1', label: 'Search' },
    { key: '2', label: 'Rated' },
  ];

  return (
    <header className="header">
      <div className="header__tabs">
        <Tabs items={items} onChange={onChange} />
      </div>
      {keyFilter === '1' ? (
        <SeachMovieForm seach={seach} setSeach={setSeach} setPage={setPage} seachMovies={seachMovies} />
      ) : (
        <></>
      )}
    </header>
  );
}

Header.defaultProps = {
  seach: '',
  keyFilter: '1',
};
Header.propTypes = {
  seach: PropTypes.string,
  keyFilter: PropTypes.string,
};

export default Header;
