import React from 'react';
import './App.css';
import PropTypes from 'prop-types';
import { Pagination } from 'antd';

function Footer({
  seach,
  page,
  setPage,
  total,
  keyFilter,
  seachMovies,
  getRatedMovies,
  pageRated,
  setPageRated,
  totalRated,
  getPopularMovies,
  navLoad,
}) {
  const navigation = navLoad ? (
    keyFilter === '1' ? (
      <Pagination
        style={{ backGround: '#1890FF' }}
        defaultCurrent={page}
        total={total}
        pageSize="20"
        onChange={onChange1}
      />
    ) : (
      <Pagination
        style={{ backGround: '#1890FF' }}
        defaultCurrent={pageRated}
        total={totalRated}
        pageSize="20"
        onChange={onChange2}
      />
    )
  ) : (
    <></>
  );

  function onChange1(pageNumber) {
    setPage(pageNumber);
    if (seach) {
      seachMovies(seach, pageNumber);
    } else {
      getPopularMovies(pageNumber);
    }
  }

  function onChange2(pageNumber) {
    setPageRated(pageNumber);
    getRatedMovies(pageNumber);
  }

  return <footer>{navigation}</footer>;
}

Footer.defaultProps = {
  seach: '',
  page: 1,
  total: 1,
  keyFilter: '1',
  pageRated: 1,
  totalRated: 1,
  navLoad: false,
};
Footer.propTypes = {
  seach: PropTypes.string,
  page: PropTypes.number,
  total: PropTypes.number,
  keyFilter: PropTypes.string,
  pageRated: PropTypes.number,
  totalRated: PropTypes.number,
  navLoad: PropTypes.bool,
};

export default Footer;
