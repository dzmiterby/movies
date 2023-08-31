import React, { useEffect, useState } from 'react';
import './App.css';
import { Space, Alert, Spin } from 'antd';

import MoviesService from '../MoviesService/MoviesService';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import { Context } from './Genres';

function App() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(true);
  const [seach, setSeach] = useState('');
  const [page, setPage] = useState(1);
  const [pageRated, setPageRated] = useState(1);
  const [total, setTotal] = useState(1);
  const [totalRated, setTotalRated] = useState(1);
  const [keyFilter, setKeyFilter] = useState('1');
  const [guest, setGuest] = useState('');
  const [genres, setGenres] = useState([]);
  const [rated, setRated] = useState([]);
  const [noResult, setNoResult] = useState(false);
  const [navLoad, setNavLoad] = useState(false);

  // Поиск фильмов
  function seachMovies(seach, page = 1) {
    const callMovieService = new MoviesService();
    setIsLoaded(false);
    setNoResult(false);
    callMovieService
      .fetchSearchMovies(seach, page)
      .then((result) => {
        setIsLoaded(true);
        let arrayMovies = result.results;
        for (let elem of arrayMovies) {
          elem['rating'] = 0;
        }
        setMovies(arrayMovies);
        setNavLoad(true);
        if (result.total_results > 10000) {
          setTotal(10000);
        } else {
          setTotal(result.total_results);
        }
        if (arrayMovies.length === 0) {
          setNoResult(true);
          setNavLoad(false);
        }
      })
      .catch((error) => {
        setIsLoaded(true);
        setError(error);
      });
  }

  // Список жанров
  function getListGenres() {
    const callMovieService = new MoviesService();
    callMovieService
      .fetchGetListGenres()
      .then((result) => {
        setGenres(result.genres);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  // Добавление оценки фильму
  function putRateMovie(movie_id, guest_id, stars) {
    const callMovieService = new MoviesService();
    callMovieService.fetchPutRateMovie(movie_id, guest_id, stars).catch((error) => {
      console.log(error.message);
    });
  }

  // Оцененные фильмы
  function getRatedMovies(page = 1) {
    setIsLoaded(false);
    setNoResult(false);
    const callMovieService = new MoviesService();
    callMovieService
      .fetchGetRatedMovies(page)
      .then((result) => {
        setIsLoaded(true);
        let arrayRatedMovies = result.results;
        setRated(arrayRatedMovies);
        setNavLoad(true);
        if (arrayRatedMovies.length === 0) {
          setNoResult(true);
          setNavLoad(false);
        }
        if (result.total_results > 10000) {
          setTotalRated(10000);
        } else {
          setTotalRated(result.total_results);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  // Популярные фильмы
  function getPopularMovies(page = 1) {
    setIsLoaded(false);
    setNoResult(false);
    setNavLoad(false);
    const callMovieService = new MoviesService();
    callMovieService
      .fetchGetPopularMovies(page)
      .then((result) => {
        setIsLoaded(true);
        let arrayMovies = result.results;
        for (let elem of arrayMovies) {
          elem['rating'] = 0;
        }
        setMovies(arrayMovies);
        setNavLoad(true);
        if (result.total_results > 10000) {
          setTotal(10000);
        } else {
          setTotal(result.total_results);
        }
        if (arrayMovies.length === 0) {
          setNoResult(true);
          setNavLoad(false);
        }
      })
      .catch((error) => {
        setIsLoaded(true);
        setError(error);
      });
  }

  // Создание гостевой сессии
  function createGuestSession() {
    const callMovieService = new MoviesService();
    callMovieService
      .fetchCreateGuestSession()
      .then((result) => {
        setGuest(result.guest_session_id);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  useEffect(() => {
    if (!guest) {
      createGuestSession();
      getPopularMovies();
      getListGenres();
    }
  }, [guest]);

  return (
    <>
      <Header
        seach={seach}
        setSeach={setSeach}
        setPage={setPage}
        keyFilter={keyFilter}
        setKeyFilter={setKeyFilter}
        seachMovies={seachMovies}
        setNoResult={setNoResult}
        getRatedMovies={getRatedMovies}
      />
      {error ? (
        <Space direction="vertical" style={{ width: '100%', marginTop: '50px' }}>
          <Alert
            style={{ width: '50%', margin: '0 auto' }}
            message="Error"
            description="Oops. Something went wrong..."
            type="error"
            showIcon
          />
        </Space>
      ) : !isLoaded ? (
        <Space direction="vertical" style={{ width: '100%', marginTop: '50px' }}>
          <Spin tip="Loading..." size="large">
            <div className="content" />
          </Spin>
        </Space>
      ) : (
        <>
          <Context.Provider value={genres}>
            <Main
              movies={movies}
              keyFilter={keyFilter}
              rated={rated}
              guest={guest}
              putRateMovie={putRateMovie}
              noResult={noResult}
              getRatedMovies={getRatedMovies}
            />
          </Context.Provider>
          <Footer
            seach={seach}
            page={page}
            setPage={setPage}
            total={total}
            keyFilter={keyFilter}
            seachMovies={seachMovies}
            getRatedMovies={getRatedMovies}
            pageRated={pageRated}
            setPageRated={setPageRated}
            totalRated={totalRated}
            getPopularMovies={getPopularMovies}
            navLoad={navLoad}
          />
        </>
      )}
    </>
  );
}

export default App;
