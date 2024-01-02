import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Book from './Book';
import { getBooks } from '../../redux/Books/books';
import './scss/Style.scss';

const BookList = () => {
  const { books, loading } = useSelector((state) => state.books);
  const dispatch = useDispatch();
  // console.log('BOOKLIST component:', books); 

  useEffect(() => {
    dispatch(getBooks());
  }, [dispatch]);

  let fetchedBooks = '';
  if (loading) {
    fetchedBooks = <h2>Hold on...</h2>;
  } else {
    fetchedBooks = books.map((book, index) => (
      <div
        key={index}
        className="container"
      >
        <Book
          title={book.title}
          author={book.author}
          category={book.category}
          current_chapter={book.current_chapter}
          progress={book.progress}
          id={book.id}
        />
      </div>

    ));
  }

  return (
    <div>
      <ul>
        {fetchedBooks}
      </ul>
    </div>
  );
};

export default BookList;
