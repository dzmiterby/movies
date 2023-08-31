import React from 'react';
import './App.css';
import PropTypes from 'prop-types';
import { Input } from 'antd';

function SeachMovieForm({ seach, setSeach, setPage, seachMovies }) {
  function debounce(fn, debounceTime) {
    let timeout;
    return function () {
      const context = this;
      const args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(() => fn.apply(context, args), debounceTime);
    };
  }

  function getMoies(event) {
    if (event.target.value.trim() !== '') {
      setSeach(event.target.value);
      setPage(1);
      seachMovies(event.target.value);
    }
  }

  return (
    <>
      <Input
        className="header__input"
        placeholder="Type to search..."
        size="large"
        defaultValue={seach}
        onChange={debounce(getMoies, 1500)}
      />
    </>
  );
}

SeachMovieForm.defaultProps = {
  seach: '',
};
SeachMovieForm.propTypes = {
  seach: PropTypes.string,
};

export default SeachMovieForm;
