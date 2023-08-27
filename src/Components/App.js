import React, { useEffect, useState } from 'react';
import './App.css';
import { Space, Alert, Spin } from 'antd';

import Header from './Header/Header';
import Main from './Main/Main';
import Footer from './Footer/Footer';
import { Context } from './Genres/Genres';

const authorization_key =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYjFmZWUxNTBiNmJkOGZkYWQ4ZTUxNTdiMDhmNTU1MyIsInN1YiI6IjY0ZTJmNjZjZTE5ZGU5MDEzYTI5NWExMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zeXbGyhm_PZ-XRq47Ribl412-gn0d4SIg4R6clIl1hE';
const account_id = '20330534';

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
    setIsLoaded(false);
    setNoResult(false);
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${authorization_key}`,
      },
    };
    fetch(
      `https://api.themoviedb.org/3/search/movie?query=${seach}&include_adult=false&language=en-US&page=${page}`,
      options
    )
      .then((response) => response.json())
      .then(
        (result) => {
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
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }

  // Список жанров
  function getListGenres() {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${authorization_key}`,
      },
    };
    fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options)
      .then((response) => response.json())
      .then(
        (result) => {
          setGenres(result.genres);
        },
        (error) => {
          console.log(error.message);
        }
      );
  }

  // Добавление оценки фильму
  function putRateMovie(movie_id, guest_id, stars) {
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Bearer ${authorization_key}`,
      },
      body: stars,
    };
    fetch(`https://api.themoviedb.org/3/movie/${movie_id}/rating?guest_session_id=${guest_id}`, options)
      .then((response) => response.text())
      .catch((error) => {
        console.log(error.message);
      });
  }

  // Оцененные фильмы
  function getRatedMovies(page = 1) {
    setIsLoaded(false);
    setNoResult(false);
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${authorization_key}`,
      },
    };
    fetch(
      `https://api.themoviedb.org/3/account/${account_id}/rated/movies?language=en-US&page=${page}&sort_by=created_at.asc`,
      options
    )
      .then((response) => response.json())
      .then(
        (result) => {
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
        },
        (error) => {
          console.log(error.message);
        }
      );
  }

  // Популярные фильмы
  function getPopularMovies(page = 1) {
    setIsLoaded(false);
    setNoResult(false);
    setNavLoad(false);
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${authorization_key}`,
      },
    };
    fetch(`https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`, options)
      .then((response) => response.json())
      .then(
        (result) => {
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
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }

  // Создание гостевой сессии
  function createGuestSession() {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${authorization_key}`,
      },
    };
    fetch('https://api.themoviedb.org/3/authentication/guest_session/new', options)
      .then((response) => response.json())
      .then(
        (result) => {
          setGuest(result.guest_session_id);
        },
        (error) => {
          console.log(error.message);
        }
      );
  }

  useEffect(() => {
    if (!guest) {
      getPopularMovies();
      createGuestSession();
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
