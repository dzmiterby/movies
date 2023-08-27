import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import '../App.css';
import { format, parseISO } from 'date-fns';
import { Tag, Typography, Rate } from 'antd';

import { Context } from '../Genres/Genres';
import no_poster from '../../images/no_poster.jpg';

function Movie({
  id,
  poster_path,
  popularity,
  title,
  release_date,
  genre_ids,
  overview,
  rating,
  guest,
  putRateMovie,
  keyFilter,
}) {
  const genres = useContext(Context);

  const [rate, setRate] = useState(rating);

  const { Paragraph } = Typography;

  let imgPath = '';

  try {
    if (poster_path === null) {
      imgPath = no_poster;
    } else {
      imgPath = `https://image.tmdb.org/t/p/original${poster_path}`;
    }
  } catch (error) {
    console.log(error.message);
  }

  let dateReease = '';

  try {
    if (release_date) {
      dateReease = format(parseISO(release_date), 'MMMM dd, yyyy');
    }
  } catch (error) {
    console.log(error.message);
  }

  let genre = [];

  try {
    if (genre_ids.length > 0) {
      for (let i = 0; i < genre_ids.length; i++) {
        for (let elem of genres) {
          for (let key in elem) {
            if (key === 'id' && elem[key] === genre_ids[i]) {
              genre.push(elem.name);
            }
          }
        }
      }
    }
  } catch (error) {
    console.log(error.message);
  }

  let popularityColor = '';

  try {
    if (popularity.toFixed(1) >= 0 && popularity.toFixed(1) < 3) {
      popularityColor = '#E90000';
    } else if (popularity.toFixed(1) >= 3 && popularity.toFixed(1) < 5) {
      popularityColor = '#E97E00';
    } else if (popularity.toFixed(1) >= 5 && popularity.toFixed(1) < 7) {
      popularityColor = '#E9D100';
    } else if (popularity.toFixed(1) >= 7) {
      popularityColor = '#66E900';
    }
  } catch (error) {
    console.log(error.message);
  }

  function putStar(e) {
    setRate(e);
    putRateMovie(id, guest, JSON.stringify({ value: e }));
  }

  return (
    <>
      <li className="card-movie">
        <div className="card-movie__img">
          <img src={imgPath} alt="poster" />
        </div>
        <div className="card-movie__title title">
          <div className="title__box">
            <p className="title__box-title">{title}</p>
            <p className="title__box-popularity" style={{ border: `2px solid ${popularityColor}` }}>
              {popularity.toFixed(1)}
            </p>
          </div>
          <p className="title__date">{dateReease}</p>
          <p className="title__tags">
            {genre.map((item) => (
              <Tag style={{ marginTop: '3px' }} key={item}>
                {item}
              </Tag>
            ))}
          </p>
        </div>
        <div className="card-movie__content">
          <Paragraph ellipsis={{ rows: 5, expandable: false }}>{overview}</Paragraph>
        </div>
        {keyFilter === '1' ? (
          <div className="card-movie__stars">
            <Rate count={10} value={rate} allowHalf onChange={(e) => putStar(e)} />
          </div>
        ) : (
          <div className="card-movie__stars">
            <Rate count={10} defaultValue={rate} disabled />
          </div>
        )}
      </li>
    </>
  );
}

Movie.defaultProps = {
  id: 1,
  poster_path: '',
  popularity: 0,
  title: '',
  release_date: '',
  genre_ids: [],
  overview: '',
  rating: 0,
  guest: '',
  keyFilter: '1',
};
Movie.propTypes = {
  id: PropTypes.number,
  poster_path: PropTypes.string,
  popularity: PropTypes.number,
  title: PropTypes.string,
  release_date: PropTypes.string,
  genre_ids: PropTypes.array,
  overview: PropTypes.string,
  rating: PropTypes.number,
  guest: PropTypes.string,
  keyFilter: PropTypes.string,
};

export default Movie;
