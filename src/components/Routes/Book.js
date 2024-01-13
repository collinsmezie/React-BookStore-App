import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteBook } from '../../redux/Books/books';
import './scss/Style.scss';
import RoundProgressBar from '../ProgressBar';

const Book = (props) => {
  const {
    title, author, category, current_chapter, progress, id
  } = props;
  const dispatch = useDispatch();

  const removeHandler = () => {
    dispatch(deleteBook(id));
  };

  return (
    <div className="book-container d_flex_r g10_vw">
      <div className="book-details">
        <h3>{category}</h3>
        <h2>{title}</h2>
        <p>{author}</p>
        <div className="d_flex_r g15">
          <button className="add-book" type="button">Comments</button>
          <button className="add-book" type="button" onClick={removeHandler}>Remove</button>
          <Link to={{
            pathname: `/edit/${id}`,
          }}
          >
            <button className="add-book" type="button">Edit</button>
          </Link>
        </div>
      </div>
      <div className="card-progress d_flex_r g10_vw">
        <div className="d_flex_a">
          <RoundProgressBar percentage={progress} />
          <div>
            <h3>
              {progress}
              {' '}
              %
            </h3>
            <p>Completed</p>
          </div>
        </div>

        <div className="d_flex_c progress_updates">
          <h2>CURRENT CHAPTER</h2>
          <h3>
            chapter
            {current_chapter}
            : &quot;Intuition&quot;
          </h3>
          <button className="add-book" type="button">UPDATE PROGRESS</button>
        </div>
      </div>
    </div>
  );
};

Book.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  current_chapter: PropTypes.string.isRequired,
  progress: PropTypes.number.isRequired,
};

export default Book;
